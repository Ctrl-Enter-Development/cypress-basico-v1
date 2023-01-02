Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Clinton', {delay: 0})
    cy.get('#lastName').type('Rodrigues', {delay: 0})
    cy.get('#email').type('clinton@example.com', {delay: 0})
    cy.get('#open-text-area').type('Teste', {delay: 0})
    cy.contains('button','Enviar').click()
})