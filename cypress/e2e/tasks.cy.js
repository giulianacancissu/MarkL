///<reference types="cypress" />

describe('tarefas', () => {

  let testData;

  before(()=> {
    cy.fixture('tasks').then(t => {
      testData = t
    })
  })

  context('cadastro', () => {
    it('deve cadastrar uma nova tarefa', () => {

      const taskName = 'Ler um livro de Node.js'

      cy.removeTaskByname(taskName)
      cy.createTask(taskName)

      cy.contains('main div p', taskName)
        .should('be.visible')
    })

    it('não deve permitir tarefa duplicada', () => {

      const task = testData.dup

      cy.removeTaskByname(task.name)
      cy.postTask(task)
      cy.createTask(task.name)

      cy.get('swa12-html-container')
          .should('be.visible')
          .should('have.text', 'Task already exists!')
    })

    it('campo obrigatório', () => {
      cy.createTask()
      cy.isRequired('This is a required filed')
    })
  })
  context('atualização', ()=> {
    it('deve concluir uma tarefa'() => {
      cont task = {
        name:'Pagar contas de consumo',
        is_done: false
      }

      cy.removeTaskByname(task.name)
      cy.postTask(task)

      cy.visit('/')

      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

      cy.contains('p', task.name)
        .should('have.css', 'text-decoration-line', 'line-through')
    })
  })

  context('exclusão', ()=> {
    it('deve remover uma tarefa'()=> {
      cont task = {
        name:'Estudar Javacript',
        is_done: false
      }

      cy.removeTaskByname(task.name)
      cy.postTask(task)

      cy.visit('/')

      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemDelete]')
        .click()

      cy.contains('p', task.name)
        .should('not.exist')
    })
  })
})