<template lang="pug">
  .page
    <view>
    <label> 标题: </label>
    <span> {{title}} </span>
    </view>
    <view>
    <label> 事件: </label>
    <span> {{thing}} </span>
    </view>
    <view>
    <label> 地点: </label>
    <span> {{place}} </span>
    </view>
    label.weui-cell__bd 截止时间：
    label.weui-cell__ft {{deadDate+' '+deadTime}}

    <ul>
      <li v-for='choice in choices':key="choice.rank" @click="choose($event, choice)">
        <view>
          image(v-if='reply[choice.rank]' src="/static/check.png" class="check")
          image(v-if='!reply[choice.rank]' src="/static/cross.png" class="check")
          <label> 日期: </label>
          <span> {{choice.date}} </span>
          <label> 时间: </label>
          <span> {{choice.time}} </span>
        </view>
      </li>
    </ul>

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
      statID: '',
      eventKey: '',
      title: '',
      deadTime: '',
      deadDate: '',
      choices: {},
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

  onLoad (res) {
    this.month = new Date().getMonth() + 1
    console.log('statistic_accept.onload: ' + res.statID + res.eventKey)
    const that = this
    that.eventKey = res.eventKey
    that.statID = res.statID

    this.$http
      .get('statistics/getSingleStatistic', { statID: this.statID, eventKey: this.eventKey })
      .then(d => {
        if (new Date(d.data.deadDate) < new Date()) {
          wx.showToast({
            title: '已过期',
            duration: 2000,
            icon: 'fail'
          })
          this.$router.replace({ path: '/pages/main' })
        } else if (+(new Date(d.data.deadDate)) === +(new Date()) && compareTime(d.data.deadTime)) {
          wx.showToast({
            title: '已过期',
            duration: 2000,
            icon: 'fail'
          })
          this.$router.replace({ path: '/pages/main' })
        }
        that.title = d.data.title
        that.deadTime = d.data.deadTime
        that.deadDate = d.data.deadDate
        that.people = d.data.people
        that.eventKey = d.data.eventKey
        that.thing = d.data.thing
        that.place = d.data.place
        for (let i in d.data.choices) {
          this.choices[d.data.choices[i].rank] = d.data.choices[i]
          this.reply[d.data.choices[i].rank] = false
        }
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
        sessionKey: this.statID,
        eventKey: this.eventKey,
        reply: JSON.stringify(this.reply)
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('回复成功' + d.data.state)
          wx.showToast({
            title: '成功！',
            content: '回复成功',
            success: () => {
              this.$router.replace('/pages/main')
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showToast({
            title: '失败'
          })
        }
      })
    },

    choose ($event, choice) {
      this.reply[choice.rank] = !this.reply[choice.rank]
      this.$mp.page.onShow()
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  &:before {
    content: "选项：";
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
.check {
  width: 50rpx;
  height: 50rpx;
}
</style>
