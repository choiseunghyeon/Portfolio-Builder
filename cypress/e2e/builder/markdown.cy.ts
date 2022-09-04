/// <reference types="cypress" />

import { MARKDOWN_PREVIEW, MARKDOWN_TAB, MARKDOWN_TAB_PANEL, MULTI_LINE_INPUT_FIELD_TEST_ID, SETUP_BLOCK, SETUP_BLOCK_CONTENT, SETUP_BLOCK_EXPAND_ICON } from "@constants/testConstants"

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
    cy.wait("@aPortfolioData")
  })

  it("render markdown", () => {
    cy.getById(MARKDOWN_TAB).click()

    // MARKDOWN SETUP & PREVIEW RENDER TEST
    cy.getById(MARKDOWN_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(MARKDOWN_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($markdownBlock => {
        cy.wrap($markdownBlock).click()

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
  }) // the end of test case
  it.only("modify markdown", () => {
    cy.getById(MARKDOWN_TAB).click()

    // MARKDOWN MODIFIY TEST
    cy.getById(MARKDOWN_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($markdownBlock => {
        cy.wrap($markdownBlock).click()
        cy.wrap($markdownBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("# 신규 Framework를 제작 중인데 핵심 개념은 모듈화다.")
      })

    cy.getById(MARKDOWN_PREVIEW)
      .eq(0)
      .then($markdownBlock => {
        cy.wrap($markdownBlock).find("h1").contains("신규 Framework를 제작 중인데 핵심 개념은 모듈화다.")
      })
  }) // the end of test case
})
