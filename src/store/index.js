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
    statistics: []
  },

  mutations: {
    showTodos (state, todo) {
      state.todos = todo
      // console.log(state.sessionKey)
      // Vue.prototype.$http
      //   .get('user/events', { sessionKey: state.sessionKey })
      //   .then(d => {
      //     // console.log(d.data)
      //     for (let eleArray in d.data) {
      //       // console.log(eleArray)
      //       d.data[eleArray].forEach(element => {
      //         if (state.todos.hasOwnProperty(element.date)) {
      //           state.todos[element.date].push({
      //             time: element.time,
      //             date: element.date,
      //             thing: element.thing,
      //             place: element.place,
      //             eventKey: element.eventKey
      //           })
      //         } else {
      //           console.log(element.time)
      //           state.todos[element.date] = [
      //             {
      //               time: element.time,
      //               date: element.date,
      //               thing: element.thing,
      //               place: element.place,
      //               eventKey: element.eventKey
      //             }
      //           ]
      //         }

      //         if (!state.events[element.date]) {
      //           state.events[element.date] = element.thing
      //         }
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err.status, err.message)
      //   })
    },

    addTodos (state, element) {
      if (state.todos.hasOwnProperty(element.date)) {
        state.todos[element.date].push(element)
      } else {
        state.todos[element.date] = [element]
      }

      if (!state.events[element.date]) {
        state.events[element.date] = element.thing
      }
    },
    setInviteeInvitations (state, data) {
      for (let key in data) {
        let newKey = key.split('-')[1]
        if (newKey) {
          data[newKey] = data[key]
          delete data[key]
        }
      }
      state.invitations = data
    },

    setInviterInvitations (state, data) {
      for (let key in data) {
        let newKey = key.split('-')[1]
        if (newKey) {
          data[newKey] = data[key]
          delete data[key]
        }
      }
      state.myinvitations = data
    },

    setStatistics (state, data) {
      state.statistics = data
    },

    setUserInfo (state, data) {
      state.sessionKey = wx.getStorageSync('sessionKey')
      state.userInfo = data
      Vue.prototype.$http.get('login/setName', {
        sessionKey: state.sessionKey,
        name: state.userInfo.nickName
      })
    }
  },
  actions: {
    async showTodosAction ({ state, commit }) {
      state.sessionKey = wx.getStorageSync('sessionKey')
      console.log(state.sessionKey)
      const res = await Vue.prototype.$http.get('user/events', {
        sessionKey: state.sessionKey
      })
      if (res.status !== 200) {
        console.log('showTodosAction failed' + 'status' + res.status)
        // wx.showToast({
        //   title: '网络错误'
        // }
        // )
      }
      commit('showTodos', res.data)
    }
  }
})

export default store
