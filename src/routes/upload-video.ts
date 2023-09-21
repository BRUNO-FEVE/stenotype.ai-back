import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from 'node:fs';
import { promisify } from 'node:util'
import { pipeline } from "node:stream";
import { prisma } from "../lib/prisma";
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

        await pump(data.file, fs.createWriteStream(uploadDir))

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDir
            }
        })

        return {video}
    })
}