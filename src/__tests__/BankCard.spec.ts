import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BankCard from '@/components/BankCard.vue'

describe('BankCard', () => {
  it('renders properly', () => {
    const cardId = '99'
    const cardDescription = 'Lorem ipsum dolor sit amet'
    const wrapper = mount(BankCard, { props: { id: cardId, description: cardDescription } })
    expect(wrapper.classes()).not.toContain('shiner')
    expect(wrapper.text()).toContain(cardId)
    expect(wrapper.text()).toContain(cardDescription)
  })

  it('renders properly as placeholder', () => {
    const cardId = '#'
    const cardDescription = '#'
    const wrapper = mount(BankCard, { props: { id: cardId, description: cardDescription } })
    expect(wrapper.classes()).toContain('shiner')
  })
})
