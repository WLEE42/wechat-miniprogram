<template lang="pug">
  .page
    div 添加日程

    .weui-cells

      .weui-cell
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{time}}
      .weui-cell
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{date}}
      .weui-cell
        label 地点：{{place}}
      .weui-cell
        label 事件：{{thing}}
    button(@clicle="deleteEvents") 删除事件
    button(@clicle="deleteEvents") 修改事件
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
      'todos'
    ])
  },
  methods: {
    ...mapMutations([])
  },
  modifyEvents () {
    this.$http.get('event/modifyEvent', { sessionKey: this.sessionKey, todo: this.todo }).then(
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
    this.$http.get('event/deleteEvent', { sessionKey: this.sessionKey, eventKey: this.eventKey }).then(
      d => {
        this.todos[this.$route.query.date].forEach((todo, index, object) => {
          if (todo.eventKey === this.$route.query.eventKey) {
            object.splice(index, 1)
          }
        })
      }
    )
  },
  mounted () {
    // console.log(this.$route.query.date)
    if (this.todos[this.$route.query.date].length !== 0) {
      this.todos[this.$route.query.date].forEach(todo => {
        if (todo.eventKey === this.$route.query.eventKey) {
          this.date = todo.date
          this.time = todo.time
          this.thing = todo.thing
          this.place = todo.place
          this.eventKey = todo.eventKey
        }
      })
    } else {
      this.thing = '今日无事件'
    }
  }
}
</script>

<style scoped>
</style>
