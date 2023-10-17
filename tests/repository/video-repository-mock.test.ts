import { expect, test } from "vitest";
import { Video } from "../../src/entites/video";
import { VideoRepositoryMock } from "../../src/repositories/video-repository-mock";

test("create new video repository", async () => {
  const video = new Video({
    id: "652cb2b17e1c9163bd794253",
    name: "audio.mp3",
    path: "/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3",
    transcription: "Trascription",
    createAt: new Date(),
  });

  const repo = new VideoRepositoryMock();
  const videoSaved = await repo.create(video);

  expect(videoSaved).toBeInstanceOf(Video);
  expect(videoSaved.id).toEqual("652cb2b17e1c9163bd794253");
});

test("create a existing video on repository", async () => {
  const video = new Video({
    id: "652cb2b17e1c9163bd794253",
    name: "audio.mp3",
    path: "/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3",
    transcription: "Trascription",
    createAt: new Date(),
  });

  const repo = new VideoRepositoryMock();
  await repo.create(video);
  const existingVideo = await repo.create(video);

  expect(existingVideo).not.toBeDefined();
});

test("find by id video on repository", async () => {
  const video = new Video({
    id: "652cb2b17e1c9163bd794253",
    name: "audio.mp3",
    path: "/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3",
    transcription: "Trascription",
    createAt: new Date(),
  });

  const repo = new VideoRepositoryMock();
  await repo.create(video);
  const videoFound = await repo.findById("652cb2b17e1c9163bd794253");

  expect(videoFound).toBeInstanceOf(Video);
  expect(videoFound).toEqual(video);
});

test("find by id  gost video on repository", async () => {
  const repo = new VideoRepositoryMock();
  const videoFound = await repo.findById("652cb2b17e1c9163bd794253");

  expect(videoFound).not.toBeDefined();
});
