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
  DEFINE_COLUMN_COUNT,
  DEFINE_COLUMN_COUNT_SELECT,
  DEFINE_LAYOUT_TYPE,
  IMAGE_FIELD_TEST_ID,
  INPUT_FIELD_TEST_ID,
  MARKDOWN_PREVIEW,
  MARKDOWN_TAB,
  MARKDOWN_TAB_PANEL,
  MINI_BLOCK,
  MINI_MAP_PANEL,
  MINI_MAP_TAB,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  PORTFOLIO_CONTENT,
  PORTFOLIO_LINK,
  PORTFOLIO_MEDIA,
  PORTFOLIO_PREVIEW,
  PORTFOLIO_TAB,
  PORTFOLIO_TAB_PANEL,
  PORTFOLIO_TITLE,
  PREVIEW_CONTAINER,
  PROFILE_PREVIEW,
  PROFILE_PREVIEW_MAIN_TEXT,
  PROFILE_PREVIEW_SUB_TEXT,
  PROFILE_TAB,
  PROFILE_TAB_PANEL,
  PROJECT_PREVIEW,
  PROJECT_PREVIEW_DESCRIPTION,
  PROJECT_PREVIEW_NAME,
  PROJECT_PREVIEW_ORGANIGATION,
  PROJECT_PREVIEW_SKILLS,
  PROJECT_PREVIEW_TERM,
  PROJECT_TAB,
  PROJECT_TAB_PANEL,
  SETUP_BLOCK,
  SETUP_BLOCK_CONTENT,
  SETUP_BLOCK_EXPAND_ICON,
  SETUP_BLOCK_TITLE,
} from "@constants/testConstants"

describe("MarkDown", () => {
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

  it("render && modify markdown", () => {
    cy.wait("@aPortfolioData")

    cy.getById(MARKDOWN_TAB).click()

    // MARKDOWN SETUP & PREVIEW RENDER TEST
    cy.getById(MARKDOWN_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(MARKDOWN_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($markdownBlock => {
        cy.wrap($markdownBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()

        cy.wrap($markdownBlock)
          .findById(MULTI_LINE_INPUT_FIELD_TEST_ID)
          .eq(0)
          .validateMultiLineInput(
            "# Multi Project Extension 제작 회고 \n ## 제작 동기 \n 현재 다니고 있는 ECount 회사는 Client/Server Framework를 자체 제작해서 사용한다.  \n신규 Framework를 제작 중인데 핵심 개념은 모듈화다."
          )
      })

    cy.getById(MARKDOWN_PREVIEW)
      .eq(0)
      .then(markdownBlock => {})

    // MARKDOWN MODIFIY TEST
    cy.getById(MARKDOWN_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($projectBlock => {
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("# 신규 Framework를 제작 중인데 핵심 개념은 모듈화다.")
      })

    cy.getById(MARKDOWN_PREVIEW)
      .eq(0)
      .then(markdownBlock => {})
  }) // the end of test case
})
