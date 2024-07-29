import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TransactionContent from '@/components/TransactionContent.vue'

describe('BankCard', () => {
  it('renders properly', () => {
    const description = 'This is a transaction'
    const amount = 99.99
    const wrapper = mount(TransactionContent, { props: { description, amount } })
    expect(wrapper.classes()).not.toContain('shiner')
    expect(wrapper.text()).toContain(description)
    expect(wrapper.text()).toContain(`${amount.toString().replace('.', ',')}€`)
  })

  it('renders as placeholder', () => {
    const description = '#'
    const amount = 0
    const wrapper = mount(TransactionContent, { props: { description, amount } })
    expect(wrapper.classes()).toContain('shiner')
  })
})
