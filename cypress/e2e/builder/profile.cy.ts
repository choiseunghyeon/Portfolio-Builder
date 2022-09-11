/// <reference types="cypress" />

import {
  IMAGE_FIELD_TEST_ID,
  INPUT_FIELD_TEST_ID,
  PROFILE_PREVIEW,
  PROFILE_PREVIEW_CONTACT_EMAIL,
  PROFILE_PREVIEW_CONTACT_PHONE_NUMBER,
  PROFILE_PREVIEW_MAIN_TEXT,
  PROFILE_PREVIEW_SUB_TEXT,
  PROFILE_TAB,
  PROFILE_TAB_PANEL,
  SELECT_FIELD_TEST_ID,
  SELECT_MENU_FIELD_TEST_ID,
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
    cy.wait("@aPortfolioData")
  })

  it("redner test", () => {
    // PROFILE RENDER TEST
    cy.getById(PROFILE_TAB).click()
    cy.getById(PROFILE_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROFILE_TAB_PANEL)
      .findById(SETUP_BLOCK)
      .eq(0)
      .then($profileBlock => {
        cy.wrap($profileBlock).click()
        // cy.wrap($profileBlock).findById(IMAGE_FIELD_TEST_ID).validateImageInput("https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
        cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("Front End Developer")
        cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("안녕하세요 최승현입니다.")
      })

    cy.getById(PROFILE_PREVIEW).then($profilePreview => {
      cy.wrap($profilePreview).find("img").should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_MAIN_TEXT).contains("Front End Developer")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_SUB_TEXT).contains("안녕하세요 최승현입니다.")
    })
  })
  it("modify profile block", () => {
    // PROFILE MODIFY TEST
    cy.getById(PROFILE_TAB).click()
    cy.getById(PROFILE_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROFILE_TAB_PANEL).then($profileTabPanel => {
      cy.wrap($profileTabPanel)
        .findById(SETUP_BLOCK)
        .eq(0)
        .then($profileBlock => {
          cy.wrap($profileBlock).click()
          cy.wrap($profileBlock).findById(IMAGE_FIELD_TEST_ID).typeImageInput("https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("Back End Developer")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("안녕하세요 홍길동입니다.")
          cy.wrap($profileBlock).findById(SELECT_FIELD_TEST_ID).eq(0).click()
          cy.getById(SELECT_MENU_FIELD_TEST_ID).eq(2).contains("Contact").click()

          // validation 포함
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(2).typeTextInput("010")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(2).find("p").contains("010는 올바른 전화번호가 아닙니다.")

          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(2).typeTextInput("01234567890123456789012345")
          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(2).find("p").contains("제한 글자25자를 초과합니다.")

          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(2).typeTextInput("010-1234-5678")

          cy.wrap($profileBlock).findById(INPUT_FIELD_TEST_ID).eq(3).typeTextInput("test@gmail.com")
        })
    })

    cy.getById(PROFILE_PREVIEW).then($profilePreview => {
      cy.wrap($profilePreview).find("img").should("have.attr", "src", "https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_MAIN_TEXT).contains("Back End Developer")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_SUB_TEXT).contains("안녕하세요 홍길동입니다.")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_CONTACT_PHONE_NUMBER).contains("010-1234-5678")
      cy.wrap($profilePreview).findById(PROFILE_PREVIEW_CONTACT_EMAIL).contains("test@gmail.com")
    })
  })
}) // the end of test case
