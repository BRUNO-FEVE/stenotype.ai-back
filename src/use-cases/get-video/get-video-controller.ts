import { FastifyRequest, FastifyReply } from "fastify";
import { GetVideoUsecase } from "./get-video-use-case";
import { ObjectId } from "mongodb";

export class GetVideoController {
  constructor(private getVideoUsecase: GetVideoUsecase) {}

  async handle(
    request: FastifyRequest,
    response: FastifyReply
  ): Promise<FastifyReply> {
    const { videoId } = request.params as { videoId: string };

    const idValidation = ObjectId.isValid(videoId);
    if (!idValidation) {
      response.status(400).send({ error: "Invalid Id Format" });
    }

    try {
      const video = await this.getVideoUsecase.execute(videoId);

      return response.status(200).send(video);
    } catch (error) {
      return response
        .status(400)
        .send({ message: error.message || "Unexpected Error" });
    }
  }
}
