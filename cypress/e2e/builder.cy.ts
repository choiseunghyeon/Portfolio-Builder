/// <reference types="cypress" />

import {
  CAREER_PREVIEW,
  DATE_FIELD_FROM_TEST_ID,
  DATE_FIELD_TO_TEST_ID,
  DEFINE_COLUMN_COUNT,
  DEFINE_COLUMN_COUNT_SELECT,
  DEFINE_LAYOUT_TYPE,
  IMAGE_FIELD_TEST_ID,
  INPUT_FIELD_TEST_ID,
  MARKDOWN_PREVIEW,
  MINI_BLOCK,
  MINI_MAP_PANEL,
  MINI_MAP_TAB,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  PORTFOLIO_PREVIEW,
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
  SETUP_BLOCK_TITLE,
} from "@constants/testConstants"

/**
 *
 * 렌더링
 * 미니맵 작동
 * 블락 편집
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

describe("Builder", () => {
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

  describe("Rendering Test", () => {
    it("Minimap", () => {
      cy.wait("@aPortfolioData")
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
    })

    // drag&drop 변경

    it("Profile Setup", () => {
      cy.wait("@aPortfolioData")
      const testImageHref = "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg"
      const mainText = "Front End Developer"
      const subText = "안녕하세요 최승현입니다."
      cy.getById(PROFILE_TAB).click()
      cy.getById(PROFILE_TAB_PANEL).then($profileTabPanel => {
        cy.wrap($profileTabPanel).contains("내용").click()
        cy.wrap($profileTabPanel)
          .find(`[data-testid=${SETUP_BLOCK}]`)
          .eq(0)
          .then($profileBlock => {
            cy.wrap($profileBlock).find(`[data-testid=ExpandMoreIcon]`).click()
            cy.wrap($profileBlock).find(`[data-testid=${IMAGE_FIELD_TEST_ID}]`).clear().type(testImageHref)
            typeTextInput(cy.wrap($profileBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(0), mainText)
            typeTextInput(cy.wrap($profileBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(1), subText)
            // cy.wrap($profileBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(0).clear().type(mainText)
            // cy.wrap($profileBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(1).clear().type(subText)
          })
      })

      cy.getById(PROFILE_PREVIEW).then($profilePreview => {
        cy.wrap($profilePreview).find("img").should("have.attr", "src", testImageHref)
        cy.wrap($profilePreview).find(`[data-testid=${PROFILE_PREVIEW_MAIN_TEXT}]`).contains(mainText)
        cy.wrap($profilePreview).find(`[data-testid=${PROFILE_PREVIEW_SUB_TEXT}]`).contains(subText)
      })
    })

    it("Project Setup", () => {
      cy.wait("@aPortfolioData")
      const projectText = "ERP 솔루션"
      const organigationText = "이카운트"
      const dateFrom = "04012022"
      const dateTo = "05302022"
      const description = "도시·개발계획 \n분석 전문가"
      const skills = "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\nredux, redux-saga 적용 및 가이드 공유"
      const skillSet = ["React"]
      cy.getById(PROJECT_TAB).click()
      cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
        cy.wrap($projectTabPanel).contains("내용").click()
        cy.wrap($projectTabPanel)
          .find(`[data-testid=${SETUP_BLOCK}]`)
          .eq(0)
          .then($projectBlock => {
            // block이 특정이 안되서 안보이는 field도 잡힘 / block 특정 지울 수 있게 해야 함
            cy.wrap($projectBlock).find(`[data-testid=ExpandMoreIcon]`).eq(0).click()

            typeTextInput(cy.wrap($projectBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(0), projectText)
            typeTextInput(cy.wrap($projectBlock).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(1), organigationText)
            typeTextInput(cy.wrap($projectBlock).find(`[data-testid=${DATE_FIELD_FROM_TEST_ID}]`).eq(0), dateFrom)
            typeTextInput(cy.wrap($projectBlock).find(`[data-testid=${DATE_FIELD_TO_TEST_ID}]`).eq(0), dateTo)
            typeMultiLineInput(cy.wrap($projectBlock).find(`[data-testid=${MULTI_LINE_INPUT_FIELD_TEST_ID}]`).eq(0), description)
            typeMultiLineInput(cy.wrap($projectBlock).find(`[data-testid=${MULTI_LINE_INPUT_FIELD_TEST_ID}]`).eq(1), description)
            // Skill Set 테스트
          })
      })

      cy.getById(PROJECT_PREVIEW)
        .eq(0)
        .then($firstProjectPreview => {
          cy.wrap($firstProjectPreview).find(`[data-testid=${PROJECT_PREVIEW_NAME}]`).contains(projectText)
          cy.wrap($firstProjectPreview).find(`[data-testid=${PROJECT_PREVIEW_TERM}]`).contains("2022-04-01 ~ 2022-05-30")
          cy.wrap($firstProjectPreview).find(`[data-testid=${PROJECT_PREVIEW_ORGANIGATION}]`).contains(organigationText)
          // multiline의 경우 \n 기준으로 div로 쪼개지고 값에 - 같은 기호가 붙을 수 있음
          // cy.wrap($firstProjectPreview).find(`[data-testid=${PROJECT_PREVIEW_DESCRIPTION}]`).contains(description);
          // cy.wrap($firstProjectPreview).find(`[data-testid=${PROJECT_PREVIEW_SKILLS}]`).contains(skills);
        })
    })
  })

  it("Project Layout", () => {
    cy.getById(PROJECT_TAB).click()
    cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
      cy.wrap($projectTabPanel).contains("레이아웃").click()
      cy.getById(DEFINE_LAYOUT_TYPE).should("have.length.at.least", 1)
      cy.getById(DEFINE_COLUMN_COUNT_SELECT).click()

      // 4열까지만 지원
      // 2열 클릭
      cy.getById(DEFINE_COLUMN_COUNT).should("have.length", 4).eq(1).click()

      cy.getById(PREVIEW_CONTAINER)
        .find(`[data-testid=${PROJECT_PREVIEW}]`)
        .first()
        .then($projectPreview => {
          expect($projectPreview.parent().attr("class")?.includes("xs-6")).to.be.true
        })
    })
  })

  it("Sync Block Title with own Field Value ", () => {
    cy.getById(PROJECT_TAB).click()
    cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
      cy.wrap($projectTabPanel).contains("내용").click()
      cy.wrap($projectTabPanel)
        .find(`[data-testid=${SETUP_BLOCK}]`)
        .eq(0)
        .then($firstProjectBlock => {
          // Block Title과 field value 값 동기화 검증

          cy.wrap($firstProjectBlock).find(`[data-testid=ExpandMoreIcon]`).click()
          cy.wrap($firstProjectBlock)
            .find(`[data-testid=${INPUT_FIELD_TEST_ID}]`)
            .eq(0)
            .find("input")
            .then($projectInput => {
              const titleValue = $projectInput.val()
              cy.wrap($firstProjectBlock).find(`[data-testid=${SETUP_BLOCK_TITLE}]`).should("contain.text", titleValue)
              cy.wrap($projectInput).clear().type("프로젝트1")
            })

          cy.wrap($firstProjectBlock)
            .find(`[data-testid=${INPUT_FIELD_TEST_ID}]`)
            .eq(0)
            .find("input")
            .then($projectInput => {
              const newTitleValue = $projectInput.val()
              cy.wrap($firstProjectBlock).find(`[data-testid=${SETUP_BLOCK_TITLE}]`).should("contain.text", newTitleValue)
            })
        })
    })
  })
})

function typeMultiLineInput(multiLineField, text) {
  multiLineField.find("textarea").eq(0).clear().type(text)
}

function typeTextInput(inputField, text) {
  inputField.find("input").clear().type(text)
}
