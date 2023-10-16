import { WisperTranscriptionProvider } from "../../providers/implementation.ts /wisper-provider";
import { MongoDBVideoRepository } from "../../repositories/implementation/mongo-db-video-repository";
import { CreateVideoController } from "./create-video-controller";
import { CreateVideoUsecase } from "./create-video-use-case";

const wisperTranscriptionProvider = new WisperTranscriptionProvider()
const mongodbVideoRepository = new MongoDBVideoRepository()

const createVideoUsecase = new CreateVideoUsecase(
    mongodbVideoRepository,
    wisperTranscriptionProvider
)

const createdVideoController = new CreateVideoController(
    createVideoUsecase
)

export { createVideoUsecase, createdVideoController }