import { Video } from "../../entites/video";
import { IVideosRepository } from "../../repositories/i-videos-repository";

export class GetVideoUsecase {
  constructor(private videoRepository: IVideosRepository) {}

  async execute(videoId: string): Promise<Video> {
    const video = await this.videoRepository.findById(videoId);

    return video;
  }
}
