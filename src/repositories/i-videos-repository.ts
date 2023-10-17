import { Video } from "../entities/video";

export interface IVideosRepository {
  findById(videoId: string): Promise<Video>;
  create(video: Video): Promise<Video>;
}
