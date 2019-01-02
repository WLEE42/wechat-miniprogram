import { shallowMount } from '@vue/test-utils'
import index from '@/pages/index'

describe('the calendar pages', () => {
  const wrapper = shallowMount(index)
  it('showing todos',()=>{
    let button=wrapper.find('button')
    button.trigger('click')
  })
})
