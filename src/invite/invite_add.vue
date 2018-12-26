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

    button.weui-btn(type="default" open-type="share" :disabled = "disabled") 邀请好友
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {
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
      'sessionKey',
      'myinvitations'
    ])
  },

  watch: {
    date (newVal, oldVal) {
      if (newVal !== '请选择日期' && this.time !== '请选择时间') {
        this.disabled = false
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

    addInvitation () {
      var that = this
      this.$http.get('invitation/addInvitation', {
        time: this.time,
        date: this.date,
        thing: this.thing,
        place: this.place,
        inviter: this.sessionKey
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('添加成功' + d.data.state)
          this.myinvitations[this.date.split('-')[1]].push({
            time: this.time,
            date: this.date,
            month: this.date.split('-')[1],
            thing: this.thing,
            place: this.place,
            eventKey: '',
            invitee: ''
          })
          wx.showModal({
            title: '成功！',
            content: '已添加日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.$router.replace({path: '/invite/inviter_index'})
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
                console.log(that.date)
                that.$router.push({ path: '/invite/detail', query: { date: that.date, eventKey: d.data.eventKey } })
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
      // console.log('选中的日期为：' + e.mp.detail.value.split('-')[1])
      this.date = e.mp.detail.value
    }
  },

  //
  // Triggered when the invite button is pressed
  // enter the friend list and locate the page to share
  //
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      console.log('invite_add: ' + res.target)
    }
    return {
      title: this.thing,
      // the page to share
      // the parameters are to identify a specific event
      path: '/invite/invite_accept?inviterID=' + this.sessionKey + '&date=' + this.date + '&time=' + this.time,
      success: function (res) {
        console.log('invite_add.onShareAppMessage: success')
        that.addInvitation()
      },
      fail: function (res) {
        console.log('invite_add: share failed')
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
  background-color: #FFc1c1;
  max-width: 100%;
  vertical-align: middle;
}
.pick {
  width: 700 rpx;
}
label.weui-cell__ft{
  font-weight: 900;
  color: #848484;
  margin-left: 10rpx;
}
input{
  font-weight: 550;
  border-radius: 30rpx;
  padding: 10rpx 10rpx;
  font-size: 40rpx;
}
.weui-cell{
  background-color: #FFc1c1;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}

</style>
