import { openai } from "../../lib/openai";
import { IRequest, ITranscriptionProvider } from "../i-transcription-provider";
import { Transcriptions } from "openai/resources/audio/index.mjs";

export class WisperTranscriptionProvider implements ITranscriptionProvider {
  private wisper: Transcriptions;

  constructor() {
    this.wisper = openai.audio.transcriptions;
  }

  async transcribe(request: IRequest): Promise<string> {
    const fileStream = request.filePath;

    const transcription = await this.wisper.create({
      file: fileStream,
      model: "whisper-1",
      language: "pt",
      temperature: 0,
      prompt: request.prompt,
    });

    return transcription.text;
  }
}
