/// <reference types="cypress" />

import {
  CAREER_PREVIEW,
  MARKDOWN_PREVIEW,
  MARKDOWN_TAB,
  MARKDOWN_TAB_PANEL,
  MINI_BLOCK,
  MINI_MAP_PANEL,
  MINI_MAP_TAB,
  PORTFOLIO_PREVIEW,
  PROFILE_PREVIEW,
  PROJECT_PREVIEW,
} from "@constants/testConstants"

describe("MiniMap", () => {
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

  it("render minimap", () => {
    // MINIMAP Rendering
    cy.getById(MINI_MAP_TAB).click()
    // setup render 확인
    cy.getById(MINI_MAP_PANEL)
      .getById(MINI_BLOCK)
      .within($miniBlockList => {
        cy.wrap($miniBlockList[0]).contains("프로필")
        cy.wrap($miniBlockList[1]).contains("프로젝트")
        cy.wrap($miniBlockList[2]).contains("포트폴리오")
        cy.wrap($miniBlockList[3]).contains("커리어")
        cy.wrap($miniBlockList[4]).contains("마크다운")
      })

    // preview render 확인
    cy.getById("previewBlockContainer").within($previewBlockContainerList => {
      cy.wrap($previewBlockContainerList[0]).getById(PROFILE_PREVIEW)
      cy.wrap($previewBlockContainerList[1]).getById(PROJECT_PREVIEW)
      cy.wrap($previewBlockContainerList[2]).getById(PORTFOLIO_PREVIEW)
      cy.wrap($previewBlockContainerList[3]).getById(CAREER_PREVIEW)
      cy.wrap($previewBlockContainerList[4]).getById(MARKDOWN_PREVIEW)
    })
  }) // the end of test case
})
