import { Video } from "../entites/video";

export interface IVideosRepository {
  findById(videoId: string): Promise<Video>;
  create(video: Video): Promise<Video>;
}
