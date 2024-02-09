import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

function createRecommendationsBody() {
  const recommendation = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=1go53lCwNxQ",
  };
  return recommendation;
}

async function createRecomendation() {
  const recommendation = createRecommendationsBody();
  return await prisma.recommendation.create({ data: recommendation });
}
async function createRecomendations() {
  const recommendations = [
    {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=1go53lCwNxQ",
    },
    {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=ZJpIXreCJm8",
    },
    {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=1go53lCwNxQ",
    },
  ];
  return await prisma.recommendation.createMany({ data: recommendations });
}

const recommendationFactory = {
  createRecommendationsBody,
  createRecomendation,
  createRecomendations,
};

export default recommendationFactory;
