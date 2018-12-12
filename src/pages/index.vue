<template lang="pug">
  .page
    .page__hd
      h1.page__title 给队伍取个名字
      p.page__desc 我是首页
      p.page__desc 日程
    div
      mp-button(type='mini') 月
      mp-button(type='mini',@click="$router.push({path:'/pages/dayView'})") 日
    Calendar(
    :events="events"
    @select="select"
    ref="calendar"
    @selectMonth="selectMonth"
    @selectYear="selectYear"
    )

    .weui-cells__title 日程
    ul.weui-cells
      li.weui-cell(v-for='todo in todos[todayDate]' :key="todo.eventKey" @click="toDetail($event,todo)")
        .weui-cell__bd {{todo.date}}
        .weui-cell__bd {{todo.time}}
        .weui-cell__ft {{todo.thing}}
        .weui-cell__ft {{todo.place}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Calendar from 'mpvue-calendar'
import mpButton from 'mpvue-weui/src/button'
import 'mpvue-calendar/src/style.css'
import { formatDate } from '../utils'

export default {
  data () {
    return {
      todayDate: ''
    }
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

  mounted () {
    this.todayDate = formatDate(new Date())
    this.showTodos()
  },

  methods: {
    ...mapMutations([
      'showTodos'
    ]),
    dateInfo () {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info)
    },
    select (val, val2) {
      console.log(val)
      console.log(val2)
      this.$router.push({ path: '/pages/dayView', query: { date: val[2], year: val[0], month: val[1] } })
    },
    toDetail (e, todo) {
      this.$router.push({ path: '/pages/detail', query: { date: this.todayDate, eventKey: todo.eventKey } })
    }
    // touchStart (e) {
    //   // 获取移动距离，可以通过打印出e，然后分析e的值得出
    //   this.startX = e.mp.changedTouches[0].clientX
    // },
    // // 滑动结束
    // touchEnd (e, index) {
    //   // 获取移动距离
    //   this.endX = e.mp.changedTouches[0].clientX
    //   if (this.startX - this.endX > 10) {
    //     for (let i = 0; i < this.commitInfo.length; i++) {
    //       this.commitInfo[i].type = 0
    //     }
    //     this.commitInfo[index].type = 1
    //   } else if (this.startX - this.endX < -10) {
    //     for (let i = 0; i < this.commitInfo.length; i++) {
    //       this.commitInfo[i].type = 0
    //     }
    //   }
    // },
    // // 点击回复原状
    // recover (index) {
    //   this.commitInfo[index].type = 0
    // }
  }
}
</script>

<style scoped>
</style>
