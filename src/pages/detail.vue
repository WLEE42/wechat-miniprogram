<template>
  <div class='page'>
    <div> 日程详情</div>

    <div class='weui-cells'>

      <div class='weui-cell'>
        <picker
          class='pick'
          mode="time"
          v-bind:value="todo.time"
          start="00:00"
          end="24:00"
          @change="TimeChange"
        >
          <label class='weui-cell__bd'> 时间：</label>
          <label class='weui-cell__ft'> {{todo.time}}</label>
        </picker>
      </div>
      <div class='weui-cell'>
        <picker
          class='pick'
          mode="date"
          v-bind:value="todo.date"
          start="1999-01-01"
          end="2099-01-01"
          @change="DateChange"
        >
          <label class='weui-cell__bd'> 日期：</label>
          <label class='weui-cell__ft'> {{todo.date}}</label>
        </picker>
      </div>
      <div class='weui-cell'>
        <label> 事件：</label>
        <input
          v-model="todo.thing"
          placeholder="请输入日程"
        />
      </div>
      <div class='weui-cell'>
        <label> 地点：</label>
        <input
          v-model="todo.place"
          placeholder="请输入地点"
        />
      </div>
    </div>
    <button @click="deleteEvents"> 删除事件</button>
    <button @click="modifyEvents"> 修改事件</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      todo: {
        time: '请选择时间',
        date: '请选择日期',
        thing: '',
        place: '',
        eventKey: ''
      },
      modifyDate: false
    }
  },
  computed: {
    ...mapState([
      'todos',
      'sessionKey'
    ])
  },
  methods: {
    ...mapMutations([]),

    TimeChange (e) {
      // console.log('选中的时间为：' + e.mp.detail.value)
      // console.log(this.time)
      this.todo.time = e.mp.detail.value
    },
    DateChange (e) {
      // console.log('选中的日期为：' + e.mp.detail.value)
      this.todo.date = e.mp.detail.value
      this.modifyDate = true
    },

    modifyEvents () {
      //
      // modify the event detail
      //
      console.log('modify')
      this.$http.get('event/modifyEvent', { sessionKey: this.sessionKey, time: this.todo.time, date: this.todo.date, thing: this.todo.thing, place: this.todo.place, eventKey: this.todo.eventKey }).then(
        d => {
          this.todos[this.$route.query.date].forEach((todo2, index, object) => {
            if (todo2.eventKey === this.$route.query.eventKey) {
              if (this.modifyDate === false) {
                object.splice(index, 1, this.todo)
              } else {
                object.splice(index, 1)
                console.log(this.todo.date)
                if (this.todos.hasOwnProperty(this.todo.date)) {
                  this.todos[this.todo.date].push(this.todo)
                } else {
                  this.todos[this.todo.date] = [ this.todo ]
                }
              }
              this.$router.back()
            }
          })
        }
      )
    },

    deleteEvents () {
      //
      // delete event and jump back
      //
      console.log('delete')
      if (this.todo.thing === '今日无事件') {
        return
      }
      this.$http.get('event/deleteEvent', { sessionKey: this.sessionKey, eventKey: this.todo.eventKey }).then(
        d => {
          this.todos[this.$route.query.date].forEach((todo, index, object) => {
            if (todo.eventKey === this.$route.query.eventKey) {
              object.splice(index, 1)
              this.$router.back()
            }
          })
        }
      )
    }
  },
  mounted () {
    if (this.todos[this.$route.query.date].length !== 0) {
      this.todos[this.$route.query.date].forEach(todo => {
        console.log(this.$route.query.eventKey === todo.eventKey)
        if (todo.eventKey === this.$route.query.eventKey) {
          this.todo = todo
          console.log(this.todo.date)
        }
      })
    } else {
      this.todo.thing = '今日无事件'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: 0px 0px;
  padding: 0 32rpx;
  margin: 32rpx 16rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 100rpx;
  min-width: 176rpx;
  background-color: rgb(250, 250, 250);
  max-width: 100%;
  vertical-align: middle;
}
</style>
