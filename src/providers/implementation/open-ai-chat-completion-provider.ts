import {
  ChatCompletionChunk,
  Completions,
} from "openai/resources/chat/index.mjs";
import { Stream } from "openai/streaming.mjs";
import { ICompletionProvider, IRequest } from "../i-completion-provider";
import { openai } from "../../lib/openai";

export class OpenAiCompletionProvider implements ICompletionProvider {
  private openAiCompletion: Completions;

  constructor() {
    this.openAiCompletion = openai.chat.completions;
  }

  async complete(request: IRequest): Promise<Stream<ChatCompletionChunk>> {
    const { temperature, prompt } = request;

    return await this.openAiCompletion.create({
      model: "gpt-3.5-turbo-16k",
      stream: true,
      temperature: temperature,
      messages: [{ role: "user", content: prompt }],
    });
  }
}
