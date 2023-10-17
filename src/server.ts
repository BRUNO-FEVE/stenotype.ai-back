import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { getVideo } from "./routes/get-video";
import { createVideoRoute } from "./routes/create-video";

const app = fastify();

export const config = { supportsResponseStreaming: true };

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"],
});

app.register(getAllPromptsRoute);
app.register(getVideo);
app.register(generateAiCompletionRoute);
app.register(createVideoRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running! \n\nPORT:3333");
  });
