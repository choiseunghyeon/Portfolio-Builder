/// <reference types="cypress" />

import {
  ADD_BLOCK_BUTTON,
  DATE_FIELD_FROM_TEST_ID,
  DATE_FIELD_TO_TEST_ID,
  DEFINE_COLUMN_COUNT,
  DEFINE_COLUMN_COUNT_SELECT,
  DEFINE_LAYOUT_TYPE,
  INPUT_FIELD_TEST_ID,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  PREVIEW_CONTAINER,
  PROJECT_PREVIEW,
  PROJECT_PREVIEW_NAME,
  PROJECT_PREVIEW_ORGANIGATION,
  PROJECT_PREVIEW_TERM,
  PROJECT_TAB,
  PROJECT_TAB_PANEL,
  REMOVE_BLOCK_BUTTON,
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
    cy.wait("@aPortfolioData")
  })

  it("render project", () => {
    cy.getById(PROJECT_TAB).click()

    // PROJECT SETUP & PREVIEW RENDER TEST
    cy.getById(PROJECT_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROJECT_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($projectBlock => {
        cy.wrap($projectBlock).click()
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(0).validateTextInput("ERP 솔루션")
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(1).validateTextInput("이카운트")
        cy.wrap($projectBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).validateTextInput("04/01/2022")
        cy.wrap($projectBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).validateTextInput("05/30/2022")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).validateMultiLineInput("도시·개발계획 분석 전문가")

        cy.wrap($projectBlock)
          .findById(MULTI_LINE_INPUT_FIELD_TEST_ID)
          .eq(1)
          .validateMultiLineInput("View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\nredux, redux-saga 적용 및 가이드 공유")
      })

    cy.getById(PROJECT_PREVIEW)
      .eq(0)
      .then(projectBlock => {
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_NAME).contains("ERP 솔루션")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_TERM).contains("2022-04-01 ~ 2022-05-30")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_ORGANIGATION).contains("이카운트")
        // multiline의 경우 \n 기준으로 div로 쪼개지고 값에 - 같은 기호가 붙을 수 있음
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_DESCRIPTION).contains(description);
        // cy.wrap($firstProjectPreview).findById(PROJECT_PREVIEW_SKILLS).contains(skills);
      })
  }) // the end of test case

  it("modify project block", () => {
    cy.getById(PROJECT_TAB).click()

    // PROJECT SETUP & PREVIEW RENDER TEST
    cy.getById(PROJECT_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()

    // PROJECT MODIFIY TEST
    cy.getById(PROJECT_TAB_PANEL)
      .getById(SETUP_BLOCK)
      .eq(0)
      .then($projectBlock => {
        cy.wrap($projectBlock).click()

        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(0).typeTextInput("스마트미러")
        cy.wrap($projectBlock).findById(INPUT_FIELD_TEST_ID).eq(1).typeTextInput("개인")
        cy.wrap($projectBlock).findById(DATE_FIELD_FROM_TEST_ID).eq(0).typeTextInput("04012022")
        cy.wrap($projectBlock).findById(DATE_FIELD_TO_TEST_ID).eq(0).typeTextInput("05302022")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(0).typeMultiLineInput("뷰티 유튜버를 보며 \n화장을 하고 싶었습니다.")
        cy.wrap($projectBlock).findById(MULTI_LINE_INPUT_FIELD_TEST_ID).eq(1).typeMultiLineInput("하드웨어 제작 \n소프트웨어 제작")
      })

    cy.getById(PROJECT_PREVIEW)
      .eq(0)
      .then(projectBlock => {
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_NAME).contains("스마트미러")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_TERM).contains("2022-04-01 ~ 2022-05-30")
        cy.wrap(projectBlock).findById(PROJECT_PREVIEW_ORGANIGATION).contains("개인")
        // multiline의 경우 \n 기준으로 div로 쪼개지고 값에 - 같은 기호가 붙을 수 있음
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

      // 4열까지만 지원
      // 2열 클릭
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
          // Block Title과 field value 값 동기화 검증

          cy.wrap($firstProjectBlock).click()
          cy.wrap($firstProjectBlock)
            .findById(INPUT_FIELD_TEST_ID)
            .eq(0)
            .find("input")
            .then($projectInput => {
              const titleValue = $projectInput.val()
              cy.wrap($firstProjectBlock).findById(SETUP_BLOCK_TITLE).should("contain.text", titleValue)
              cy.wrap($projectInput).clear().type("프로젝트1")
            })

          cy.wrap($firstProjectBlock).findById(SETUP_BLOCK_TITLE).should("contain.text", "프로젝트1")
        })
    })
  })

  it("add block && remove block", () => {
    cy.getById(PROJECT_TAB).click()

    cy.getById(PROJECT_TAB_PANEL).findById(SETUP_BLOCK_CONTENT).click()
    cy.getById(PROJECT_TAB_PANEL).findById(ADD_BLOCK_BUTTON).click()

    cy.getById(PROJECT_TAB_PANEL).getById(SETUP_BLOCK).should("have.length", 2)

    cy.getById(PROJECT_TAB_PANEL).getById(SETUP_BLOCK).last().findById(REMOVE_BLOCK_BUTTON).click()

    cy.getById(PROJECT_TAB_PANEL).getById(SETUP_BLOCK).should("have.length", 1)
  })
}) // the end of describe
