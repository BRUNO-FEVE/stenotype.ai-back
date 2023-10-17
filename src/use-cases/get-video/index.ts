import { MongoDBVideoRepository } from "../../repositories/implementation/mongo-db-video-repository";
import { GetVideoController } from "./get-video-controller";
import { GetVideoUsecase } from "./get-video-use-case";

const videoRepositoryProvider = new MongoDBVideoRepository();

const getVideoUsecase = new GetVideoUsecase(videoRepositoryProvider);

const getVideoController = new GetVideoController(getVideoUsecase);

export { getVideoUsecase, getVideoController };
