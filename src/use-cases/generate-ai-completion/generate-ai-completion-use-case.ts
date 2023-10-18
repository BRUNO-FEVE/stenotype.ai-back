import { ICompletionProvider } from "../../providers/i-completion-provider";
import { IVideosRepository } from "../../repositories/i-videos-repository";
import { IGenerateCompletionRequestDTO } from "./generate-ai-completion-dto";
import { Stream } from "openai/streaming.mjs";
import { ChatCompletionChunk } from "openai/resources/chat/index.mjs";

export class GenerateCompletionUsecase {
  constructor(
    private complerionProvider: ICompletionProvider,
    private videoRepository: IVideosRepository
  ) {}

  async execute(
    data: IGenerateCompletionRequestDTO
  ): Promise<Stream<ChatCompletionChunk>> {
    const { videoId, prompt, temperature } = data;

    const video = await this.videoRepository.findById(videoId);

    if (!video) throw new Error("Video not found.");

    const promptWithTranscription = prompt.replace(
      "{transcription}",
      video.trasncription
    );

    const completionResponse = this.complerionProvider.complete({
      temperature,
      prompt: promptWithTranscription,
    });

    return completionResponse;
  }
}
