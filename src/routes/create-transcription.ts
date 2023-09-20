import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createReadStream } from 'node:fs' 
import { openai } from "../lib/openai";
import { ObjectId } from "mongodb";

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
        const audioReadStream = createReadStream(videoPath)

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
