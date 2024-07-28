import { afterEach, assert, describe, expect, it, vi } from "vitest";
import transactionsFixures from './fixtures/transactions.json'
import cardsFixures from './fixtures/cards.json'
import axios from "axios";
import getTransactions from "@/composables/getTransactions";
import type { Card, TransactionsContainer } from "@/types/types";

describe('getTransactions composable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns all card transactions from axios call', async () => {
    const testData: TransactionsContainer = transactionsFixures
    const selectedCard: Card = cardsFixures[0]
    vi.spyOn(axios, 'get').mockResolvedValue({ data: testData })

    const transactionsForTheCard = await getTransactions(selectedCard.id)
    expect(transactionsForTheCard).toStrictEqual(testData[selectedCard.id as keyof TransactionsContainer])
  })

  it('throws error on failing API call', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('this is a test error'))

    const failingCardId = 'lorem'
    const transactions = getTransactions(failingCardId)
    expect(transactions).rejects.toThrowError(`Error fetching transactions for card: "${failingCardId}"`)
  })
})