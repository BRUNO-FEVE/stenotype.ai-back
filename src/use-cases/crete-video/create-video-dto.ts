import { MultipartFile } from "@fastify/multipart";

export interface ICreateVideoRequestDTO {
  file: MultipartFile;
  prompt: string;
}
