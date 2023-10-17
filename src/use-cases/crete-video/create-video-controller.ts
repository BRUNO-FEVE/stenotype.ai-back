import { FastifyReply, FastifyRequest } from "fastify";
import { CreateVideoUsecase } from "./create-video-use-case";
import path from "path";
import { Video } from "../../entities/video";

export class CreateVideoController {
  constructor(private createVideoUsecase: CreateVideoUsecase) {}

  async handle(
    request: FastifyRequest,
    response: FastifyReply
  ): Promise<FastifyReply> {
    const data = await request.file();
    const { prompt } = request.params as { prompt: string };

    if (!data) {
      return response.status(400).send({ error: "Missing File Input." });
    }

    const extension = path.extname(data.filename);

    if (extension.toLowerCase() !== ".mp3") {
      return response
        .status(400)
        .send({ error: "Invalid Input type, please upload MP3." });
    }

    try {
      const video = await this.createVideoUsecase.execute({
        file: data,
        prompt,
      });

      return response.status(201).send(Video.toJson(video));
    } catch (error) {
      return response
        .status(400)
        .send({ message: error.message || "Unexpected Error" });
    }
  }
}
