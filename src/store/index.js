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
      state.todos['2018-12-11'] = [
        { thing: '吃饭', date: '2018-12-11', time: '08:08', eventKey: '000' },
        { thing: '学习', date: '2018-12-11', time: '08:08', eventKey: '001' }
      ]
      state.todos['2018-12-29'] = [
        { thing: '吃饭', date: '2018-12-29', time: '09:08', eventKey: '002' },
        { thing: '学习', date: '2018-12-29', time: '08:08', eventKey: '003' }
      ]
      state.todos['2018-12-24'] = [
        { thing: '吃饭', date: '2018-12-24', time: '10:08', eventKey: '004' },
        { thing: '学习', date: '2018-12-24', time: '08:08', eventKey: '005' }
      ]
      state.sessionKey = wx.getStorageSync('sessionKey')
      // console.log(state.sessionKey)
      Vue.prototype.$http
        .get('user/events', { sessionKey: state.sessionKey })
        .then(d => {
          // console.log(d.data)
          for (let eleArray in d.data) {
            // console.log(eleArray)
            d.data[eleArray].forEach(element => {
              if (state.todos.hasOwnProperty(element.date)) {
                state.todos[element.date].push({
                  time: element.time,
                  date: element.date,
                  thing: element.thing,
                  place: element.place,
                  eventKey: element.eventKey
                })
              } else {
                console.log(element.time)
                state.todos[element.date] = [
                  {
                    time: element.time,
                    date: element.date,
                    thing: element.thing,
                    place: element.place,
                    eventKey: element.eventKey
                  }
                ]
              }

              if (!state.events[element.date]) {
                state.events[element.date] = element.thing
              }
            })
          }
        })
        .catch(err => {
          console.log(err.status, err.message)
        })
    },
    addTodos (state, element) {
      if (state.todos.hasOwnProperty(element.date)) {
        state.todos[element.date].push({
          time: element.time,
          date: element.date,
          thing: element.thing,
          place: element.place,
          eventKey: element.eventKey
        })
      } else {
        state.todos[element.date] = [
          {
            time: element.time,
            date: element.date,
            thing: element.thing,
            place: element.place,
            eventKey: element.eventKey
          }
        ]
      }

      if (!state.events[element.date]) {
        state.events[element.date] = element.thing
      }
    },
    setUserInfo (state, data) {
      state.userInfo = data
    }
  }
})

export default store
