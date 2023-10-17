import { test, expect } from "vitest";
import { MongoDBVideoRepository } from "../../src/repositories/implementation/mongo-db-video-repository";
import { Video } from "../../src/entities/video";
import { ObjectId } from "mongodb";

const VIDEO_ID = "6518f3faf843e7f7e143612b";

test("get video by ID", async () => {
  const repo = new MongoDBVideoRepository();

  const video = await repo.findById(VIDEO_ID);

  expect(video).toBeInstanceOf(Video);
  expect(video.name).toEqual("testRight.mp3");
});

test("get unexisting video by ID", async () => {
  const repo = new MongoDBVideoRepository();
  const randomFakeId = new ObjectId().toString();

  await expect(async () => {
    await repo.findById(randomFakeId);
  }).rejects.toThrowError();
});
