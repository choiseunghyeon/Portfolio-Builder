/// <reference types="cypress" />

import {
  ALL_TECH_BLOG_BUTTON,
  FAVORITE_TECH_BLOG_BUTTON,
  NAVIGATION_CONTAINER,
  TECH_BLOG_CARD,
  TECH_BLOG_CARD_COMPANY_INFO_LINK,
  TECH_BLOG_CARD_COMPANY_NAME,
  TECH_BLOG_CARD_COMPANY_VIDEO_LINK,
  TECH_BLOG_CARD_CONTAINER,
  TECH_BLOG_CARD_CONTAINER_TITLE,
  TECH_BLOG_CARD_CONTENT,
  TECH_BLOG_CARD_DESCRIPTION,
  TECH_BLOG_CARD_FAVORITE,
  TECH_BLOG_CARD_MENU,
  TECH_BLOG_CARD_SERVICE_NAME,
} from "@constants/testConstants"

describe("Tech Blog", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/techblog")
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/techCardList/",
      },
      {
        fixture: "allTechBlogCard.json",
      }
    ).as("allTechBlogCard")

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:4000/favoriteTechCardList/",
      },
      {
        fixture: "favoriteTechBlogCard.json",
      }
    ).as("favoriteTechBlogCard")
  })

  it("render tech-blog page with favorite cards", () => {
    cy.wait("@favoriteTechBlogCard")

    cy.getById(NAVIGATION_CONTAINER).find("button").contains("Tech-blog").should("have.class", "active")

    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.wrap($techBlogCardContainer).findById(FAVORITE_TECH_BLOG_BUTTON).should("have.class", "active")
      cy.wrap($techBlogCardContainer).findById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("Favorite (6)")
      cy.wrap($techBlogCardContainer).findById(TECH_BLOG_CARD).should("have.length", 6)
      cy.wrap($techBlogCardContainer)
        .findById(TECH_BLOG_CARD)
        .first()
        .then($firstTechBlogCard => {
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_CONTENT)
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_FAVORITE)
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_MENU)
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_DESCRIPTION)
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_NAME).contains("비바리퍼블리카")
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_SERVICE_NAME).contains("토스")
        })
    })
  }) // the end of test case

  it("show all tech blog cards", () => {
    // 기능 테스트 a, b, c, e 남음
    cy.getById(TECH_BLOG_CARD_CONTAINER).then($techBlogCardContainer => {
      cy.wrap($techBlogCardContainer).findById(ALL_TECH_BLOG_BUTTON).click()

      cy.wait("@allTechBlogCard")

      cy.wrap($techBlogCardContainer).findById(ALL_TECH_BLOG_BUTTON).should("have.class", "active")
      cy.wrap($techBlogCardContainer).findById(TECH_BLOG_CARD_CONTAINER_TITLE).contains("All (11)")
      cy.wrap($techBlogCardContainer).findById(TECH_BLOG_CARD).should("have.length", 11)

      cy.wrap($techBlogCardContainer)
        .findById(TECH_BLOG_CARD)
        .first()
        .then($firstTechBlogCard => {
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_FAVORITE).click()
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_FAVORITE).should("have.attr", "data-active", "true")
          // card content 눌렀을 때 window.open stubbing 처리 https://glebbahmutov.com/blog/cypress-tips-and-tricks/#deal-with-windowopen

          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_MENU).click()
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_INFO_LINK).should("have.attr", "href").and("have.attr", "target", "_blank")
          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_COMPANY_VIDEO_LINK).should("have.attr", "href").and("have.attr", "target", "_blank")

          cy.wrap($firstTechBlogCard).findById(TECH_BLOG_CARD_DESCRIPTION)
        })
    })
  })
})
