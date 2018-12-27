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
        choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
        people: [{ openid: '111', choice: [0, 1] }],
        place: '北京',
        eventKey: '001',
        createDate: '2018-12-20'
      }
    ]
  },
  mutations: {
    showTodos (state) {
      state.todos['2018-12-26'] = [
        {
          thing: '吃饭',
          date: '2018-12-26',
          time: '08:08',
          eventKey: '000',
          place: '北京'
        },
        {
          thing: '学习',
          date: '2018-12-26',
          time: '08:08',
          eventKey: '001',
          place: '北京'
        }
      ]
      state.todos['2018-12-27'] = [
        {
          thing: '吃饭',
          date: '2018-12-27',
          time: '08:08',
          eventKey: '000',
          place: '北京'
        },
        {
          thing: '学习',
          date: '2018-12-27',
          time: '08:08',
          eventKey: '001',
          place: '北京'
        }
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

    //
    // getmyinvitations and store them
    //
    getInviterInvitations (state) {
      state.sessionKey = wx.getStorageSync('sessionKey')
      // console.log(state.sessionKey)
      Vue.prototype.$http
        .get('invitation/getInviterInvitations', {
          sessionKey: state.sessionKey
        })
        .then(d => {
          // console.log(d.data)
          for (let eleArray in d.data) {
            // console.log(eleArray)
            d.data[eleArray].forEach(element => {
              if (state.myinvitations.hasOwnProperty(element.month)) {
                state.myinvitations[element.month].push({
                  time: element.time,
                  date: element.date,
                  month: element.month,
                  thing: element.thing,
                  place: element.place,
                  eventKey: element.eventKey,
                  invitee: element.invitee
                })
              } else {
                state.myinvitations[element.month] = [
                  {
                    time: element.time,
                    date: element.date,
                    month: element.month,
                    thing: element.thing,
                    place: element.place,
                    eventKey: element.eventKey,
                    invitee: element.invitee
                  }
                ]
              }
            })
          }
        })
        .catch(err => {
          console.log(err.status, err.message)
        })
    },

    //
    // getinvitations and store them
    //
    getInviteeInvitations (state) {
      state.invitations = {}
      state.sessionKey = wx.getStorageSync('sessionKey')
      // console.log(state.sessionKey)
      Vue.prototype.$http
        .get('invitation/getInviteeInvitations', {
          sessionKey: state.sessionKey
        })
        .then(d => {
          // console.log(d.data)
          for (let eleArray in d.data) {
            // console.log(eleArray)
            d.data[eleArray].forEach(element => {
              if (state.invitations.hasOwnProperty(element.month)) {
                state.invitations[element.month].push({
                  time: element.time,
                  date: element.date,
                  month: element.month,
                  thing: element.thing,
                  place: element.place,
                  eventKey: element.eventKey,
                  inviter: element.inviter
                })
              } else {
                // console.log(element.month)
                state.invitations[element.month] = [
                  {
                    time: element.time,
                    date: element.date,
                    month: element.month,
                    thing: element.thing,
                    place: element.place,
                    eventKey: element.eventKey,
                    inviter: element.inviter
                  }
                ]
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
