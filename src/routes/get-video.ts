import { FastifyInstance } from "fastify";
import { getVideoController } from "../use-cases/get-video";

export async function getVideo(app: FastifyInstance) {
  app.get("/video/:videoId", async (req, rep) => {
    return getVideoController.handle(req, rep);
  });
}
