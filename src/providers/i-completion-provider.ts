import { ChatCompletionChunk } from "openai/resources/chat/index.mjs";
import { Stream } from "openai/streaming.mjs";

export interface IRequest {
  temperature: number;
  prompt: string;
}

export interface ICompletionProvider {
  complete(request: IRequest): Promise<Stream<ChatCompletionChunk>>;
}
