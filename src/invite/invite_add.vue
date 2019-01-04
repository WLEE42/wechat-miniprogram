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

    button.weui-btn(class="button1" @click="addInvitation" type="default" open-type="share" :disabled = "disabled") 邀请好友
    button(class="button2" @click="$router.replace({path:'/invite/inviter_index'})") 返回主页面
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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

  computed: {
    ...mapState([
      'count',
      'todos',
      'sessionKey',
      'myinvitations'
    ])
  },

  watch: {
  //
  // will change the value of 'disabled' when the date and time are not null
  //
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

  mounted () {
    this.time = '请选择时间'
    this.date = '请选择日期'
    this.thing = ''
    this.place = ''
    this.disabled = true
  },

  methods: {
    ...mapMutations([
      'addTodos'
    ]),

    addInvitation () {
    //
    // triggered in the 'onShareAppMessage' function
    // add invitation after a friend is chosen
    //
      var that = this
      this.$http.get('invitation/addInvitation', {
        time: this.time,
        date: this.date,
        thing: this.thing,
        place: this.place,
        inviter: this.sessionKey
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('添加成功' + d.data.eventKey)
          if (this.date.split('-')[1] in this.myinvitations) {
            this.myinvitations[this.date.split('-')[1]].push({
              time: this.time,
              date: this.date,
              month: this.date.split('-')[1],
              thing: this.thing,
              place: this.place,
              eventKey: d.data.eventKey,
              invitee: ''
            })
            this.todos[this.date].push({
              time: this.time,
              date: this.date,
              thing: this.thing,
              place: this.place,
              eventKey: d.data.eventKey
            })
          } else {
            this.myinvitations[this.date.split('-')[1]] = [{
              time: this.time,
              date: this.date,
              month: this.date.split('-')[1],
              thing: this.thing,
              place: this.place,
              eventKey: d.data.eventKey,
              invitee: ''
            }]
            this.todos[this.date] = [{
              time: this.time,
              date: this.date,
              thing: this.thing,
              place: this.place,
              eventKey: d.data.eventKey
            }]
          }

          wx.showModal({
            title: '成功！',
            content: '已添加日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.$router.back()
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
                if (d.data.type === 2) {
                  that.$router.push({ path: '/invite/invite_detail', query: { month: that.date.split('-')[1], eventKey: d.data.eventKey } })
                } else if (d.data.type === 1) {
                  that.$router.push({ path: '/pages/detail', query: { date: that.date, eventKey: d.data.eventKey } })
                }
              }
            }
          })
        }
      })
    },

    TimeChange (e) {
      // change the time to the one chosen
      this.time = e.mp.detail.value
    },

    DateChange (e) {
      // change the date to the one chosen
      this.date = e.mp.detail.value
    }
  },

  onShareAppMessage: function (res) {
  //
  // Triggered when the invite button is pressed
  // enter the friend list and locate the page to share
  //
    console.log('share begins')
    var that = this
    return {
      title: that.thing,
      // the page to share
      // the parameters are to identify a specific event
      path: '/pages/start?inviterID=' + that.sessionKey + '&date=' + that.date + '&time=' + that.time
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-image: url("https://github.com/yewh16/wechat-miniprogram/blob/master/image/background_invite.jpg?raw=true");
  background-size: 100% 100%;
  background-color: #f2f0db;
  height: 100%;
}
.weui-cells {
  margin-bottom: 100rpx;
  background-color: #f2f0db;
}
button {
  border: 0px 0px;
  padding: 0 32rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 100rpx;
  min-width: 176rpx;
  background-color:#f2f0db;
  max-width: 100%;
  vertical-align: middle;
}
.button1 {
  margin: 20rpx 16rpx 400rpx 16rpx;
}
.button2 {
  margin: 10rpx 16rpx 20rpx 16rpx;
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
  background-color:#f2f0db;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}

</style>
