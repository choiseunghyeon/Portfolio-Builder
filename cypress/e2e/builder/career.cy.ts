/// <reference types="cypress" />

import {
  CAREER_PREVIEW,
  CAREER_TAB,
  CAREER_TAB_PANEL,
  CARRER_ORGANIGATION,
  CARRER_ROLE,
  CARRER_TERM,
  DATE_FIELD_FROM_TEST_ID,
  DATE_FIELD_TO_TEST_ID,
  INPUT_FIELD_TEST_ID,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  SETUP_BLOCK,
  SETUP_BLOCK_CONTENT,
  SETUP_BLOCK_EXPAND_ICON,
} from "@constants/testConstants"

describe("Career", () => {
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

  it("render && modify career", () => {
    cy.wait("@aPortfolioData")

    cy.getById(CAREER_TAB).click()

    // CAREER SETUP & PREVIEW RENDER TEST
    cy.getById(CAREER_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(CAREER_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then(careerBlock => {
        cy.wrap(careerBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
        cy.wrap(careerBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("이카운트")
        cy.wrap(careerBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("Front-End")
        cy.wrap(careerBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).validateTextInput("04/01/2022")
        cy.wrap(careerBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).validateTextInput("05/30/2022")
        cy.wrap(careerBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).validateMultiLineInput("View와 Data를 분리하고\n redux, redux-saga 적용 및 가이드 공유")
      })

    cy.getById(CAREER_PREVIEW)
      .eq(0)
      .then(careerBlock => {
        cy.wrap(careerBlock).findById(CARRER_ORGANIGATION).contains("이카운트")
        cy.wrap(careerBlock).findById(CARRER_TERM).contains("2022-04-01 ~ 2022-05-30")
        cy.wrap(careerBlock).findById(CARRER_ROLE).contains("Front-End")
        // cy.wrap(careerBlock).findById(CARRER_DESCRIPTION).contains("Front-End")
      })

    // CAREER MODIFIY TEST
    cy.getById(CAREER_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($careerBlock => {
        cy.wrap($careerBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("카카오")
        cy.wrap($careerBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("Back-End")
        cy.wrap($careerBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).typeTextInput("05012022")
        cy.wrap($careerBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).typeTextInput("06302022")
        cy.wrap($careerBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("성능 최적화\n트래픽")
      })

    cy.getById(CAREER_PREVIEW)
      .eq(0)
      .then(careerBlock => {
        cy.wrap(careerBlock).findById(CARRER_ORGANIGATION).contains("카카오")
        cy.wrap(careerBlock).findById(CARRER_TERM).contains("2022-05-01 ~ 2022-06-30")
        cy.wrap(careerBlock).findById(CARRER_ROLE).contains("Back-End")
      })
  }) // the end of test case
})
