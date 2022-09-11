/// <reference types="cypress" />

import {
  ALL_TECH_BLOG_BUTTON,
  FAVORITE_TECH_BLOG_BUTTON,
  NAVIGATION_CONTAINER,
  ORDER_BY_CLICK_TECH_BLOG_BUTTON,
  ORDER_BY_LATEST_TECH_BLOG_BUTTON,
  ORDER_BY_STARS_TECH_BLOG_BUTTON,
  TECH_BLOG_CARD,
  TECH_BLOG_CARD_COMPANY_INFO_LINK,
  TECH_BLOG_CARD_COMPANY_NAME,
  TECH_BLOG_CARD_COMPANY_VIDEO_LINK,
  TECH_BLOG_CARD_CONTAINER,
  TECH_BLOG_CARD_CONTAINER_NOTIFICATION,
  TECH_BLOG_CARD_CONTAINER_TITLE,
  TECH_BLOG_CARD_CONTENT,
  TECH_BLOG_CARD_DESCRIPTION,
  TECH_BLOG_CARD_FAVORITE,
  TECH_BLOG_CARD_MENU,
  TECH_BLOG_CARD_MENU_CLOSE,
  TECH_BLOG_CARD_SERVICE_NAME,
} from "@constants/testConstants"
// import techCardListByStarsJson from "../../fixtures/techCardListByStars.json"
// import updatedTechCardListByStarsJson from "../../fixtures/updateTechCardListByStars.json"

describe("Tech Blog", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/techblog")

    cy.window().then(win => {
      cy.stub(win, "open").as("open")
    })

    // this.techCardListByStars = techCardListByStarsJson

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardListByLatest",
      },
      {
        fixture: "techCardListByLatest.json",
      }
    ).as("techCardListByLatest")

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardListByFavorite",
      },
      {
        fixture: "techCardListByFavorite.json",
      }
    ).as("techCardListByFavorite")
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardListByClick",
      },
      {
        fixture: "techCardListByClick.json",
      }
    ).as("techCardListByClick")
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardListByStars",
      },
      // this.techCardListByStars
      {
        fixture: "techCardListByStars.json",
      }
    )
  })

  it("initially active tech blog navigation", () => {
    cy.getById(NAVIGATION_CONTAINER).find("button").contains("Tech-blog").should("have.attr", "data-active", "true")
  })

  it("initially show all tech blog cards by latest", () => {
    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.getById(ALL_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(ORDER_BY_LATEST_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("All (4)")
      cy.getById(TECH_BLOG_CARD).should("have.length", 4)
    })

    TestCard({
      cardIndex: 0,
      companyName: "비바리퍼블리카",
      serviceName: "토스",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })
  })

  it("show tech blog cards order by stars", function () {
    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.getById(ALL_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(ORDER_BY_STARS_TECH_BLOG_BUTTON).click()
      cy.getById(ORDER_BY_STARS_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("All (4)")
      cy.getById(TECH_BLOG_CARD).should("have.length", 4)
    })

    TestCard({
      cardIndex: 0,
      companyName: "우아한형제들",
      serviceName: "배달의민족",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })

    TestCard({
      cardIndex: 1,
      companyName: "카카오",
      serviceName: "카카오톡",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })

    /*
    favorite에 의한 바뀐 순서 테스트
    favorite 변경에 따른 list req/res 검증 포함
    */

    getTechBlogCardByIndex(1)
      .findById(TECH_BLOG_CARD_FAVORITE)
      .then($techBlogCardFavorite => {
        cy.intercept(
          {
            method: "GET",
            url: "http://localhost:4000/techCardListByStars",
          },
          {
            fixture: "updateTechCardListByStars.json",
          }
        )

        cy.wrap($techBlogCardFavorite).click()
      })

    TestCard({
      cardIndex: 0,
      companyName: "카카오",
      serviceName: "카카오톡",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: true,
    })
  })

  it("show tech blog cards order by click", () => {
    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.getById(ALL_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(ORDER_BY_CLICK_TECH_BLOG_BUTTON).click()
      cy.getById(ORDER_BY_CLICK_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("All (4)")
      cy.getById(TECH_BLOG_CARD).should("have.length", 4)
    })

    TestCard({
      cardIndex: 0,
      companyName: "카카오",
      serviceName: "카카오톡",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })

    TestCard({
      cardIndex: 1,
      companyName: "비바리퍼블리카",
      serviceName: "토스",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })

    /*
    click에 의한 바뀐 순서 테스트
    click에 따른 list req/res 검증 포함
    */
    getTechBlogCardByIndex(1)
      .findById(TECH_BLOG_CARD_CONTENT)
      .then($techBlogCardContent => {
        cy.intercept(
          {
            method: "GET",
            url: "http://localhost:4000/techCardListByClick",
          },
          {
            fixture: "updateTechCardListByClick.json",
          }
        )

        cy.wrap($techBlogCardContent).click()
      })

    TestCard({
      cardIndex: 0,
      companyName: "비바리퍼블리카",
      serviceName: "토스",
      techBlogUrl: "https://mui.com/material-ui/react-button/",
      companyInformationUrl: "https://www.naver.com/",
      videoUrl: "https://www.naver.com/",
      favorite: false,
    })
  })

  it("show favorite tech blog cards when favorite button click", () => {
    cy.getById(FAVORITE_TECH_BLOG_BUTTON).click()

    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.getById(FAVORITE_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("Favorite (2)")
      cy.getById(TECH_BLOG_CARD).should("have.length", 2)
    })
  }) // the end of test case

  it("show notification that there is no favorite tech blog cards when favorite button click", () => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardListByFavorite",
      },
      []
    )
    cy.getById(FAVORITE_TECH_BLOG_BUTTON).click()

    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.getById(FAVORITE_TECH_BLOG_BUTTON).should("have.attr", "data-active", "true")
      cy.getById(TECH_BLOG_CARD_CONTAINER_NOTIFICATION).contains("잠깐! 별을 클릭하면 관심 테크 블로그로 설정됩니다 :-)")
    })
  }) // the end of test case
})

function TestCard({ cardIndex, companyName, serviceName, techBlogUrl, companyInformationUrl, videoUrl, favorite }) {
  // CARD TEST
  cy.getById(TECH_BLOG_CARD_CONTAINER)
    .findById(TECH_BLOG_CARD)
    .eq(cardIndex)
    .then($firstTechBlogCard => {
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_CONTENT)
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_MENU)
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_DESCRIPTION)
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_NAME).contains(companyName)
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_SERVICE_NAME).contains(serviceName)
      cy.wrap($firstTechBlogCard)
        .findById(TECH_BLOG_CARD_FAVORITE)
        .should("have.attr", "data-active", "" + favorite)

      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_CONTENT).click()
      cy.get("@open").should("have.been.calledWithExactly", techBlogUrl, "_blank")

      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_MENU).click()
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_INFO_LINK).should("have.attr", "href", companyInformationUrl).and("have.attr", "target", "blank")
      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_VIDEO_LINK).should("have.attr", "href", videoUrl).and("have.attr", "target", "blank")

      cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_MENU_CLOSE).click()
    })
}

function getTechBlogCardByIndex(index) {
  return cy.getById(TECH_BLOG_CARD_CONTAINER).findById(TECH_BLOG_CARD).eq(index)
}
