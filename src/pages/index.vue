<template lang="pug">
  .page
    div
      p 查看个人日程
    div.btn_cell
      button 月
      button(@click="$router.push({path:'/pages/dayView'})") 日
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
.btn_cell {
  display: flex;
  justify-content: center;
}
</style>
