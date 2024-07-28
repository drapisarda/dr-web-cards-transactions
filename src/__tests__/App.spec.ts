import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import axios from 'axios'
import cardData from '../../public/data/cards.json'

describe('App', () => {
  it('renders properly', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: cardData })

    const wrapper = mount(App)
    expect(wrapper).toMatchSnapshot()

    expect((wrapper.vm as any).filterAmount).toBe(undefined)

    const textValue = 99
    const input = wrapper.find('.filter-transaction input')
    input.setValue(textValue)

    await wrapper.vm.$nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})
