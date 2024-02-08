/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";
const recommendation = {
  name: faker.music.songName(),
  youtubeLink: "https://www.youtube.com/watch?v=-UJCMfuFtSQ",
};

describe("app test", () => {
  beforeEach(() => {
    cy.resetRecommendations();
  });

  it("should post a recommendation", () => {
    cy.visit(`${URL}`);
    cy.get("#songName").type(recommendation.name);
    cy.get("#songLink").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("recommendations");
    cy.get("#submit").click();
    cy.wait("@recommendations");

    cy.contains(recommendation.name).should("be.visible");
  });
});

describe("vote test", () => {
  beforeEach(() => {
    cy.resetRecommendations();
    cy.createRecommendation(recommendation);
  });

  it("should post a upvote", () => {
    cy.visit(`${URL}`);
    let currentScore;

    cy.get("#div-vote")
      .invoke("text")
      .then((text) => {
        currentScore = parseInt(text);
      });

    cy.intercept("POST", "**/upvote").as("upvote");
    cy.get("#upvote").click();
    cy.wait("@upvote");

    cy.get("#div-vote")
      .invoke("text")
      .then((text) => {
        const updatedScore = parseInt(text);
        expect(updatedScore).to.equal(currentScore + 1);
      });
  });

  it("should post a downvote", () => {
    cy.visit(`${URL}`);
    let currentScore;

    cy.get("#div-vote")
      .invoke("text")
      .then((text) => {
        currentScore = parseInt(text);
      });

    cy.intercept("POST", "**/downvote").as("downvote");
    cy.get("#downvote").click();
    cy.wait("@downvote");

    cy.get("#div-vote")
      .invoke("text")
      .then((text) => {
        const updatedScore = parseInt(text);
        expect(updatedScore).to.equal(currentScore - 1);
      });
  });
});

describe("menu test", () => {
  beforeEach(() => {
    cy.resetRecommendations();
    cy.createRecommendation(recommendation);
  });

  it("should go to /top", () => {
    cy.visit(`${URL}`);

    cy.get("#top").click();
    cy.url().should("equal", `${URL}/top`);
  });
  it("should go to /random", () => {
    cy.visit(`${URL}`);

    cy.get("#random").click();
    cy.url().should("equal", `${URL}/random`);
  });

  it("should go to /home", () => {
    cy.visit(`${URL}/top`);

    cy.get("#home").click();
    cy.url().should("equal", `${URL}/`);
  });
});
