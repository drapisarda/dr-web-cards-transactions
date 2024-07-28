import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TransactionList from '@/components/TransactionList.vue'

describe('TransactionList', () => {
  const transactions = [
    { id: '99', description: 'lorem ipsum', amount: 99 },
    { id: '99', description: 'lorem ipsum', amount: 99 },
    { id: '99', description: 'lorem ipsum', amount: 99 }
  ]

  it('renders properly', async () => {
    const wrapper = mount(TransactionList, {
      props: { transactions }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.transaction-list__item')).toHaveLength(transactions.length)
  })
})
