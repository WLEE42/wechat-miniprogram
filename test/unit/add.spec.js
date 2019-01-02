import { shallowMount } from '@vue/test-utils'
import add from '@/pages/add'

describe('add pages', () => {
  const wrapper = shallowMount(add)
  it('adding',()=>{
    let button=wrapper.find('button')
    button.trigger('click')
  })
})
