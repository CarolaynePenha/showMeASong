import supertest from "supertest";
import recommendationFactory from "./factories/recommendationFactory.js";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

export default function postRoutersTestes() {
  describe("post routers tests suite", () => {
    it("given right input, post a recommendation", async () => {
      const recommendation = recommendationFactory.createRecommendationsBody();
      const response = await supertest(app)
        .post(`/recommendations`)
        .send(recommendation);
      expect(response.status).toBe(201);
      const recommendationPosted = await prisma.recommendation.findUnique({
        where: { name: recommendation.name },
      });
      expect(recommendationPosted).not.toBeNull();
      expect(recommendationPosted).not.toBeUndefined();
    });
    it("given input without some items, returns 422", async () => {
      const recommendation = recommendationFactory.createRecommendationsBody();
      delete recommendation.youtubeLink;
      const response = await supertest(app)
        .post(`/recommendations`)
        .send(recommendation);
      expect(response.status).toBe(422);
    });
    it("given input with wrong link, returns 422", async () => {
      const wrongRecommendation = {
        name: faker.music.songName(),
        youtubeLink: faker.internet.url(),
      };
      const response = await supertest(app)
        .post(`/recommendations`)
        .send(wrongRecommendation);
      expect(response.status).toBe(422);
    });
    it("given an existing name, returns 409", async () => {
      const recommendation = await recommendationFactory.createRecomendation();
      delete recommendation.id, delete recommendation.score;
      const response = await supertest(app)
        .post(`/recommendations`)
        .send(recommendation);
      expect(response.status).toBe(409);
    });

    it("given existing id, upvote", async () => {
      const recommendation = await recommendationFactory.createRecomendation();
      let response = await supertest(app).post(
        `/recommendations/${recommendation.id}/upvote`
      );
      expect(response.status).toBe(200);
      let recommendationUpvote = await prisma.recommendation.findUnique({
        where: { id: recommendation.id },
      });
      expect(recommendationUpvote.score).toEqual(1);
      response = await supertest(app).post(
        `/recommendations/${recommendation.id}/upvote`
      );
      expect(response.status).toBe(200);
      recommendationUpvote = await prisma.recommendation.findUnique({
        where: { id: recommendation.id },
      });
      expect(recommendationUpvote.score).toEqual(2);
    });

    it("given a non-existent ID for upvote, returns 404", async () => {
      await recommendationFactory.createRecomendation();
      const response = await supertest(app).post(`/recommendations/505/upvote`);
      expect(response.status).toBe(404);
    });

    it("given existing id, downvote", async () => {
      const recommendation = await recommendationFactory.createRecomendation();
      let response = await supertest(app).post(
        `/recommendations/${recommendation.id}/downvote`
      );
      expect(response.status).toBe(200);
      let recommendationUpvote = await prisma.recommendation.findUnique({
        where: { id: recommendation.id },
      });
      expect(recommendationUpvote.score).toEqual(-1);
      response = await supertest(app).post(
        `/recommendations/${recommendation.id}/downvote`
      );
      expect(response.status).toBe(200);
      recommendationUpvote = await prisma.recommendation.findUnique({
        where: { id: recommendation.id },
      });
      expect(recommendationUpvote.score).toEqual(-2);
    });
    it("given a non-existent ID for downvote, returns 404", async () => {
      await recommendationFactory.createRecomendation();
      const response = await supertest(app).post(
        `/recommendations/505/downvote`
      );
      expect(response.status).toBe(404);
    });
  });
}
