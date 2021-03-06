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
  SETUP_BLOCK_LAYOUT,
  SETUP_BLOCK_TITLE,
} from "@constants/testConstants"

describe("Project", () => {
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

  it("render && modify project", () => {
    cy.wait("@aPortfolioData")

    cy.getById(PROJECT_TAB).click()

    // PROJECT SETUP & PREVIEW RENDER TEST
    cy.getById(PROJECT_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROJECT_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($projectBlock => {
        cy.wrap($projectBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("ERP ?????????")
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("????????????")
        cy.wrap($projectBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).validateTextInput("04/01/2022")
        cy.wrap($projectBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).validateTextInput("05/30/2022")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).validateMultiLineInput("???????????????????? ?????? ?????????")

        cy.wrap($projectBlock)
          .findById(MULTI_LINE_INPUT_FIELD_TEST_ID)
          .eq(1)
          .validateMultiLineInput("View??? Data??? ???????????? ?????? ???????????? ????????? redux middleware?????? ??????\nredux, redux-saga ?????? ??? ????????? ??????")
      })

    cy.getById(PROJECT_PREVIEW)
      .eq(0)
      .then(projectBlock => {
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_NAME).contains("ERP ?????????")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_TERM).contains("2022-04-01 ~ 2022-05-30")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_ORGANIGATION).contains("????????????")
        // multiline??? ?????? \n ???????????? div??? ???????????? ?????? - ?????? ????????? ?????? ??? ??????
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_DESCRIPTION).contains(description);
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_SKILLS).contains(skills);
      })

    // PROJECT MODIFIY TEST
    cy.getById(PROJECT_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($projectBlock => {
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("???????????????")
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("??????")
        cy.wrap($projectBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).typeTextInput("04012022")
        cy.wrap($projectBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).typeTextInput("05302022")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("?????? ???????????? ?????? \n????????? ?????? ???????????????.")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(1).typeMultiLineInput("???????????? ?????? \n??????????????? ??????")
      })

    cy.getById(PROJECT_PREVIEW)
      .eq(0)
      .then(projectBlock => {
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_NAME).contains("???????????????")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_TERM).contains("2022-04-01 ~ 2022-05-30")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_ORGANIGATION).contains("??????")
        // multiline??? ?????? \n ???????????? div??? ???????????? ?????? - ?????? ????????? ?????? ??? ??????
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_DESCRIPTION).contains(description);
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_SKILLS).contains(skills);
      })
  }) // the end of test case

  it("set layout", () => {
    cy.getById(PROJECT_TAB).click()
    cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
      cy.wrap($projectTabPanel).findById(SETUP_BLOCK_LAYOUT).click()
      cy.getById(DEFINE_LAYOUT_TYPE).should("have.length.at.least", 1)
      cy.getById(DEFINE_COLUMN_COUNT_SELECT).click()

      // 4???????????? ??????
      // 2??? ??????
      cy.getById(DEFINE_COLUMN_COUNT).should("have.length", 4).eq(1).click()

      cy.getById(PREVIEW_CONTAINER)
        .findById(PROJECT_PREVIEW)
        .first()
        .then($projectPreview => {
          expect($projectPreview.parent().attr("class")?.includes("xs-6")).to.be.true
        })
    })
  })

  it("sync Block Title with own Field Value", () => {
    cy.getById(PROJECT_TAB).click()
    cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
      cy.wrap($projectTabPanel).findById(SETUP_BLOCK_CONTENT).click()
      cy.wrap($projectTabPanel)
        .findById(SETUP_BLOCK)
        .eq(0)
        .then($firstProjectBlock => {
          // Block Title??? field value ??? ????????? ??????

          cy.wrap($firstProjectBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
          cy.wrap($firstProjectBlock)
            .findById(INPUT_FIELD_TEST_ID)
            .eq(0)
            .find("input")
            .then($projectInput => {
              const titleValue = $projectInput.val()
              cy.wrap($firstProjectBlock).findById(SETUP_BLOCK_TITLE).should("contain.text", titleValue)
              cy.wrap($projectInput).clear().type("????????????1")
            })

          cy.wrap($firstProjectBlock).findById(SETUP_BLOCK_TITLE).should("contain.text", "????????????1")
        })
    })
  })
}) // the end of describe
