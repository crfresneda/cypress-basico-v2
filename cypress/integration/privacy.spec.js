//Repete a quantidade de vezes informada no primeiro argumento e executa o callback (dentro da função)
Cypress._.times(20, function () {
     it.only('ex2. Desafio Alternativo: Testa a pagina Privacy de forma independente', function () {
          cy.visit('./src/privacy.html')
          cy.contains('Talking About Testing').should('be.visible')
         
     })
})


/**/