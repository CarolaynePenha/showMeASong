import { faker } from "@faker-js/faker";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "./../../src/services/recommendationsService.js";
import { jest } from "@jest/globals";

describe("recommendation service unit test suite", () => {
  it("insert function should call create function", async () => {
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
  it(" insert function should throw conflict error", async () => {
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

  it("the updateScore function should be called, increment", async () => {
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
  it(" upvote should throw not found error", async () => {
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

  it("the get function should call findAll function", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {});
    await recommendationService.get();
    expect(recommendationRepository.findAll).toHaveBeenCalled();
  });

  it("the getAmountByScore function should be called", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {});
    await recommendationService.getTop(10);
    expect(recommendationRepository.getAmountByScore).toHaveBeenCalled();
  });

  it("the getRandom function should return recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        const recommendation = [
          {
            id: 2,
            name: "music",
            youtubeLink: "link",
            score: -5,
          },
          {
            id: 8,
            name: "music",
            youtubeLink: "link",
            score: 2,
          },
        ];
        return recommendation;
      });
    const recommendation = await recommendationService.getRandom();
    expect(recommendation).resolves;
  });
  it("the getRandom function should return notFoundError", async () => {
    const mockFunction = (): any => {
      const recommendation = [];
      return recommendation;
    };
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        const recommendation = [];
        return recommendation;
      })
      .mockImplementationOnce((): any => {
        const recommendation = [];
        return recommendation;
      });
    const promise = recommendationService.getRandom();
    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });

  it("deleteAll function should be called", async () => {
    jest
      .spyOn(recommendationRepository, "deleteAll")
      .mockImplementationOnce((): any => {});
    await recommendationService.deleteAll();
    expect(recommendationRepository.deleteAll).toHaveBeenCalled();
  });
});
