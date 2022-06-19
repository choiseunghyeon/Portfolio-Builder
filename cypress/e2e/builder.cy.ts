/// <reference types="cypress" />

import {
  CAREER_PREVIEW,
  DATE_FIELD_FROM_TEST_ID,
  DATE_FIELD_TO_TEST_ID,
  IMAGE_FIELD_TEST_ID,
  INPUT_FIELD_TEST_ID,
  MINI_BLOCK,
  MINI_MAP_PANEL,
  MINI_MAP_TAB,
  MULTI_LINE_INPUT_FIELD_TEST_ID,
  PORTFOLIO_PREVIEW,
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
} from "@type/constants"

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
 */

describe("Builder", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/")
  })

  describe("Rendering Test", () => {
    it("Minimap", () => {
      cy.getById(MINI_MAP_TAB).click()
      // setup render 확인
      cy.getById(MINI_MAP_PANEL)
        .getById(MINI_BLOCK)
        .within($miniBlockList => {
          cy.wrap($miniBlockList[0]).contains("프로필")
          cy.wrap($miniBlockList[1]).contains("커리어")
          cy.wrap($miniBlockList[2]).contains("프로젝트")
          cy.wrap($miniBlockList[3]).contains("포트폴리오")
        })

      // preview render 확인
      cy.getById("previewBlockContainer").within($previewBlockContainerList => {
        cy.wrap($previewBlockContainerList[0]).getById(PROFILE_PREVIEW)
        cy.wrap($previewBlockContainerList[1]).getById(CAREER_PREVIEW)
        cy.wrap($previewBlockContainerList[2]).getById(PROJECT_PREVIEW)
        cy.wrap($previewBlockContainerList[3]).getById(PORTFOLIO_PREVIEW)
      })
    })

    // drag&drop 변경

    // setup render 확인
    // preview render 확인
  })
  it("Profile Setup", () => {
    const testImageHref = "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg"
    const mainText = "Front End Developer"
    const subText = "안녕하세요 :) 프론트엔드 개발자 최승현입니다."
    cy.getById(PROFILE_TAB).click()
    cy.getById(PROFILE_TAB_PANEL).then($profileTabPanel => {
      cy.wrap($profileTabPanel).contains("내용").click()
      cy.wrap($profileTabPanel).find(`[data-testid=ExpandMoreIcon]`).click()
      cy.wrap($profileTabPanel).find(`[data-testid=${IMAGE_FIELD_TEST_ID}]`).clear().type(testImageHref)
      cy.wrap($profileTabPanel).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(0).clear().type(mainText)
      cy.wrap($profileTabPanel).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(1).clear().type(subText)
    })

    cy.getById(PROFILE_PREVIEW).then($profilePreview => {
      cy.wrap($profilePreview).find("img").should("have.attr", "src", testImageHref)
      cy.wrap($profilePreview).find(`[data-testid=${PROFILE_PREVIEW_MAIN_TEXT}]`).contains(mainText)
      cy.wrap($profilePreview).find(`[data-testid=${PROFILE_PREVIEW_SUB_TEXT}]`).contains(subText)
    })
  })
  it.only("Project Setup", () => {
    const projectText = "대출 추천 재개발"
    const organigationText = "현대자동차"
    const dateFrom = "04012022"
    const dateTo = "06112022"
    const description = `도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통
    호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표`
    const skills = `View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리
    redux, redux-saga 적용 및 가이드 공유`
    cy.getById(PROJECT_TAB).click()
    cy.getById(PROJECT_TAB_PANEL).then($projectTabPanel => {
      cy.wrap($projectTabPanel).contains("내용").click()
      // block이 특정이 안되서 안보이는 field도 잡힘 / block 특정 지울 수 있게 해야 함
      cy.wrap($projectTabPanel).find(`[data-testid=ExpandMoreIcon]`).eq(0).click()
      cy.wrap($projectTabPanel).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(0).clear().type(projectText)
      cy.wrap($projectTabPanel).find(`[data-testid=${INPUT_FIELD_TEST_ID}]`).eq(1).clear().type(organigationText)
      cy.wrap($projectTabPanel).find(`[data-testid=${DATE_FIELD_FROM_TEST_ID}]`).eq(0).find("input").clear().type(dateFrom)
      cy.wrap($projectTabPanel).find(`[data-testid=${DATE_FIELD_TO_TEST_ID}]`).eq(0).find("input").clear().type(dateTo)
      cy.wrap($projectTabPanel).find(`[data-testid=${MULTI_LINE_INPUT_FIELD_TEST_ID}]`).eq(0).clear().type(description)
      cy.wrap($projectTabPanel).find(`[data-testid=${MULTI_LINE_INPUT_FIELD_TEST_ID}]`).eq(1).clear().type(skills)
      // Skill Set 테스트
    })

    // cy.getById(PROJECT_PREVIEW).then($projectPreview => {
    //   cy.wrap($projectPreview).find(`[data-testid=${PROJECT_PREVIEW_NAME}]`).contains(projectText)
    //   cy.wrap($projectPreview).find(`[data-testid=${PROJECT_PREVIEW_ORGANIGATION}]`).contains(organigationText)
    //   cy.wrap($projectPreview).find(`[data-testid=${PROJECT_PREVIEW_TERM}]`).contains("2022-04-01 ~ 2022-06-11")
    //   cy.wrap($projectPreview).find(`[data-testid=${PROJECT_PREVIEW_DESCRIPTION}]`).contains(description)
    //   cy.wrap($projectPreview).find(`[data-testid=${PROJECT_PREVIEW_SKILLS}]`).contains(skills)
    //   // Skill Set 테스트
    // })
  })
  //   it("", () => {
  //     // We use the `cy.get()` command to get all elements that match the selector.
  //     // Then, we use `should` to assert that there are two matched items,
  //     // which are the two default items.
  //     cy.get(".todo-list li").should("have.length", 2)

  //     // We can go even further and check that the default todos each contain
  //     // the correct text. We use the `first` and `last` functions
  //     // to get just the first and last matched elements individually,
  //     // and then perform an assertion with `should`.
  //     cy.get(".todo-list li").first().should("have.text", "Pay electric bill")
  //     cy.get(".todo-list li").last().should("have.text", "Walk the dog")
  //   })

  //   it("can add new todo items", () => {
  //     // We'll store our item text in a variable so we can reuse it
  //     const newItem = "Feed the cat"

  //     // Let's get the input element and use the `type` command to
  //     // input our new list item. After typing the content of our item,
  //     // we need to type the enter key as well in order to submit the input.
  //     // This input has a data-test attribute so we'll use that to select the
  //     // element in accordance with best practices:
  //     // https://on.cypress.io/selecting-elements
  //     cy.get("[data-test=new-todo]").type(`${newItem}{enter}`)

  //     // Now that we've typed our new item, let's check that it actually was added to the list.
  //     // Since it's the newest item, it should exist as the last element in the list.
  //     // In addition, with the two default items, we should have a total of 3 elements in the list.
  //     // Since assertions yield the element that was asserted on,
  //     // we can chain both of these assertions together into a single statement.
  //     cy.get(".todo-list li").should("have.length", 3).last().should("have.text", newItem)
  //   })

  //   it("can check off an item as completed", () => {
  //     // In addition to using the `get` command to get an element by selector,
  //     // we can also use the `contains` command to get an element by its contents.
  //     // However, this will yield the <label>, which is lowest-level element that contains the text.
  //     // In order to check the item, we'll find the <input> element for this <label>
  //     // by traversing up the dom to the parent element. From there, we can `find`
  //     // the child checkbox <input> element and use the `check` command to check it.
  //     cy.contains("Pay electric bill").parent().find("input[type=checkbox]").check()

  //     // Now that we've checked the button, we can go ahead and make sure
  //     // that the list element is now marked as completed.
  //     // Again we'll use `contains` to find the <label> element and then use the `parents` command
  //     // to traverse multiple levels up the dom until we find the corresponding <li> element.
  //     // Once we get that element, we can assert that it has the completed class.
  //     cy.contains("Pay electric bill").parents("li").should("have.class", "completed")
  //   })

  //   context("with a checked task", () => {
  //     beforeEach(() => {
  //       // We'll take the command we used above to check off an element
  //       // Since we want to perform multiple tests that start with checking
  //       // one element, we put it in the beforeEach hook
  //       // so that it runs at the start of every test.
  //       cy.contains("Pay electric bill").parent().find("input[type=checkbox]").check()
  //     })

  //     it("can filter for uncompleted tasks", () => {
  //       // We'll click on the "active" button in order to
  //       // display only incomplete items
  //       cy.contains("Active").click()

  //       // After filtering, we can assert that there is only the one
  //       // incomplete item in the list.
  //       cy.get(".todo-list li").should("have.length", 1).first().should("have.text", "Walk the dog")

  //       // For good measure, let's also assert that the task we checked off
  //       // does not exist on the page.
  //       cy.contains("Pay electric bill").should("not.exist")
  //     })

  //     it("can filter for completed tasks", () => {
  //       // We can perform similar steps as the test above to ensure
  //       // that only completed tasks are shown
  //       cy.contains("Completed").click()

  //       cy.get(".todo-list li").should("have.length", 1).first().should("have.text", "Pay electric bill")

  //       cy.contains("Walk the dog").should("not.exist")
  //     })

  //     it("can delete all completed tasks", () => {
  //       // First, let's click the "Clear completed" button
  //       // `contains` is actually serving two purposes here.
  //       // First, it's ensuring that the button exists within the dom.
  //       // This button only appears when at least one task is checked
  //       // so this command is implicitly verifying that it does exist.
  //       // Second, it selects the button so we can click it.
  //       cy.contains("Clear completed").click()

  //       // Then we can make sure that there is only one element
  //       // in the list and our element does not exist
  //       cy.get(".todo-list li").should("have.length", 1).should("not.have.text", "Pay electric bill")

  //       // Finally, make sure that the clear button no longer exists.
  //       cy.contains("Clear completed").should("not.exist")
  //     })
  //   })
})
