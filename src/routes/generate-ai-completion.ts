import { FastifyInstance } from "fastify";
import { generateAiCompletionController } from "../use-cases/generate-ai-completion";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (request, response) => {
    return generateAiCompletionController.handle(request, response);
  });
}
