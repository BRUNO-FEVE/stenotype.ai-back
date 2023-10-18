import { FastifyRequest, FastifyReply } from "fastify";
import { GenerateCompletionUsecase } from "./generate-ai-completion-use-case";
import z from "zod";
import { OpenAIStream, streamToResponse } from "ai";

export class GenerateCompletionController {
  constructor(private generateAiCompletionUsecase: GenerateCompletionUsecase) {}

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const bodySchema = z.object({
      videoId: z.string(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).optional().default(0.5),
    });

    const { videoId, prompt, temperature } = bodySchema.parse(request.body);

    const completionResponse = await this.generateAiCompletionUsecase.execute({
      videoId,
      prompt,
      temperature,
    });

    const stream = OpenAIStream(completionResponse);
    streamToResponse(stream, response.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Content-Type": "text/event-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
