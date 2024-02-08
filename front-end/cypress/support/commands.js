Cypress.Commands.add("resetRecommendations", () => {
  cy.log("resetando recomendações");
  cy.request("POST", "http://localhost:5500/recommendations/reset");
});
Cypress.Commands.add("createRecommendation", (recommendation) => {
  cy.request(
    "POST",
    "http://localhost:5500/recommendations",
    recommendation
  ).then((res) => {
    cy.log(res);
  });
});
