import { Video } from "../entites/video";
import { IVideosRepository } from "./i-videos-repository";

export class VideoRepositoryMock implements IVideosRepository {
  public items: Video[] = [];

  async findById(videoId: string): Promise<Video> {
    const video = this.items.find((videoSearch) => videoSearch.id === videoId);
    if (!video) return;
    return video;
  }

  async create(video: Video): Promise<Video> {
    const videoExistis = this.items.includes(video);
    if (videoExistis) return;
    this.items.push(video);
    return video;
  }
}
