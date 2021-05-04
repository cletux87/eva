/// <reference types="cypress" />

context('Connectors', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('Test Text Filter and remove',()=>{
        cy.wait(2000);
        cy.get('input[data-cy=\'text-input\']').type('Bitcoin');
        cy.get('td[data-cy*=\'table-row-BTC\']');
        cy.get('input[data-cy=\'text-input\']').clear()
        cy.get('tr:nth-child(50) > td[data-cy*=\'table-row-\']');
    })
   
    it('Test Sort Name', ()=>{
        cy.wait(2000);
        cy.get('div[data-cy=\'name-filter\']').click();
        cy.get('div[data-cy=\'full-name\']').should('contain', 'A');

    })

    it('Test Dropdown',()=>{
        cy.wait(2000);
        cy.get('input[data-cy=\'filter-qty\']').type('1');
        cy.get('select[data-cy=\'filter-sign\']').select('<');
        cy.get('select[data-cy=\'filter-concept\']').select('Price');
        cy.get('div[data-cy=\'price-filter\']').click();
        cy.get('tbody > tr:nth-child(1) > td:nth-child(3) > span[data-cy=\'price-amount\']').should('contain', '$ 0.')
    })
});
