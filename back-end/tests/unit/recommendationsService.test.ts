import { faker } from "@faker-js/faker";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "./../../src/services/recommendationsService.js";
import { jest } from "@jest/globals";

describe("recommendation service unit test suite", () => {
  it("the create function should be called", async () => {
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
});
