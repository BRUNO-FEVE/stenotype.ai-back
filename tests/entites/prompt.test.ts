import { expect, test } from "vitest";
import { Prompt } from "../../src/entities/prompt";
import { ObjectId } from "mongodb";

test("create prompt", () => {
  const prompt = new Prompt({
    id: new ObjectId(),
    title: "Title Test",
    template: "template Test",
  });

  expect(prompt).toBeInstanceOf(Prompt);
  expect(prompt.title).toEqual("Title Test");
});

test("invalid title", () => {
  expect(() => {
    new Prompt({
      id: new ObjectId(),
      title: "ab",
      template: "Template Test",
    });
  }).toThrowError();
});

test("invalid template", () => {
  expect(() => {
    new Prompt({
      id: new ObjectId(),
      title: "Title Test",
      template: "ab",
    });
  }).toThrowError();
});
