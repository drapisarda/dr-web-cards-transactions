import cardsData from '../fixtures/cards.json'
import transactionsData from '../fixtures/transactions.json'
import type { Card, Transaction } from '../../src/types/types';

const selectedTransaction = 
  (cardId: string) => transactionsData[cardId as keyof typeof transactionsData] as Transaction[]

const countTransactionsBiggerThanAmount = 
  (cardId: string, amount: number) => 
    selectedTransaction(cardId).filter(transaction => transaction.amount >= amount).length

describe('User journey test', () => {

  beforeEach(() => {
    cy.intercept('GET', `/data/cards.json`, { fixture: 'cards.json' }).as('getCards')
    cy.intercept('GET', `/data/transactions_extended.json?cardId=${cardsData[0].id}`, { fixture: 'transactions.json' }).as('getTransactionsFirstCard')
    cy.intercept('GET', `/data/transactions_extended.json?cardId=${cardsData[1].id}`, { fixture: 'transactions.json' }).as('getTransactionsSecondCard')

    cy.visit('/')
    cy.wait(['@getCards', '@getTransactionsFirstCard'])
  })

  it('visits the app root url and sees the default view: first card selected', () => {    
    const selectedCard = cardsData[0] as Card
    cy.get('.transaction-list .transaction').should('have.length', selectedTransaction(selectedCard.id).length)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[0].id)[0].description)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[0].id)[0].amount)
  })

  it('can switch from one card to the other', () => {
    cy.get('.bank-card-list .bank-card').eq(1).click()
    cy.wait(['@getTransactionsSecondCard'])
    cy.get('.transaction-list .transaction').should('have.length', selectedTransaction(cardsData[1].id).length)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[1].id)[0].description)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[1].id)[0].amount)
    cy.get('.bank-card-list .bank-card').eq(0).click()
    cy.wait(['@getTransactionsFirstCard'])
    cy.get('.transaction-list .transaction').should('have.length', selectedTransaction(cardsData[0].id).length)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[0].id)[0].description)
    cy.get('.transaction-list .transaction').eq(0).should('contain', selectedTransaction(cardsData[0].id)[0].amount)
  })

  it('can filter properly', () => {
    const cardId = cardsData[0].id;

    [10, 100, 1000, 10000, 100, 10].forEach(value => {
      const expectedCount = countTransactionsBiggerThanAmount(cardId, value)
      console.log(`with ${value}, I expect to see ${expectedCount} transactions`)

      cy.get('.filter-transaction input[type="number"]').clear()
      cy.get('.filter-transaction input[type="number"]').type(`${value}`)
      cy.get('.transaction-list .transaction').should('have.length', expectedCount)
    })
  })
})
