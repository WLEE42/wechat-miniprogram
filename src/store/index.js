// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [
      { thing: '吃饭', date: '2018-1-1', time: '08:08' },
      { thing: '学习', date: '2018-1-2', time: '08:08' },
      { thing: 'dddd', date: '2018-1-2', time: '08:08' }
    ]
  },
  mutations: {
  }
})

export default store
