import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import FilterTransaction from '@/components/FilterTransaction.vue'

describe('FilterTransaction', () => {
  const mockFilterFunction = vi.fn()
  const debounceDelay = 400

  it('renders properly', async () => {
    const wrapper = mount(FilterTransaction, { 
      props: { 
        onInput: mockFilterFunction,
        debounceDelay
      } 
    })

    const inputField = wrapper.find('input')
    inputField.setValue('test')
    expect(inputField.element.value).toBe('')
    expect(mockFilterFunction).not.toHaveBeenCalled()

    inputField.setValue(99)
    expect(inputField.element.value).toBe('99')

    await new Promise((resolve) => setTimeout(resolve, debounceDelay))

    expect(mockFilterFunction).toHaveBeenCalled()
  })
})
