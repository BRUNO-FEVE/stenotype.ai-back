import { test, expect } from "vitest";
import { MongoDBVideoRepository } from "../../src/repositories/implementation/mongo-db-video-repository";
import { GetVideoUsecase } from "../../src/use-cases/get-video/get-video-use-case";
import { Video } from "../../src/entities/video";
import { ObjectId } from "mongodb";

const VIDEO_ID = "6518f3faf843e7f7e143612b";

test("get video usecase", async () => {
  const repo = new MongoDBVideoRepository();
  const getVideoUsecase = new GetVideoUsecase(repo);

  const video = await getVideoUsecase.execute(VIDEO_ID);

  expect(video).toBeInstanceOf(Video);
  expect(video.name).toEqual("testRight.mp3");
});

test("unexisting video", async () => {
  const repo = new MongoDBVideoRepository();
  const getVideoUsecase = new GetVideoUsecase(repo);
  const randomFakeId = new ObjectId().toString();

  await expect(async () => {
    await getVideoUsecase.execute(randomFakeId);
  }).rejects.toThrowError();
});
