/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    //ex1 Padrão:Visita o site da aplicação antes de efetuar cada suite de teste
    beforeEach(function(){
        cy.visit('./src/index.html')
})
    
    it('ex1 Padrão: Verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
//SEÇÃO 3
        it('ex1 Padrão:Preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'Teste, Teste, Teste, Teste, Teste, Teste,este, Teste, Teste, Teste, Teste, Teste'
            cy.get('#firstName').type('Claudia')
            cy.get('#lastName').type('Fresneda')
            cy.get('#email').type('cfresneda@lenovo.com')
            cy.get('#phone').type('5555555555')
            cy.get('#open-text-area').type(longText,{delay: 0})
            //cy.get('button[type="submit"]').click()
            cy.contains('button', 'Enviar').click()
                     
            cy.get('.success').should('be.visible')
    
})

        it('ex2 Alternativo: Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
           //*Mensagem: Valide os campos obrigatórios
            cy.get('#firstName').type('Claudia')
            cy.get('#lastName').type('Fresneda')
            cy.get('#email').type('cfresneda@lenovo,com')
            cy.get('#phone').type('5555555555')
            cy.get('#open-text-area').type('Teste')
            //cy.get('button[type="submit"]').click()
            
            cy.contains('button', 'Enviar').click()
            
            
            cy.get('.error').should('be.visible')
})

        it('ex3 Alternativo: Campo telefone permanece vazio quando digitado valor não-numérico', function() {
            //Permite digitar apenas números
            cy.get('#phone')
                .type('abcdefght')
                .should('have.value', '')
            cy.get('#open-text-area').type('Teste')
            //cy.get('button[type="submit"]').click()
            
            cy.contains('button', 'Enviar').click()
            
})
        it('ex4 Alternativo: Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
            cy.get('#firstName').type('Claudia')
            cy.get('#lastName').type('Fresneda')
            cy.get('#email').type('cfresneda@lenovo,com')
            cy.get('#phone')
            cy.get('#phone-checkbox').click()
            //cy.get('button[type="submit"').click()
            
            cy.contains('button', 'Enviar').click()
            
            cy.get('.error').should('be.visible')
})        
        it('ex5 Alternativo: Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
            cy.get('#firstName')
                .type('Claudia')
                .should('have.value', 'Claudia')
                .clear()
                .should('have.value', '')

            cy.get('#lastName')
                .type('Fresneda')
                .should('have.value', 'Fresneda')
                .clear()
                .should('have.value', '')

            cy.get('#email')
                .type('cfresneda@lenovo.com')
                .should('have.value', 'cfresneda@lenovo.com')
                .clear()
                .should('have.value', '')

            cy.get('#open-text-area')
                .type('Teste Claudia')
                .should('have.value','Teste Claudia')
                .clear()
                .should('have.value', '')

            cy.get('#phone')
                .type('139997911999')
                .should('have.value', '139997911999')
                .clear()
                .should('have.value', '')

            //cy.get('button[type="submit"').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
            })
        it('ex6 Alternativo: exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
            //cy.get('button[type="submit"]').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        
})
        it('ex7 Alternativo: Envia o formuário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
                //Este método consta no arquivo commands.js
            cy.get('.success').should('be.visible')
           
})
        it('ex8 Alternativo: Substituindo todos os métodos com cy.get button e mudando para cy.get contains', function() {
            /*Ctrl + F e digite button para verificar os exercícios com cy.get 
            que foram substituídos pelo cy.contains validando um botão e o 
            texto enviará e o nome do botão enviar*/
            cy.contains('button', 'Enviar').click()
})  
//SEÇÃO 4

//CAC - TAT - PRODUTO - SELECT ITEM

        it('ex1 Padrão: Seleciona um produto (YouTube) por seu texto', function () {
            cy.get('#product')
            .select('YouTube')
            //abaixo é uma validação em valor e as letras devem ser minúsculas
            .should('have.value','youtube') 

})

        it('ex1 Alternativo: Seleciona um produto (Mentoria) por seu valor (value)', function () {
            cy.get('#product')
            .select('Mentoria')
            //abaixo é uma validação em valor e as letras devem ser minúsculas
            .should('have.value', 'mentoria')
})

        it('ex2 Alternativo: Seleciona um produto (Blog) por seu valor (value)', function () {
            cy.get('#product')
            //Selecionando pelo index 1 - blog 2 - curso 3 - mentoria 4 - YouTube 
            .select(1)
            //abaixo é uma validação em valor e as letras devem ser minúsculas
            .should('have.value', 'blog')
})

//SEÇÃO 5        
//CAC - TAT - TIPO DE ATENDIMENTO - RADIO BUTTON
        it('ex1.0 Padrão: Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        //verifica que o valor 'feedback' foi corretamente selecionado
        .should('have.value','feedback')
})

        it('ex1.1 Padrão: Marca o tipo de atendimento "Ajuda"', function () {
            cy.get('input[type="radio"][value="ajuda"]')
            .check()
            //verifica que o valor 'ajuda' foi corretamente selecionado
            .should('have.value','ajuda')
})

        it('ex1.1 Padrão: Marca o tipo de atendimento e checa', function () {
            cy.get('input[type="radio"]')
            //checa cada radio button informado conforme quantidade no length
            .should('have.length', 3)
            //passa por cada radio e recebe uma função como argumento e a função recebe cada um dos elementos
            // do .get
            .each(function($radio) {
            ////cy.wrap  encapsula o pacote de informações passado pelo argumento $radio 
            //e verifica cada um deles pelo check
            cy.wrap($radio).check()
            //selecionar todos os radios buttons e valida se cada um deles foram checados
            cy.wrap($radio).should('be.checked')
        })
    })

//SEÇÃO 6
//UNCHECK RADIO BUTTON - cy.get('input[type="checkbox"]').check()
        it('ex1 Padrão: Marca ambos checkboxes, depois desmarca o último', function () {
            //quando há mais de um elemento do tipo checkbox o cypress irá cada um deles.
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            //.first()
            //.uncheck()
            .last()
            .uncheck()
            .should('not.be.checked')

        })
        it.only('ex.1 Alternativo: Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {    
            cy.get('#firstName').type('Claudia')
            cy.get('#lastName').type('Fresneda')
            cy.get('#email').type('cfresneda@lenovo,com')
            cy.get('#phone-checkbox').check()   //por questões de semântica e robustez
            cy.contains('button', 'Enviar').click()
            
            cy.get('.error').should('be.visible')
          
        })
            
//SEÇÃO 7 - .selectFile()




})