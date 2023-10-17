import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { streamToResponse, OpenAIStream } from "ai";
import { z } from "zod";
import { openai } from "../lib/openai";
import { ObjectId } from "mongodb";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (req, rep) => {
    const bodySchema = z.object({
      videoId: z.string(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).optional().default(0.5),
    });

    const { videoId, prompt, temperature } = bodySchema.parse(req.body);

    if (!ObjectId.isValid(videoId)) {
      return rep.status(400).send({ error: "Invalid Object ID" });
    }

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    console.log(video);

    if (!video.transcription) {
      return rep
        .status(400)
        .send({ error: "The video transcription wasn't generated yet" });
    }

    const promptMessage = prompt.replace(
      "{transcription}",
      video.transcription,
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      stream: true,
      temperature: temperature,
      messages: [{ role: "user", content: promptMessage }],
    });

    const stream = OpenAIStream(response);
    streamToResponse(stream, rep.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Content-Type": "text/event-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  });
}
