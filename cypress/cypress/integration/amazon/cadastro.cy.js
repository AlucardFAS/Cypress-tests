describe('Cadastro', () => {

  before(() => {
    cy.visit('https://www.amazon.com.br/')
  })

    it('Cenário 3 - Realizar cadastro', () => {
      cy.get('#nav-link-accountList-nav-line-1').click()
        .get('#createAccountSubmit').click()

      cy.fixture('userData').as('user').then( function () {
        cy.get('#ap_customer_name').type(this.user.name)
          .get('#ap_email').type(this.user.email)
          .get('#ap_password').type(this.user.password)
          .get('#ap_password_check').type(this.user.password)
      })
    })
})