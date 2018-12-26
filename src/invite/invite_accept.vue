<template lang="pug">
  .page
    <view class="info">
      <view>
        <p class="title">日期：</p> <p class="content">{{date}}</p>
      </view>
      <view>
        <p class="title">时间：</p> <p class="content">{{time}}</p>
      </view>
      <view>
        <p class="title">事件：</p> <p class="content">{{thing}}</p>
      </view>
      <view>
        <p class="title">地点：</p> <p class="content">{{place}}</p>
      </view>
      <view>
        <p class="title">邀请人：</p> <p class="content2">{{inviterName}}</p>
      </view>
    </view>

    button.weui-btn(@click="addTodo" type="default") 接受邀请
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {
      time: '',
      date: '',
      thing: '',
      place: '',
      inviterID: '',
      code: '',
      inviterName: ''
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

  //
  // get invitation info from database
  //
  onLoad: function (res) {
    // this.$router.replace({path: '/invite/start'})
    console.log('invite_accept.onload: ' + res.inviterID + res.date)
    var that = this
    that.time = res.time
    that.date = res.date
    that.inviterID = res.inviterID

    // get sessionKey
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8000/login/checkUser',
            data: {
              code: res.code
            },
            success (res) {
              wx.setStorageSync('sessionKey', res.data['sessionKey'])
              console.log('invite_accept.login 写入sessionKey' + res.data['sessionKey'])
              if (res.data['state'] === false) {
                that.$router.replace({path: '/invite/start?inviterID=' + that.inviterID + '&date=' + that.date + '&time=' + that.time})
              }
            },
            fail (res) {
              console.log('访问服务器失败')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    Vue.prototype.$http
      .get('invitation/getSingleInvitation', { inviterID: this.inviterID, date: this.date, time: this.time })
      .then(d => {
        that.inviterName = d.data.inviterName
        that.thing = d.data.thing
        that.place = d.data.place
        console.log('invite_accept.onLoad: success')
      })
  },
  methods: {
    ...mapMutations([
      'addTodos'
    ]),

    //
    // accept invitation
    //
    addTodo () {
      var that = this
      this.$http.get('invitation/acceptInvitation', {
        time: this.time,
        date: this.date,
        thing: this.thing,
        place: this.place,
        inviter: this.inviterID,
        invitee: this.sessionKey
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
                that.$router.replace({ path: '/invite/inviter_index' })
              }
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showModal({
            title: '时间冲突',
            content: '与原有日程时间冲突\n[确定]停留在当前邀请\n[取消]跳转至原有日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                that.$router.push({ path: '/invite/detail', query: { date: that.date, eventKey: d.eventKey } })
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  margin-top: 50rpx;
  margin-bottom: 100rpx;
}
.info view {
  display: flex;
}
.content {
  background-color:rgba(79, 132, 196, 0.87);
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-bottom: 10rpx;
  margin-left: 5rpx;
  margin-right: 20rpx;
  font-size: 40rpx;
  width: 63.5%;
}
.content2 {
  background-color: rgba(79, 132, 196, 0.87);
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-bottom: 10rpx;
  margin-left: 5rpx;
  margin-right: 20rpx;
  font-size: 40rpx;
  width: 58%;
}
.title{
  background-color: rgba(79, 132, 196, 0.87);
  border-radius: 30rpx;
  padding-left: 30rpx;
  padding-right: 10rpx;
  margin-bottom: 10rpx;
  margin-left: 20rpx;
  margin-right: 5rpx;
  font-size: 40rpx;
  font-weight: 900;
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
  background-color: rgba(79, 132, 196, 0.87)
}
.pick {
  width: 700 rpx;
}

</style>
