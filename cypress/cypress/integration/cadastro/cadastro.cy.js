describe('Cadastro', () => {
    it('Cenário 3 - Realizar cadastro', () => {
      cy.visit('https://www.amazon.com.br/')
      cy.get('#nav-link-accountList-nav-line-1').click()
        .get('#createAccountSubmit').click()
        .get('#ap_customer_name').type('Fernando Silva')
        .get('#ap_email').type('example@example.com')
        .get('#ap_password').type('senha')
        .get('#ap_password_check').type('senha')
    })
})