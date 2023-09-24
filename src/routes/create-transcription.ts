import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createReadStream } from 'node:fs' 
import { openai } from "../lib/openai";
import { ObjectId } from "mongodb";
import { s3 } from "../lib/aws";
import { promisify } from "node:util";
import { Readable, pipeline } from "node:stream";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';

const pump = promisify(pipeline)

export async function createTranscriptionRoute(app:FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (req, rep) => {
        const { videoId } = req.params as { videoId: string }
        
        if(!ObjectId.isValid(videoId)) {
            return rep.status(400).send({ error: 'Invalid videoId format' })
        }
        
        const bodySchema = z.object({
            prompt: z.string()
        })
        
        const { prompt } = bodySchema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })

        const videoPath = video.path

        const awsParams = {
            Bucket: "upload-ai-file-store",
            Key: 'testRight.mp3'
        }

        const awsResponse = await s3.getObject(awsParams, (error, data) => {
            if(error) {
                console.log('Error: ' + error)
            }
            console.log(data)
        }).promise()

        const awsBuffer = await Readable.from([awsResponse.Body])

        const tmpVideoPath = './src/routes/tmp/awsFileConverted.mp3'

        ffmpeg()
            .input(awsBuffer)
            .inputFormat('mp3')
            .audioCodec('libmp3lame')
            .audioChannels(2) // Set the number of audio channels (adjust as needed)
            .audioFrequency(44100) // Set the 
            .toFormat('mp3')
            .on('end', () => {
                console.log('Conversão Feita.')
            })
            .on('error', (err) => {
                console.log('Error: ' + err)
            })
            .pipe(fs.createWriteStream(tmpVideoPath))

        // await pump(readableStream, fs.createWriteStream(`/tpm/${video.path}`))


        const audioReadStream = createReadStream(tmpVideoPath)

        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt
        })

        const transcription = response.text
        
        await prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                transcription,
            }
        })
   
        return { transcription }
    })
}
