<template lang="pug">
  .page
    .weui-cells

      .weui-cell
        picker.pick(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange")
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{time}}
      .weui-cell
        picker.pick(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange")
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{date}}
      .weui-cell
        label 事件：
        input(v-model="thing" placeholder="请输入日程")
      .weui-cell
        label 地点：
        input(v-model="place" placeholder="请输入地点")

    button.weui-btn(@click="addTodo" type="default" open-type="share" :disabled = "disabled") 邀请好友
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {
      motto: 'Hello World',
      time: '请选择时间',
      date: '请选择日期',
      disabled: true,
      thing: '',
      place: ''
    }
  },
  components: {
    mpButton
  },
  computed: {
    ...mapState([
      'count',
      'todos',
      'sessionKey'
    ])
  },
  watch: {
    date (newVal, oldVal) {
      if (newVal !== '请选择日期' && this.time !== '请选择时间') {
        this.disabled = false
        console.log('invite_add.watch.date: ' + this.disabled)
      }
    },
    time (newVal, oldVal) {
      if (newVal !== '请选择时间' && this.date !== '请选择日期') {
        this.disabled = false
      }
    }
  },
  methods: {
    ...mapMutations([
      'addTodos'
    ]),
    addTodo () {
      this.$http.get('event/addEvent', {
        time: this.time,
        date: this.date,
        thing: this.thing,
        place: this.place,
        sessionKey: this.sessionKey
      }).then(d => {
        console.log(d)
        if (d.data.state === 'success') {
          console.log('添加成功' + d.data.state)
          this.addTodos({ time: this.time, date: this.date, thing: this.thing, place: this.place, eventKey: d.data.eventKey })
          wx.showModal({
            title: '成功！',
            content: '已添加日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showModal({
            title: '时间冲突',
            content: '与原有日程时间冲突\n[确定]继续编辑当前日程\n[取消]跳转至原有日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                this.$router.push({ path: '/pages/detail', query: { eventKey: d.eventKey } })
              }
            }
          })
        }
      })
    },
    TimeChange (e) {
      // console.log('选中的时间为：' + e.mp.detail.value)
      // console.log(this.time)
      this.time = e.mp.detail.value
    },
    DateChange (e) {
      // console.log('选中的日期为：' + e.mp.detail.value)
      this.date = e.mp.detail.value
    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('invite_add: ' + res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/invite_add',
      success: function (res) {
        // 转发成功
        // 如果这里有 shareTickets，则说明是分享到群的
        console.log(res.shareTickets)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.weui-cells {
  margin-bottom: 100rpx;
}
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
.pick {
  width: 700 rpx;
}

</style>
