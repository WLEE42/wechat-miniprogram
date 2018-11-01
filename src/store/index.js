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
    ],
    userInfo: {}
  },
  mutations: {
    showTodos (state) {
      Vue.prototype.$http
        .get('login')
        .then(d => {
          d.data.forEach(element => {
            state.todos.push({
              time: element.time,
              date: element.date,
              thing: element.thing
            })
          })
          // 输出请求数据
          console.log(d)
          // 输出响应头
          console.log(d.header)
        })
        .catch(err => {
          console.log(err.status, err.message)
        })
    },
    setUserInfo (state, data) {
      state.userInfo = data
    }
  }
})

export default store
