import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import TransactionsFilter from '@/components/TransactionsFilter.vue'

describe('TransactionsFilter', () => {
  it('renders properly', async () => {
    const wrapper = mount(TransactionsFilter, {})
    expect(wrapper).toMatchSnapshot

    const inputField = wrapper.find('input')
    inputField.setValue('test')
    expect(inputField.element.value).toBe('')

    inputField.setValue(99)
    expect(inputField.element.value).toBe('99')
  })
})
