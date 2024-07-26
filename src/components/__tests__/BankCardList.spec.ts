import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import BankCardList from '@/components/BankCardList.vue'

describe('BankCardList', () => {
  const testCards = [
    {id: '99', 'description': 'lorem ipsum'},
    {id: '99', 'description': 'lorem ipsum'},
    {id: '99', 'description': 'lorem ipsum'},
  ]

  const mockClickManage = vi.fn()

  it('renders properly', () => {
    const wrapper = mount(BankCardList, { 
      props: { 
        cards: testCards, 
        cardSelector: mockClickManage
      } 
    })

    expect(wrapper.findAll('.bank-card-list__item')).toHaveLength(testCards.length)

    wrapper.find('.bank-card-list__item').trigger('click')
    expect(mockClickManage).toHaveBeenCalled()
  })
})
