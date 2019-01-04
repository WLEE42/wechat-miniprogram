<template lang="pug">
  .page
    <view class="info">
    <view>
    <p class="title"> 标题: </p>
    p.content {{title}} 
    </view>
    <view>
    p.title 事件: 
    p.content {{thing}} 
    </view>
    <view>
    p.title 地点:
    p.content {{place}}
    </view>
    <view>
    p.title 截止时间：
    p.content2 {{deadDate+' '+deadTime}}
    </view>
    </view>

    <ul>
      <li class="info" v-for='choice in choices':key="choice.rank" @click="choose($event, choice)">
        <view>
          image(v-if='reply[choice.rank]' src="/static/check.png" class="check")
          image(v-if='!reply[choice.rank]' src="/static/cross.png" class="check")
          view {{choice.date}}
          view {{choice.time}} 
        </view>
      </li>
    </ul>

    button(@click="addReply") 提交问卷
    button.weui-btn(@click="$router.replace({path:'/pages/main'})" type="default") 返回
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
        console.log('stat_accept.onLoad: success')
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
.page {
  background-color: #f2f0db;
  height: 100%;
  background-image: url("https://github.com/yewh16/wechat-miniprogram/blob/master/image/background_statistic.jpg?raw=true");
  background-size: 100% 100%;
  height: 1200rpx;
}


.info {
  margin-top: 50rpx;
  margin-bottom: 60rpx;
}
.info view {
  display: flex;
}
.content {
  background-color:#ece7a8;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  margin-left: 5rpx;
  margin-right: 20rpx;
  font-size: 39rpx;
  width: 63.5%;
}
.content2 {
  background-color:#ece7a8;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  margin-left: 5rpx;
  margin-right: 20rpx;
  font-size: 39rpx;
  width: 53.5%;
}
.title{
  background-color: #ece7a8;
  border-radius: 30rpx;
  padding-left: 30rpx;
  padding-right: 10rpx;
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  margin-left: 20rpx;
  font-size: 39rpx;
  font-weight: 900;
}

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
  margin: 100rpx 16rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 100rpx;
  min-width: 176rpx;
  background-color: #ece7a8;
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
  background-color: #ece7a8;
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
