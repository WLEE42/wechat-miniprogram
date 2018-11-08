import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: {},
    userInfo: {},
    events: { '2018-11-7': '今日备注', '2018-11-8': '一条很长的明日备注' }
  },
  mutations: {
    showTodos (state) {
      /* state.todos['2018-11-3'] = [{ thing: '吃饭', date: '2018-11-3', time: '08:08' }, {
        thing: '吃饭',
        date: '2018-11-3',
        time: '08:08'
      }]
      state.todos['2018-11-2'] = [{ thing: '吃饭', date: '2018-11-2', time: '09:08' }, {
        thing: '吃饭',
        date: '2018-11-2',
        time: '08:08'
      }]
      state.todos['2018-11-3'] = [{ thing: '吃饭', date: '2018-11-1', time: '10:08' }, {
        thing: '吃饭',
        date: '2018-11-1',
        time: '08:08'
      }] */
      Vue.prototype.$http
        .get('todos')
        .then(d => {
          d.data.forEach(element => {
            if (state.todos.hasOwnProperty(element.date)) {
              state.todos.get(element.date).push({
                time: element.time,
                date: element.date,
                thing: element.thing
              })
            } else {
              state.todos[element.date] = [{
                time: element.time,
                date: element.date,
                thing: element.thing
              }]
            }

            if (!state.events[element.date]) {
              state.events[element.date] = element.thing
            }
          })
          // 输出请求数据
          console.log(d)
          // state.todos.sort((todoa, todob) => {
          //   if (todoa['date'].split('-')[0] !== todob['date'].split('-')[0]) {
          //     return todoa['date'].split('-')[0] - todob['date'].split('-')[0]
          //   }
          //   if (todoa['date'].split('-')[1] !== todob['date'].split('-')[1]) {
          //     return todoa['date'].split('-')[1] - todob['date'].split('-')[1]
          //   }
          //   return todoa['date'].split('-')[2] - todob['date'].split('-')[2]
          // })
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
