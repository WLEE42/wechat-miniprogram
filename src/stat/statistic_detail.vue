<template lang="pug">
  .page
    div 日程详情

    .weui-cells

      .weui-cell
          label.weui-cell__bd 截止时间：
          label.weui-cell__ft {{stat.deadDate+' '+stat.deadTime}}
      .weui-cell
        label 地点：{{stat.place}}
      .weui-cell
        label 事件：{{stat.thing}}
      .weui-cell
        label 参与人数: {{stat.people.length}}
    
    button(open-type="share") 分享统计
    button(@click="deleteEvents") 删除事件
    button(@click="modifyEvents") 修改事件
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      stat: {
        title: '我爱学习',
        thing: '预定在本周进行学习',
        deadTime: '08:08',
        deadDate: '2018-12-03',
        choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
        people: [{ openid: '111', choice: 0 }],
        place: '北京',
        eventKey: ''
      }
    }
  },
  computed: {
    ...mapState([
      'statistics',
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
      this.$http.get('statistics/deleteStatistic', { sessionKey: this.sessionKey, eventKey: this.todo.eventKey }).then(
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
    if (this.statistics[this.$route.query.date].length !== 0) {
      this.statistics[this.$route.query.date].forEach(stat => {
        if (stat.eventKey === this.$route.query.eventKey) {
          this.stat = stat
        }
      })
    } else {
      this.stat.thing = '今日无事件'
    }
  },

  onShareAppMessage: function (res) {
    //
    // Triggered when the invite button is pressed
    // enter the friend list and locate the page to share
    //
    // var that = this
    return {
      title: this.todo.title,
      // the page to share
      // the parameters are to identify a specific event
      path: '/invite/invite_accept?inviterID=' + this.sessionKey + '&date=' + this.todo.date + '&time=' + this.todo.time,
      success: function (res) {
        console.log('invite_add.onShareAppMessage: success')
        // that.addInvitation()
      },
      fail: function (res) {
        console.log('invite_add: share failed')
      }
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
