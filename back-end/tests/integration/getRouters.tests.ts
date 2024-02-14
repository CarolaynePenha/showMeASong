import supertest from "supertest";
import recommendationFactory from "./factories/recommendationFactory.js";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

export default function getRoutersTests() {
  describe("get routers tests suite", () => {
    beforeEach(async () => {
      await recommendationFactory.createRecomendations();
    });
    it("get random recommendations", async () => {
      const response = await supertest(app).get(`/recommendations/random`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toBeUndefined();
      const secondRandomRecommentadion = await supertest(app).get(
        `/recommendations/random`
      );
      expect(secondRandomRecommentadion.body).not.toBe(response.body);
    });

    it("get recommendations", async () => {
      const response = await supertest(app).get(`/recommendations`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("get top recommendations", async () => {
      let recommendation = await recommendationFactory.createRecomendation();
      await prisma.recommendation.update({
        where: { id: recommendation.id },
        data: {
          score: { ["increment"]: 5 },
        },
      });
      recommendation = await recommendationFactory.createRecomendation();
      await prisma.recommendation.update({
        where: { id: recommendation.id },
        data: {
          score: { ["increment"]: 1 },
        },
      });
      const response = await supertest(app).get(`/recommendations/top/3`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toEqual(3);
      expect(response.body[0].score).toBeGreaterThan(response.body[1].score);
    });

    it("get recommendation by id", async () => {
      const createdRecommendation =
        await recommendationFactory.createRecomendation();
      const response = await supertest(app).get(
        `/recommendations/${createdRecommendation.id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.id).toBe(createdRecommendation.id);
    });

    it("given a non-existent  id, returns 404", async () => {
      const response = await supertest(app).get(`/recommendations/58750`);
      expect(response.status).toBe(404);
    });
  });
}
