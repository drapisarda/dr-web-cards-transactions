import { assert, describe, expect, it, vi } from "vitest";
import { getCards, getCard } from "@/composables/getCards";
import axios from "axios";
import { afterEach } from "node:test";
import type { Card } from "@/types/types";
import cardsFixures from './fixtures/cards.json'

describe('getCards composable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns all data from axios call', async () => {
    const testData: Card[] = cardsFixures
    vi.spyOn(axios, 'get').mockResolvedValue({ data : testData })

    const cards = await getCards()

    expect(cards).toBe(testData)
  })

  it('throws error on axios fail', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('this is a test error'))

    const cards = await getCards()

    expect(cards).toStrictEqual([])
  })

  it('getCard returns a single card', async () => {
    const testData: Card[] = cardsFixures
    const selectedData = testData[0]
    vi.spyOn(axios, 'get').mockResolvedValue({ data : testData })

    const cards = await getCard(selectedData.id)

    expect(cards).toStrictEqual(selectedData)
  })

  it('getCard throws error on not existing card', async () => {
    const testData: Card[] = cardsFixures
    const failingCardId = 'lorem'
    vi.spyOn(axios, 'get').mockResolvedValue({ data : testData })

    try {
      await getCard(failingCardId)
    } catch (error: any) {
      expect(error.message).toBe(`Card with ID "${failingCardId}" not found`)
      return
    }

    assert.fail()
  })

  it('getCard throws error on multiple resulting cards', async () => {
    const testData: Card[] = [cardsFixures[0], { ...cardsFixures[0], description: 'I am a duplicate' }]
    const duplicateCardId = cardsFixures[0].id
    vi.spyOn(axios, 'get').mockResolvedValue({ data : testData })

    try {
      await getCard(duplicateCardId)
    } catch (error: any) {
      expect(error.message).toBe(`Multiple cards found with ID "${duplicateCardId}"`)
      return
    }

    assert.fail()
  })
})