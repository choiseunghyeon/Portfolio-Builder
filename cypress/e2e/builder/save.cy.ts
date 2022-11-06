/// <reference types="cypress" />

describe("Portfolio Save", () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit("http://localhost:3000/")
        cy.intercept(
          {
            method: "GET",
            url: "http://localhost:4000/portfolio/1",
          },
          {
            fixture: "aPortfolioData.json",
          }
        ).as("aPortfolioData")
        cy.wait("@aPortfolioData")
      })

      
})