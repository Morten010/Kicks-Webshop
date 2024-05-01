import { faker } from '@faker-js/faker';

describe('register page', () => {
  it('Should show validation errors when leaving all fields blank', () => {
    cy.visit('/auth/signup')
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="error-firstName"]').should("exist")
    cy.get('[data-cy="error-lastName"]').should("exist")
    cy.get('[data-cy="error-gender"]').should("exist")
    cy.get('[data-cy="error-password"]').should("exist")
    cy.get('[data-cy="error-email"]').should("exist")
  }) 

  it("Create a user succesfully", () => {
    cy.visit('/auth/signup')
    cy.get('[data-cy="firstName"]').type(faker.person.firstName())
    cy.get('[data-cy="lastName"]').type(faker.person.lastName())
    cy.get('[data-cy="gender-male"]').click()
    cy.get('[data-cy="email"]').type("faker-" + faker.internet.email())
    cy.get('[data-cy="password"]').type("test1234")
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="status-msg"]').contains("Sucessfully created an account,").should("exist")
  })
})