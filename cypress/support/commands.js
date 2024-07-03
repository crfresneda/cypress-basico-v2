Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
   cy.get('#firstName').type('Claudia')
   cy.get('#lastName').type('Fresneda')
   cy.get('#email').type('cfresneda@lenovo.com')
   cy.get('#open-text-area').type('OLÁ ECOSSISTEMA FIT')
   //cy.get('button[type="submit"]').click() 
   cy.contains('button', 'Enviar').click()
   /**/
})