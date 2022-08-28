/// <reference types="cypress" />

import {
  IMAGE_FIELD_TEST_ID,
  INPUT_FIELD_TEST_ID,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  PORTFOLIO_LINK,
  PORTFOLIO_MEDIA,
  PORTFOLIO_PREVIEW,
  PORTFOLIO_TAB,
  PORTFOLIO_TAB_PANEL,
  PORTFOLIO_TITLE,
  SETUP_BLOCK,
  SETUP_BLOCK_CONTENT,
  SETUP_BLOCK_EXPAND_ICON,
  SETUP_BLOCK_TITLE,
} from "@constants/testConstants"

describe("Portfolio", () => {
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
  })

  it("render && modify portflio", () => {
    cy.wait("@aPortfolioData")

    cy.getById(PORTFOLIO_TAB).click()

    // PORTFOLIO SETUP & PREVIEW RENDER TEST
    cy.getById(PORTFOLIO_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PORTFOLIO_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then(portfolioBlock => {
        cy.wrap(portfolioBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
        cy.wrap(portfolioBlock).findById(IMAGE_FIELD_TEST_ID).eq(0).validateImageInput("https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg")
        cy.wrap(portfolioBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("http://sports.hankooki.com/news/articleView.html?idxno=6798068")
        cy.wrap(portfolioBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("스마트미러")
        cy.wrap(portfolioBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).validateMultiLineInput("스마트미러 프로젝트\n하드웨어 소프트웨어 제작")
      })

    cy.getById(PORTFOLIO_PREVIEW)
      .eq(0)
      .then($portfolioPreview => {
        cy.wrap($portfolioPreview).find("img").should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg")
        cy.wrap($portfolioPreview).findById(PORTFOLIO_TITLE).contains("스마트미러")
        // cy.wrap($portfolioPreview).findById(PORTFOLIO_CONTENT).contains("이카운트")
        cy.wrap($portfolioPreview).findById(PORTFOLIO_LINK).contains("http://sports.hankooki.com/news/articleView.html?idxno=6798068")
      })

    // PORTFOLIO MODIFIY TEST
    cy.getById(PORTFOLIO_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($portfolioBlock => {
        cy.wrap($portfolioBlock).findById(IMAGE_FIELD_TEST_ID).eq(0).typeImageInput("https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg")
        cy.wrap($portfolioBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("https://github.com/choiseunghyeon")
        cy.wrap($portfolioBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("멀티프로젝트")
        cy.wrap($portfolioBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("멀티 프로젝트\nVSC Extension 제작")
      })

    cy.getById(PORTFOLIO_PREVIEW)
      .eq(0)
      .then($portfolioPreview => {
        cy.wrap($portfolioPreview).findById(PORTFOLIO_MEDIA).should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg")
        cy.wrap($portfolioPreview).findById(PORTFOLIO_TITLE).contains("멀티프로젝트")
        // cy.wrap($portfolioPreview).findById(PORTFOLIO_CONTENT).contains("이카운트")
        cy.wrap($portfolioPreview).findById(PORTFOLIO_LINK).contains("https://github.com/choiseunghyeon")
      })
  }) // the end of test case
})
