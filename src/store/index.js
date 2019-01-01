import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: {},
    userInfo: {},
    events: {},
    sessionKey: '',
    userID: '',
    myinvitations: {},
    invitations: {},
    statistics: [
      {
        title: '我爱学习',
        thing: '预定在本周进行学习',
        deadTime: '08:08',
        deadDate: '2018-12-30',
        choices: [{ date: '2018-12-25', time: '20:20', number: '0' }, { date: '2018-12-27', time: '20:20', number: '0' }, { date: '2018-12-26', time: '20:20', number: '0' }],
        people: [{ openid: '111', choice: [0, 1] }],
        place: '北京',
        eventKey: '001',
        createDate: '2018-12-20'
      }
    ]
  },

  mutations: {
    showTodos (state) {
      state.todos = {}
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

    getStatistics (state) {
      state.sessionKey = wx.getStorageSync('sessionKey')
      // console.log(state.sessionKey)
      Vue.prototype.$http
        .get('statistics/getStatistics', {
          sessionKey: state.sessionKey
        })
        .then(d => {
          // console.log(d.data)
          state.statistics = d.data.statistics
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
      state.sessionKey = wx.getStorageSync('sessionKey')
      state.userInfo = data
      Vue.prototype.$http
        .get('login/setName', {
          sessionKey: state.sessionKey,
          name: state.userInfo.nickName
        })
    }
  }
})

export default store
