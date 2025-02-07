describe('testes de autenticação', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept("POST", "/api/login").as("login")
    // cy.intercept("POST", "/api/login", {
    //   delay: 1000,
    // }).as("login")
  })

  it('logar com sucesso.', () => {
    cy.get('input[id=input-username]').type('teste')
    cy.get('input[id=input-password]').type('123')
    cy.get('button[type=submit]').click()
    cy.wait('@login')
    cy.url().should('contain', '/products')
  })
})