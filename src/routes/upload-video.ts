// import 'dotenv/config'
// import { FastifyInstance } from "fastify";
// import { fastifyMultipart } from '@fastify/multipart'
// import path from "node:path";
// import { randomUUID } from "node:crypto";
// import fs from 'node:fs';
// import { promisify } from 'node:util'
// import { pipeline } from "node:stream";
// import { prisma } from "../lib/prisma";
// import { openai } from '../lib/openai';

// const pump = promisify(pipeline)

// export async function uploadVideoRoute(app: FastifyInstance) {
//     app.register(fastifyMultipart, {
//         limits: {
//             fileSize: 1048576 * 25 // 25mb
//         }
//     })

//     app.post('/videos/:prompt', async (req, rep) => {
//         const data = await req.file()
//         const { prompt } = req.params as { prompt: string }

//         // console.log(prompt)

//         if(!data) {
//             return rep.status(400).send({ error: 'Missing File Input.' })
//         }

//         const extension = path.extname(data.filename)

//         if(extension.toLowerCase() !== '.mp3') {
//             return rep.status(400).send({ error: 'Invalid Input type, please upload MP3.' })
//         }
        
//         const fileBaseName = path.basename(data.filename, extension)
//         const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
//         const uploadDir = path.join(__dirname, '/tmp', fileUploadName)

//         const filePath = uploadDir //  --> DEV
//         // const filePath = `/tmp/${fileUploadName}` //  --> PROD

//         await pump(data.file, fs.createWriteStream(filePath))
//         const fileStream = fs.createReadStream(filePath)

//         const transcription = await openai.audio.transcriptions.create({
//             file: fileStream,
//             model: 'whisper-1',
//             language: 'pt',
//             response_format: 'json',
//             temperature: 0,
//             prompt,
//         })

//         const video = await prisma.video.create({
//             data: {
//                 name: data.filename,
//                 path: uploadDir,
//                 transcription: transcription.text
//             }
//         })

//         fs.unlink(uploadDir, (error) => {
//             if(error) {
//                 console.log('Error: ', error)
//             } else {
//                 console.log('File Deleted: ', uploadDir)
//             }
//         })



//         return {video}
//     })
// }