import { describe, it, expect, vi } from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {

  it('renders properly', async () => {
    const wrapper = mount(App)
    const textValue = 99
    expect(wrapper).toMatchSnapshot()

    expect((wrapper.vm as any).filterAmount).toBe(undefined)

    const input = wrapper.find('.filter-transaction input')
    input.setValue(textValue)

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect((wrapper.vm as any).filterAmount).toBe(textValue)
  })
})
