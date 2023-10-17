import { FastifyInstance } from "fastify";
import { createdVideoController } from "../use-cases/crete-video";
import fastifyMultipart from "@fastify/multipart";

export async function createVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1048576 * 25, // 25mb
    },
  });

  app.post("/video/:prompt", async (req, res) => {
    return createdVideoController.handle(req, res);
  });
}
