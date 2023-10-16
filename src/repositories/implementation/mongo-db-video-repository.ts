import { Video } from "../../entites/video";
import { IVideosRepository } from "../i-videos-repository";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "../../lib/prisma";

export class MongoDBVideoRepository implements IVideosRepository {
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

    constructor() {
        this.prisma = prisma
    }

    async findById(videoId: string): Promise<Video> {
        const videoData = await this.prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })

        if (!videoData) {
            throw new Error('Video Not Found.')
        }

        const video = new Video(
        {
            id: videoData.id,
            name: videoData.name,
            path: videoData.path,
            transcription: videoData.transcription,
            createAt: videoData.createAt
        })

        return video
    }

    async create(video: Video): Promise<Video> {
        console.log(video.id)
        const videoData = await prisma.video.create({
            data: Video.toJson(video)
        })

        if (!videoData) {
            throw new Error('Error Creating the Video.')
        }

        const savedVideo = Video.fromJson(videoData)

        return savedVideo
    }
    
}