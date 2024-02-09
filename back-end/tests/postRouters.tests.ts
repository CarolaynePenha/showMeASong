import supertest from "supertest";
import recommendationFactory from "./factories/recommendationFactory.js";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import { listenerCount } from "events";

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
  });
}
