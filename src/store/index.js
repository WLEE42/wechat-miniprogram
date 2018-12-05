import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: {},
    userInfo: {},
    events: { '2018-11-28': '今日备注', '2018-11-29': '一条很长的明日备注' },
    sessionKey: ''
  },
  mutations: {
    showTodos (state) {
      state.todos['2018-11-30'] = [
        { thing: '吃饭', date: '2018-11-30', time: '08:08', id: '000' },
        {
          thing: '学习',
          date: '2018-11-30',
          time: '08:08',
          id: '001'
        }
      ]
      state.todos['2018-11-29'] = [
        { thing: '吃饭', date: '2018-11-29', time: '09:08', id: '002' },
        {
          thing: '学习',
          date: '2018-11-29',
          time: '08:08',
          id: '003'
        }
      ]
      state.todos['2018-11-24'] = [
        { thing: '吃饭', date: '2018-11-24', time: '10:08', id: '004' },
        {
          thing: '学习',
          date: '2018-11-24',
          time: '08:08',
          id: '005'
        }
      ]
      Vue.prototype.$http
        .get('user/events', {sessionKey: this.sessionKey})
        .then(d => {
          d.data.forEach(element => {
            if (state.todos.hasOwnProperty(element.date)) {
              state.todos.get(element.date).push({
                time: element.time,
                date: element.date,
                thing: element.thing,
                place: element.place
              })
            } else {
              state.todos[element.date] = [
                {
                  time: element.time,
                  date: element.date,
                  thing: element.thing
                }
              ]
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
