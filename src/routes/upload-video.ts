import 'dotenv/config'
import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from 'node:fs';
import { promisify } from 'node:util'
import { pipeline } from "node:stream";
import { prisma } from "../lib/prisma";
import { s3 } from "../lib/aws";

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1048576 * 25 // 25mb
        }
    })

    app.post('/videos', async (req, rep) => {
        const data = await req.file()

        if(!data) {
            return rep.status(400).send({ error: 'Missing File Input.' })
        }

        const extension = path.extname(data.filename)

        if(extension.toLowerCase() !== '.mp3') {
            return rep.status(400).send({ error: 'Invalid Input type, please upload MP3.' })
        }
        
        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDir = path.join(__dirname, '../../tmp', fileUploadName)
        // const fileStream = fs.createReadStream(uploadDir)
        console.log(uploadDir)

        const fileParams = {
            Bucket: "upload-ai-file-store",
            Key: fileUploadName,
            Body: uploadDir
        }

        // await pump(data.file, fs.createWriteStream(uploadDir)) --> DEV 
        await pump(data.file, fs.createWriteStream(`/tmp/${fileUploadName}`))

        const awsFileData = await s3.upload((fileParams), (error, data) => {
            if(error) {
                console.log('Error: ', error)
            } else {
                console.log(data.Location)
            }
        }).promise()

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: awsFileData.Location
            }
        })

        fs.unlink(uploadDir, (error) => {
            if(error) {
                console.log('Error: ', error)
            } else {
                console.log('File Deleted: ', uploadDir)
            }
        })



        return {video}
    })
}