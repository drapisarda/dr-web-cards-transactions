import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import FilterTransaction from '@/components/FilterTransaction.vue'

describe('FilterTransaction', () => {
  it('renders properly', async () => {
    const wrapper = mount(FilterTransaction, {})
    expect(wrapper).toMatchSnapshot

    const inputField = wrapper.find('input')
    inputField.setValue('test')
    expect(inputField.element.value).toBe('')

    inputField.setValue(99)
    expect(inputField.element.value).toBe('99')
  })
})
