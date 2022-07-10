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

/**
 *
 * 렌더링
 *  - MiniMap O
 *  - Profile O
 *  - Project
 *  - Career
 *  - Portfolio
 *  - MarkDown
 * 미니맵 작동
 * 블락 편집
 *  - MiniMap O
 *  - Profile O
 *  - Career
 *  - Project
 *  - Portfolio
 *  - MarkDown
 *
 *  값 입력 시 prwview 작동하는지
 *    - profile 완료
 *    - project 완료 - skillset 빼고
 *  Validation 잘 먹는지
 * 그룹 블락
 *  블락간 DnD
 *  삭제
 *  추가
 * 레이아웃 모드
 *  열 반영
 *  레이아웃 반영
 * Project, Career, Portfolio Block Title은 각 Block의 한 field 값 반영
 */

describe("Profile", () => {
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

  it("render && modify profile", () => {
    cy.wait("@aPortfolioData")

    cy.getById(PROFILE_TAB).click()
    // PROFILE RENDER TEST
    cy.getById(PROFILE_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROFILE_TAB_PANEL)
      .findById(SETUP_BLOCK)
      .eq(0)
      .then($profileBlock => {
        cy.wrap($profileBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
        // cy.wrap($profileBlock).findById(IMAGE_FIELD_TEST_ID).validateImageInput("https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
        cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("Front End Developer")
        cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("안녕하세요 최승현입니다.")
      })

    cy.getById(PROFILE_PREVIEW).then($profilePreview => {
      cy.wrap($profilePreview).find("img").should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_MAIN_TEXT).contains("Front End Developer")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_SUB_TEXT).contains("안녕하세요 최승현입니다.")
    })

    // PROFILE MODIFY TEST
    cy.getById(PROFILE_TAB_PANEL).then($profileTabPanel => {
      cy.wrap($profileTabPanel)
        .findById(SETUP_BLOCK)
        .eq(0)
        .then($profileBlock => {
          // cy.wrap($profileBlock).findById(SETUP_BLOCK_EXPAND_ICON).click()
          // cy.wrap($profileBlock).find(`[data-testid=ExpandMoreIcon]`).click()
          cy.wrap($profileBlock).findById(IMAGE_FIELD_TEST_ID).typeImageInput("https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("Back End Developer")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("안녕하세요 홍길동입니다.")
          // cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(0).clear().type(mainText)
          // cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(1).clear().type(subText)
        })
    })

    cy.getById(PROFILE_PREVIEW).then($profilePreview => {
      cy.wrap($profilePreview).find("img").should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_MAIN_TEXT).contains("Back End Developer")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_SUB_TEXT).contains("안녕하세요 홍길동입니다.")
    })
  }) // the end of test case
})
