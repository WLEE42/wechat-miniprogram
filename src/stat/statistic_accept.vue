<template lang="pug">
  .page
    label 标题 {{title}}
    label 事件：{{thing}}}
    label 地点：{{place}}
    label.weui-cell__bd 截止时间：
    label.weui-cell__ft {{deadDate+' '+deadTime}}
    div
      label {{date}}
      label {{time}}
      image(v-if='reply[number]' src="'/static/choose.png")

    button(@click="addReply") 提交问卷
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { compareTime } from '../utils'

export default {
  data () {
    return {
      month: '',
      reply: {},
      inviterID: '',
      eventKey: '',
      title: '',
      deadTime: '',
      deadDate: '',
      choices: '',
      people: '',
      thing: '',
      place: '',
      createDatete: ''

    }
  },

  computed: {
    ...mapState([
      'sessionKey'
    ])
  },

  mounted (res) {
    this.month = new Date().getMonth() + 1
    // this.$router.replace({path: '/invite/start'})
    console.log('statistic_accept.onload: ' + res.inviterID + res.eventKey)
    const that = this
    that.eventKey = res.eventKey
    that.inviterID = res.inviterID

    // get sessionKey
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'http://www.giveteamaname.top/login/checkUser',
            data: {
              code: res.code
            },
            success (res) {
              wx.setStorageSync('sessionKey', res.data['sessionKey'])
              console.log('invite_accept.login 写入sessionKey' + res.data['sessionKey'])
              if (res.data['state'] === false) {
                that.$router.replace({ path: '/invite/start?inviterID=' + that.inviterID + '&date=' + that.date + '&time=' + that.time })
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

    this.$http
      .get('statistics/getSingleStatistic', { inviterID: this.inviterID, eventKey: this.eventKey })
      .then(d => {
        if (new Date(d.data.deadDate) < new Date()) {
          wx.showToast({
            title: '已过期',
            duration: 2000,
            icon: 'fail'
          })
          this.$router.push({ page: '/pages/main' })
        } else if (+(new Date(d.data.deadDate)) === +(new Date()) && compareTime(d.data.deadTime)) {
          wx.showToast({
            title: '已过期',
            duration: 2000,
            icon: 'fail'
          })
          this.$router.push({ page: '/pages/main' })
        }
        that.title = d.data.title
        that.deadTime = d.data.deadTime
        that.deadDate = d.data.deadDate
        that.choices = d.data.choices
        that.people = d.data.people
        that.eventKey = d.data.eventKey
        that.thing = d.data.thing
        that.place = d.data.place
        that.createDate = d.data.createDate
        that.choices.forEach(
          (choice) => {
            that.reply[choice.number] = false
          }
        )
        console.log('invite_accept.onLoad: success')
      })
  },

  methods: {
    ...mapMutations([]),

    addReply () {
      //
      // Triggered when 'onShareAppMessage' is successful
      // add invitation to server database and local storage
      //
      this.$http.get('statistics/addReply', {
        sessionKey: this.sessionKey,
        eventKey: this.thing,
        reply: this.reply
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('回复成功' + d.data.state)
          wx.showToast({
            title: '成功！',
            duration: 2000,
            content: '回复成功',
            success: () => {
              this.$router.push('/pages/main')
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showToast({
            title: '失败',
            duration: 2000
          })
        }
      })
    },

    click ($event, choice) {
      this.reply[choice.number] = !this.reply[choice.number]
    }
  },

  onShareAppMessage: function (res) {
    //
    // Triggered when the invite button is pressed
    // enter the friend list and locate the page to share
    //
    var that = this
    if (res.from === 'button') {
      console.log('invite_add: ' + res.target)
    }
    return {
      title: this.thing,
      // the page to share
      // the parameters are to identify a specific event
      path: '/pages/invite_accept?inviterID=' + this.sessionKey + '&date=' + this.date + '&time=' + this.time,
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
ul {
  &:before {
    content: "before";
    display: table;
  }
  li {
    padding: 0 32rpx;
    display: block;
    p {
      display: flex;
      justify-content: space-between;
      span {
        display: inline;
      }
    }
  }
}

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
  background-color: #b2bec3;
  max-width: 100%;
  vertical-align: middle;
}

.pick {
  width: 700rpx;
  display: block;
}

label.weui-cell__ft {
  font-weight: 900;
  margin-left: 10rpx;
  color: #797979;
}

input {
  font-weight: 550;
  border-radius: 30rpx;
  padding: 10rpx 10rpx;
  font-size: 40rpx;
}

.weui-cell {
  background-color: #b2bec3;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}
</style>
