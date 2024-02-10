import { faker } from "@faker-js/faker";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "./../../src/services/recommendationsService.js";
import { jest } from "@jest/globals";

describe("recommendation service unit test suite", () => {
  it("the create function should be called, increment", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        null;
      });
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});
    const createRecommendationData = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=GrKQvyXpNgc",
    };
    await recommendationService.insert(createRecommendationData);
    expect(recommendationRepository.create).toHaveBeenCalled();
  });
  it("throw conflict error", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: 2,
        };
        return recommendation;
      });
    const createRecommendationData = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=GrKQvyXpNgc",
    };
    const promise = recommendationService.insert(createRecommendationData);
    expect(promise).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
  });

  it("the updateScore function should be called", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: 5,
        };
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});
    await recommendationService.upvote(2);
    expect(recommendationRepository.updateScore).toHaveBeenCalled();
  });
  it("throw not found error", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        null;
      });
    jest;
    const promise = recommendationService.upvote(2);
    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });

  it("the updateScore function should be called, decrement", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: 5,
        };
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: 5,
        };
        return recommendation;
      });
    await recommendationService.downvote(2);
    expect(recommendationRepository.updateScore).toHaveBeenCalled();
  });
  it("the remove function should be called", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: -5,
        };
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        const recommendation = {
          id: 2,
          name: "music",
          youtubeLink: "link",
          score: -6,
        };
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});
    await recommendationService.downvote(2);
    expect(recommendationRepository.remove).toHaveBeenCalled();
  });
});
