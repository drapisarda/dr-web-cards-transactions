import { describe, it, expect, vi, beforeAll } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { getCards, getTransactions } from '@/composables/getCards'

describe('App', () => {
  let wrapper: any

  const mockCards = [
    { id: '1', name: 'Card 1' },
    { id: '2', name: 'Card 2' }
  ]
  const mockTransactions = [
    { id: '1', amount: 100 },
    { id: '2', amount: 200 }
  ]

  vi.mock('getCards', () => mockTransactions)
  vi.mock('getTransactions', () => mockCards)

  beforeAll(() => {
    wrapper = mount(App, {})
    wrapper.vm.onCardSelected
  })

  it('renders properly', () => {
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('can filter', () => {
    wrapper.find('#search-input').setValue(99)
  })
})
