import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { prisma } from "../lib/prisma";

export async function getVideo(app: FastifyInstance) {
    app.get('/video/:videoId', async (req, rep) => {
        const { videoId } = req.params as { videoId: string }

        if(!ObjectId.isValid(videoId)) {
            return rep.status(400).send({ error: 'Invalid videoId format' })
        }

        console.log(videoId)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })

        return video
    })
}