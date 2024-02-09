import supertest from "supertest";
import recommendationFactory from "./factories/recommendationFactory.js";
import app from "../src/app.js";

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
      const response = await supertest(app).get(`/recommendations/top/10`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      console.log("response.body: ", response.body);
    });
  });
}
describe("get routers tests suite", () => {
  it("get recommendation by id", async () => {
    const createdRecommendation =
      await recommendationFactory.createRecomendation();
    console.log("createdRecommendation: ", createdRecommendation);
    const response = await supertest(app).get(
      `/recommendations/${createdRecommendation.id}`
    );
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(createdRecommendation.id);
  });
});
