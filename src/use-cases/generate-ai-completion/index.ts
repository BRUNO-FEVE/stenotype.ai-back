import { OpenAiCompletionProvider } from "../../providers/implementation/open-ai-chat-completion";
import { MongoDBVideoRepository } from "../../repositories/implementation/mongo-db-video-repository";
import { GenerateCompletionController } from "./generate-ai-completion-controller";
import { GenerateCompletionUsecase } from "./generate-ai-completion-use-case";

const mongodbVideoRepository = new MongoDBVideoRepository();
const openAiCompletionProvider = new OpenAiCompletionProvider();

const generateAiCompletionUsecase = new GenerateCompletionUsecase(
  openAiCompletionProvider,
  mongodbVideoRepository
);

const generateAiCompletionController = new GenerateCompletionController(
  generateAiCompletionUsecase
);

export { generateAiCompletionUsecase, generateAiCompletionController };
