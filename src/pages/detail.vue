<template>
  <div class='page'>
    <div> 日程详情</div>

    <div class='weui-cells'>

      <div class='weui-cell'>
        <label class='weui-cell__bd'> 时间：</label>
        <label class='weui-cell__ft'> {{todo.time}}</label>
      </div>
      <div class='.weui-cell'>
        <label class='weui-cell__bd'> 日期：</label>
        <label class='weui-cell__ft'> {{todo.date}}</label>
      </div>
      <div class='weui-cell'>
        <label> 地点：{{todo.place}}</label>
      </div>
      <div class='weui-cell'>
        <label> 事件：{{todo.thing}}</label>
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
      }
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

    modifyEvents () {
    //
    // modify the event detail
    //
      console.log('modify')
      this.$http.get('event/modifyEvent', { sessionKey: this.sessionKey, time: this.todo.time, date: this.todo.date, thing: this.todo.thing, place: this.todo.place, eventKey: this.todo.eventKey }).then(
        d => {
          this.todos[this.$route.query.date].forEach((todo, index, object) => {
            if (todo.eventKey === this.$route.query.eventKey) {
              object.splice(index, 1, this.todo)
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
            }
          })
        }
      )
      this.$router.back()
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
