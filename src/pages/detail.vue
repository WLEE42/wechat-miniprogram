<template lang="pug">
  .page
    div 添加日程

    .weui-cells

      .weui-cell
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{todo.time}}
      .weui-cell
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{todo.date}}
      .weui-cell
        label 地点：{{todo.place}}
      .weui-cell
        label 事件：{{todo.thing}}
    button(@click="deleteEvents") 删除事件
    button(@click="modifyEvents") 修改事件
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

<style scoped>
</style>
