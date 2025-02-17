/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECOND_IN_MS = 3000
  beforeEach(function(){
      cy.visit('./src/index.html')
  })

  it('verifica o titulo da aplicação', function(){
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
      cy.get('#firstName').type('Clinton', {delay: 0})
      cy.get('#lastName').type('Rodrigues', {delay: 0})
      cy.get('#email').type('clinton@example.com', {delay: 0})
      cy.get('#open-text-area').type('Teste', {delay: 0})
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')
  })

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
  cy.get('#firstName').type('Clinton', {delay: 0})
  cy.get('#lastName').type('Rodrigues', {delay: 0})
  cy.get('#email').type('clintonexample.com', {delay: 0})
  cy.get('#open-text-area').type('Teste', {delay: 0})
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
})

it('validação telefone', function(){
  cy.get('#phone')
  .type('Rodrigues', {delay: 0})
  .should('have.value', '')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
  cy.get('#firstName').type('Clinton', {delay: 0})
  cy.get('#lastName').type('Rodrigues', {delay: 0})
  cy.get('#email').type('clintonexample.com', {delay: 0})
  cy.get('#open-text-area').type('Teste', {delay: 0})
  cy.get('#phone-checkbox').click()
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
  cy.get('#firstName').type('Clinton', {delay: 0}).should('have.value', 'Clinton').clear().should('have.value','')
  cy.get('#lastName').type('Rodrigues', {delay: 0}).should('have.value', 'Rodrigues').clear().should('have.value','')
  cy.get('#email').type('clintonexample.com', {delay: 0}).should('have.value', 'clintonexample.com').clear().should('have.value','')
  cy.get('#phone').type('9999999999999', {delay: 0}).should('have.value', '9999999999999').clear().should('have.value','')
})
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', function(){
  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', function(){
  cy.get('#product').select('YouTube').should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', function(){
  cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', function(){
  cy.get('#product').select(1).should('have.value', 'blog')
})

it('marca o tipo de atendimento "Feedback"',function(){
  cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
})

it('marca cada tipo de atendimento',function(){
  cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
  })
})

it('marca ambos checkboxes, depois desmarca o último',function(){
  cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
  cy.get('#firstName').type('Clinton', {delay: 0})
  cy.get('#lastName').type('Rodrigues', {delay: 0})
  cy.get('#email').type('clintonexample.com', {delay: 0})
  cy.get('#open-text-area').type('Teste', {delay: 0})
  cy.get('#phone-checkbox').check()
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
})

it('seleciona um arquivo da pasta fixtures',function(){
  cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/teste01.pdf').should(function($input){
      expect($input[0].files[0].name).to.equal('teste01.pdf')
  })
})

it('seleciona um arquivo simulando um drag-and-drop',function(){
  cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/teste01.pdf', {action:'drag-drop'}).should(function($input){
      expect($input[0].files[0].name).to.equal('teste01.pdf')
  })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
  cy.fixture('teste01.pdf').as('sampleFile')
  cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input){
      expect($input[0].files[0].name).to.equal('teste01.pdf')
  })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
  cy.get('#privacy a').should('have.attr','target','_blank')
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
  cy.get('#privacy a').should('have.attr','target','_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
  cy.get('#privacy a').invoke('removeAttr','target').click()
  cy.contains('Talking About Testing').should('be.visible')
})

it('preenche os campos obrigatórios e envia o formulário com o clock', function(){
  cy.clock()
  cy.get('#firstName').type('Clinton', {delay: 0})
  cy.get('#lastName').type('Rodrigues', {delay: 0})
  cy.get('#email').type('clinton@example.com', {delay: 0})
  cy.get('#open-text-area').type('Teste', {delay: 0})
  cy.contains('button','Enviar').click()
  cy.get('.success').should('be.visible')
  cy.tick(THREE_SECOND_IN_MS)

  cy.get('.success').should('not.be.visible')
})

it('preenche os campos obrigatórios e envia o formulário com o clock', function(){
  cy.clock()
  cy.get('#firstName').type('Clinton', {delay: 0})
  cy.get('#lastName').type('Rodrigues', {delay: 0})
  cy.get('#email').type('clinton@example.com', {delay: 0})
  cy.get('#open-text-area').type('Teste', {delay: 0})
  cy.contains('button','Enviar').click()
  cy.get('.success').should('be.visible')
  cy.tick(THREE_SECOND_IN_MS)

  cy.get('.success').should('not.be.visible')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
  cy.get('#privacy a').invoke('removeAttr','target').click()
  cy.contains('Talking About Testing').should('be.visible')
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
  cy.get('#privacy a').should('have.attr','target','_blank')
})



})
