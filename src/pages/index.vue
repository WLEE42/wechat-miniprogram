<template lang="pug">
  .page
    .page__hd
      h1.page__title 给队伍取个名字
      p.page__desc 我是首页
      p.page__desc 日程
    div
      button(type='default') 月
      button(type='default',@click="$router.push({path:'/pages/dayView'})") 日
    Calendar(
    :events="events"
    @select="select"
    ref="calendar"
    @selectMonth="selectMonth"
    @selectYear="selectYear"
    )


    .weui-cells__title 日程
    ul.weui-cells
      li.weui-cell(v-for='(todo, index) in todos' :key="index" @touchstart="ontouchstart")
        .weui-cell__bd {{todo.date}}：
        .weui-cell__bd {{todo.time}}
        .weui-cell__ft {{todo.thing}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Calendar from 'mpvue-calendar'
import mpButton from 'mpvue-weui/src/button'
import 'mpvue-calendar/src/style.css'

export default {
  data () {
    return {}
  },

  components: {
    mpButton,
    Calendar
  },

  computed: {
    ...mapState([
      'todos',
      'events'
    ])
  },

  created () {
    this.showTodos()
  },

  methods: {
    ...mapMutations([
      'showTodos'
    ]),
    selectMonth (month, year) {
      console.log(year, month)
    },
    prev (month) {
      console.log(month)
    },
    next (month) {
      console.log(month)
    },
    selectYear (year) {
      console.log(year)
    },
    setToday () {
      this.$refs.calendar.setToday()
    },
    dateInfo () {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info)
    },
    renderer () {
      this.$refs.calendar.renderer(2018, 8) // 渲染2018年8月份
    },
    select (val, val2) {
      console.log(val)
      console.log(val2)
      this.$router.push({ path: '/pages/dayView', query: { date: val[2], year: val[0], month: val[1] } })
    },
    ontouchstart (e) {
      console.log('touchS' + e.data.data)
    }
  }
}
</script>

<style scoped>
</style>
