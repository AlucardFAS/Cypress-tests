describe('Carrinho de compras', () => {
  // it('Cenário 1 - Incluir produto no carrinho', () => {
  //   cy.visit('https://www.amazon.com.br/')
  //   cy.get('#twotabsearchtextbox').type('hunter x hunter 35{enter}', {force:true})
  //     .get('[data-asin] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .s-product-image-container > .rush-component > .a-link-normal > .a-section > .s-image')
  //       .first().click()
  //     .get('#add-to-cart-button', { timeout: 10000 }).click()
  //     .get('#sw-gtc > .a-button-inner > .a-button-text').click()
  //     .get('.a-truncate-cut').should('have.text', 'Hunter X Hunter - Vol. 35')
  // })

  it('Cenário 2 - Incluir produto 3 no carrinho', () => {
    cy.visit('https://www.amazon.com.br/')
    cy.get('#twotabsearchtextbox').type('copo{enter}', {force:true})
      .get('[data-asin] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .s-product-image-container')
        .eq(2).click()

    cy.get('#corePrice_feature_div > .a-section > .a-price > .a-offscreen')
        .invoke('text').then((price_text) => {
          price_text = price_text.value.trim()
          cy.get('#add-to-cart-button').click()
          cy.get('#sw-gtc > .a-button-inner > .a-button-text').click()
          cy.get('#sc-subtotal-amount-buybox > .a-size-medium').should('have.text', price_text)
        })

    cy.get('#corePrice_feature_div > .a-section > .a-price > .a-offscreen').invoke('text').then(message => {
      let wags = message;
      cy.wrap(wags).as('wags')
    })

    cy.get('@wags').then(wags => {
      expect(wags).to.contain("Portsmouth")
      cy.get('#sc-subtotal-amount-buybox > .a-size-medium').should('have.text', price_text)
    })
  })
})