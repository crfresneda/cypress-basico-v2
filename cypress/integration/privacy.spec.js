it('ex2. Desafio Alternativo: Testa a pagina Privacy de forma independente', function () {
     cy.visit('./src/privacy.html')
     cy.contains('Talking About Testing').should('be.visible')
    
})