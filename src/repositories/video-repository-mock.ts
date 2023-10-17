import { Video } from "../entities/video";
import { IVideosRepository } from "./i-videos-repository";

export class VideoRepositoryMock implements IVideosRepository {
  public items: Video[] = [];

  async findById(videoId: string): Promise<Video> {
    const video = this.items.find((videoSearch) => videoSearch.id === videoId);
    if (!video) throw new Error("Video not found.");
    return video;
  }

  async create(video: Video): Promise<Video> {
    const videoExistis = this.items.includes(video);
    if (videoExistis) throw new Error("Video not created.");
    this.items.push(video);
    return video;
  }
}
