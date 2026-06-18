/// <reference types="cypress" />

describe('EngageSphere', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')
    cy.visit('/')
  })

  it('should keep filter when coming back from the customer detail view ', () => {
    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('Retail')
    cy.get('[data-testid="size-filter"]').should('contain', 'Small')
    cy.get('[data-testid="industry-filter"]').should('contain', 'Technology')
    cy.contains('button', 'View')
    cy.get('[data-testid="size-filter"]').should('contain', 'All')
    cy.get('[data-testid="industry-filter"]').should('contain', 'All')
    cy.contains('button', 'View')
      .first()
      .should('be.visible')
      .click();
    cy.get('table').should('not.exist')
    cy.contains('button', 'Back').click()
    cy.get('table').should('be.visible')
    cy.get('[data-testid="size-filter"]').should('contain', 'All')
    cy.get('[data-testid="industry-filter"]').should('contain', 'All')
  })

  it('should go back to the customers list when clicking "back" button', () => {
    cy.contains('button', 'View')
      .first()
      .should('be.visible')
      .click();
    cy.contains('button', 'Back').click();
    cy.contains('h2', 'Hi there!').should('be.visible')
  })

  it('should render the "Hi there" greeting when no name is provided', () => {
    cy.get('[data-testid="name"]').should('have.value', '')
    cy.contains('h2', 'Hi there').should('be.visible')
  })

  it('render the footer with the right text and links', () => {
    cy.get('[data-testid="podcast-footer-link"]').should('have.attr', 'href', 'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo')
    cy.get('[data-testid="courses-footer-link"]').should('have.attr', 'href', 'https://talking-about-testing.vercel.app/')
    cy.get('[data-testid="blog-footer-link"]').should('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.get('[data-testid="youtube-footer-link"]').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
  })

  it('should render the "Hi Joe" greeting when name is provided', () => {
    cy.get('[data-testid="name"]').type('Joe')
    cy.contains('Hi Joe').should('be.visible')
  })

  it("should render the header with a heading, theme's toggle, and a text input field", () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[data-testid="theme-toggle"]').should('be.visible')
    cy.get('[data-testid="name"]').should('be.visible')
  })

  it("should open and close the messenger", () => {
    cy.get('[data-testid="messenger-form-box"]').should('not.exist')
    cy.get('[data-testid="open-messager-box"]').should('be.visible').click()
    cy.get('[data-testid="messenger-form-box"]').should('be.visible')
    cy.get('[data-testid="close-messager-box"]').should('be.visible').click()
    cy.get('[data-testid="messenger-form-box"]').should('not.exist')
  })

  it("should make sure all messenger's fields are mandatory and the first one is focused", () => {
    cy.get('[data-testid="open-messager-box"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').should('be.focused')
    cy.get('[data-testid="messenger-name-input"]').should('have.attr', 'required')
    cy.get('[data-testid="messenger-email-input"]').should('have.attr', 'required')
    cy.get('[data-testid="messenger-message-input"]').should('have.attr', 'required')
  })

  it("should show and hide a success message when successfully submitting the messenger form", () => {
    cy.get('[data-testid="open-messager-box"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').type('John Doe')
    cy.get('[data-testid="messenger-email-input"]').type('jhon.doe@test.com')
    cy.get('[data-testid="messenger-message-input"]').type('This is a test message.')
    cy.get('[data-testid="messenger-send-button"]').click()
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Your message has been sent.')
  })

  it("should clear all the messenger's form fields when filling them, closing the messenger, and opening it again", () => {
    cy.get('[data-testid="open-messager-box"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').type('John Doe')
    cy.get('[data-testid="messenger-email-input"]').type('jhon.doe@test.com')
    cy.get('[data-testid="messenger-message-input"]').type('This is a test message.')
    cy.get('[data-testid="messenger-name-input"]').clear()
    cy.get('[data-testid="messenger-email-input"]').clear()
    cy.get('[data-testid="messenger-message-input"]').clear()
    cy.get('[data-testid="close-messager-box"]').click()
    cy.get('[data-testid="close-messager-box"]').should('not.exist');
    cy.get('[data-testid="messenger-form-box"]').should('not.exist');
  })

  it("should show the Company name and Action columns and hide the ID, Industry, Number of Employees, and Size columns in a mobile viewport", () => {
    cy.viewport(375, 667);
    cy.get('[data-testid="id-col"]').should('not.be.visible')
    cy.get('[data-testid="company-name-col"]').should('be.visible')
    cy.get('[data-testid="industry-col"]').should('not.be.visible')
    cy.get('[data-testid="number-employees-col"]').should('not.be.visible')
    cy.get('[data-testid="size-col"]').should('not.be.visible')
    cy.get('[data-testid="action-col"]').should('be.visible')
  })
})
