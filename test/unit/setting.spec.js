import { formatNumber, formatDate } from '@/utils/index'
import { mount } from '@vue/test-utils'
import setting from '@/pages/setting'

describe('add pages', () => {
  const wrapper = mount(setting)
  it('should be working now', () => {
    expect('a').toBe('a')
  })
  it('formatNumber', () => {
    const number = formatNumber(0)
    expect(number).toBe('00')
  })
  it('formatDate', () => {
    const date = formatDate(new Date())
    expect(date).toBe('2018-12-16')
  })
  it('setting',()=>{
    let p=wrapper.find('p')
    expect(p.text()).toBe('意见反馈')
    console.log(p.text())
  })
})
