import path from "path";
import { Video } from "../../entites/video";
import { ITranscriptionProvider } from "../../providers/i-transcription-provider";
import { IVideosRepository } from "../../repositories/i-videos-repository";
import { ICreateVideoRequestDTO } from "./create-video-dto";
import { randomUUID } from "crypto";
import { promisify } from 'util';
import { pipeline, Readable } from "stream"; 
import fs from 'fs';

const pump = promisify(pipeline)

export class CreateVideoUsecase {
   constructor(
    private videoRepository: IVideosRepository,
    private transcriptionProvider: ITranscriptionProvider
   ) {}

   async execute(data: ICreateVideoRequestDTO): Promise<Video> {
    const file = data.file

    const extension = path.extname(file.filename)
    const fileBaseName = path.basename(file.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
    const uploadDir = path.join(__dirname, '/tmp', fileUploadName)
    
    // const filePath = uploadDir //  --> DEV
    const filePath = `/tmp/${fileUploadName}` //  --> PROD


    const readableStream = new Readable()

    const buffer = await file.toBuffer()

    if (buffer) {
        readableStream.push(buffer)
    }
    readableStream.push(null)

    await pump(readableStream, fs.createWriteStream(filePath))
    const fileStream = fs.createReadStream(filePath)

    const transcription = await this.transcriptionProvider.transcribe({
        filePath: fileStream,
        prompt: data.prompt
    })

    const video = new Video({
        name: fileUploadName,
        path: filePath,
        transcription
    })

    const videoSaved =  await this.videoRepository.create(video)

    fs.unlink(uploadDir, (error) => {
        if(error) {
            console.log('Error: ', error)
        } else {
            console.log('File Deleted: ', uploadDir)
        }
    })

    return videoSaved
   }
}
