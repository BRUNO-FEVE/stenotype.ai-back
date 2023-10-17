import { ReadStream } from "node:fs";

export interface IRequest {
  filePath: ReadStream;
  prompt: string;
}

export interface ITranscriptionProvider {
  transcribe(request: IRequest): Promise<string>;
}
