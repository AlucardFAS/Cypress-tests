describe('Carrinho de compras', () => {

  before(() => {
    const AMAZON_URL = Cypress.env('AMAZON_URL');
    cy.visit(AMAZON_URL);
  })
  
  it('Cenário 1 - Incluir produto no carrinho', () => {
    cy.fixture('amazonProducts').as('product').then( function () {
      cy.get('#twotabsearchtextbox').type(this.product.manga + '{enter}', {force:true});
    

      cy.get('[data-asin] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .s-product-image-container > .rush-component > .a-link-normal > .a-section > .s-image')
          .first().click()
        .get('#add-to-cart-button', { timeout: 10000 }).click()
        .get('#sw-gtc > .a-button-inner > .a-button-text').click();
      cy.get('.a-truncate-cut').should('have.text', this.product.manga);
    })
  })

  it('Cenário 2 - Incluir produto 3 no carrinho e validar preço total', () => {
    cy.fixture('amazonProducts').as('product').then( function () {
      cy.get('#twotabsearchtextbox').type(this.product.copo + '{enter}', {force:true})
        .get('[data-asin] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .s-product-image-container')
          .eq(2).click();
    })

    cy.get('#corePrice_feature_div > .a-section > .a-price > .a-offscreen')
        .invoke('text').then((product_price) => {
          cy.get('#add-to-cart-button').click()
            .get('#sw-gtc > .a-button-inner > .a-button-text').click();

        cy.get('#sc-subtotal-amount-buybox > .a-size-medium')
          .invoke('text').then((cart_price) => {
            let total_price = cart_price;
            expect(total_price.replace('R$','').trim()).to.eq(product_price.replace('R$',''));
        })
        })
  })
})