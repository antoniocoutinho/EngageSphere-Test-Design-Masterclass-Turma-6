/// <reference types="cypress" />

describe('EngageSphere', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted')
    cy.visit('/')
  })

  it('should keep filter when coming back from the customer detail view ', () => {
    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('Retail')
    cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Retail')
    cy.contains('button', 'View')
    cy.get('[data-testid="size-filter"]').should('contain', 'All')
    cy.get('[data-testid="industry-filter"]').should('contain', 'All')
    cy.contains('button', 'View')
      .should('be.visible')
      .click();
    cy.get('table').should('not.exist')
    cy.contains('button', 'Back').click()
    cy.get('table').should('be.visible')
    cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Retail')
  })

  it('should go back to the customers list when clicking "back" button', () => {
    cy.contains('button', 'View')
      .should('be.visible')
      .click();
    cy.contains('button', 'Back').click();
    cy.contains('h2', 'Hi there!').should('be.visible')
    cy.get('table').should('be.visible')
  })

  it('should render the "Hi there" greeting when no name is provided', () => {
    cy.get('[data-testid="name"]').should('have.value', '')
    cy.contains('h2', 'Hi there').should('be.visible')
  })

  it('render the footer with the right text and links', () => {
    cy.contains('p', `Copyright ${new Date().getFullYear()} - Talking About Testing`)
      .should('be.visible')
    cy.contains('a', 'Podcast')
      .should('be.visible')
      .and('have.attr', 'href', 'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
    cy.contains('a', 'Courses')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talking-about-testing.vercel.app/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should render the "Hi Joe" greeting when name is provided', () => {
    cy.get('[data-testid="name"]').type('Joe')
    cy.contains('h2', 'Hi Joe').should('be.visible')
  })

  it("should render the header with a heading, theme's toggle, and a text input field", () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[data-testid="theme-toggle"]').should('be.visible')
    cy.get('[data-testid="name"]').should('be.visible')
  })

  it("should open and close the messenger", () => {
    cy.get('[data-testid="messenger-form-box"]').should('not.exist')
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-form-box"]').should('be.visible')
    cy.get('[aria-label="Close messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-form-box"]').should('not.exist')
  })

  it("should make sure all messenger's fields are mandatory and the first one is focused", () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]')
      .should('be.focused')
      .should('have.attr', 'required')
    cy.get('[data-testid="messenger-email-input"]').should('have.attr', 'required')
    cy.get('[data-testid="messenger-message-input"]').should('have.attr', 'required')
  })

  it("should show and hide a success message when successfully submitting the messenger form", () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').type('John Doe')
    cy.get('[data-testid="messenger-email-input"]').type('jhon.doe@test.com')
    cy.get('[data-testid="messenger-message-input"]').type('This is a test message.')
    cy.get('[data-testid="messenger-send-button"]').click()
    cy.contains('[role="alert"]', 'Your message has been sent.').should('be.visible')
  })

  it.only("should clear all the messenger's form fields when filling them, closing the messenger, and opening it again", () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').type('John Doe')
    cy.get('[data-testid="messenger-email-input"]').type('jhon.doe@test.com')
    cy.get('[data-testid="messenger-message-input"]').type('This is a test message.')
    cy.get('[aria-label="Close messenger"]').click()
    cy.get('[aria-label="Close messenger"]').should('not.exist');
    cy.get('[data-testid="messenger-form-box"]').should('not.exist');
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('[data-testid="messenger-name-input"]').should('have.value', '')
    cy.get('[data-testid="messenger-email-input"]').should('have.value', '')
    cy.get('[data-testid="messenger-message-input"]').should('have.value', '')
  })

  it("should show the Company name and Action columns and hide the ID, Industry, Number of Employees, and Size columns in a mobile viewport", () => {
    cy.viewport(375, 667);
    cy.contains('th', 'ID').should('not.be.visible')
    cy.contains('th', 'Industry').should('not.be.visible')
    cy.contains('th', 'Company name').should('be.visible')
    cy.contains('button', 'Number of employees').should('not.be.visible')
    cy.contains('th', 'Size').should('not.be.visible')
    cy.contains('th', 'Action').should('be.visible')
  })
})
