/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add("getById", value => {
  return cy.get(`[data-testid=${value}]`)
})
Cypress.Commands.add(
  "findById",
  {
    prevSubject: true,
  },
  (subject, value) => {
    return subject.find(`[data-testid=${value}]`)
  }
)

// subject로 jquery 넘어옴 왜 chainable이 안들어오지?
Cypress.Commands.add("typeTextInput", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).find("input").clear().type(text)
})

Cypress.Commands.add("typeMultiLineInput", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).find("textarea").eq(0).clear().type(text)
})

Cypress.Commands.add("typeImageInput", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).clear().type(text)
})

Cypress.Commands.add("validateMultiLineInput", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).find("textarea").eq(0).should("have.value", text)
})
Cypress.Commands.add("validateTextInput", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).find("input").should("have.value", text)
})
Cypress.Commands.add("validateImageInput", { prevSubject: true }, (subject, text) => {
  console.log(subject)
  return cy.wrap(subject).should("have.value", text)
})
export {}
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
