<template lang="pug">
  .page
    <div class="calendar-tools">
      <div class="calendar-prev" @click="prev">
        <img :src="arrowLeft" v-if="!!arrowLeft">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <div class="calendar-next"  @click="next">
        <img :src="arrowRight" v-if="!!arrowRight">
        <i class="iconfont icon-arrow-right" v-else></i>
      </div>
      <div class="calendar-info">
        <div class="mc-month">
          <div class="mc-month-inner" :style="{'top': monthPosition + unit}" v-if="isIos">
            <span v-for="m in months" :key="m" >{{m}}</span>
          </div>
          <div class="mc-month-text" v-else>{{monthText}}</div>
        </div>
      <div class="mc-year">{{year}}</div>
      </div>
    </div>

    <view class="body">
      <view v-if="!hasData" class="notfound">
        <image src='/static/rocket.png'></image>
        <p>您还没有邀请</p>
      </view>

      <view v-else>
        ul
          li(v-for='invitation in myinvitations[month]' :key="invitation.eventKey" @click="toDetail($event,invitation)")
            <view class="item">
                <view>
                  <p class="title">{{invitation.date}}</p>
                  <p class="title">{{invitation.time}}</p>
                </view>
                <view class="content">
                  <view class="item">
                    <p>事件：</p>
                    <span v-if="invitation.thing!=''"> {{invitation.thing}} </span>
                    <span v-else> 无 </span>
                  </view>
                  <view class="item">
                    <p>地点：</p>
                    <span v-if="invitation.place!=''"> {{invitation.place}} </span>
                    <span v-else> 无 </span>
                  </view>
                  <view class="item">
                    <p>受邀人：</p>
                    <span v-if="invitation.invitee!=''"> {{invitation.invitee}} </span>
                    <span v-else> 暂未应邀 </span>
                  </view>
                </view>
            </view>
      </view>
    </view>

    <view class="tabBar">
      <block>
        <view class="tabBar-item" @click="$router.replace({path:'/pages/main'})">
          <view><image class="icon" src='/static/settings.png'></image></view>
          <view class="tabBartext">主页</view>
        </view>
        <view class="tabBar-item">
          <view><image class="icon" src='/static/calendar.png'></image></view>
          <view class="tabBartext">我的邀请</view>
        </view>
        <view class="tabBar-item" @click="$router.replace({path:'/invite/invitee_index'})">
          <view><image class="icon" src='/static/calendar.png'></image></view>
          <view class="tabBartext">邀请我的</view>
        </view>
        <view class="tabBar-item" @click="$router.push({path:'/invite/invite_add'})">
          <view><image class="icon" src='/static/add.png'></image></view>
          <view class="tabBartext">添加邀请</view>
        </view>
      </block>
    </view>

</template>

<script>
import './icon.css'
import { formatNumber } from '../utils'
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  data () {
    return {
      // store system info
      isIos: false,
      // determine which page to display
      year: 0,
      month: 0,
      monthText: '',
      sessionKey: '',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },

  watch: {
    //
    // change the variable 'hasData' when the month changes
    // it will controll the display content
    //
  },

  computed: {
    ...mapState([
      'myinvitations'
    ]),
    hasData: function () {
      return this.myinvitations.hasOwnProperty(this.month)
    }
  },

  created () {
    this.sessionKey = wx.getStorageSync('sessionKey')
    let now = new Date()
    this.year = now.getFullYear()
    this.month = formatNumber(now.getMonth() + 1)
    this.monthText = this.months[parseInt(this.month) - 1]
  },

  onShow () {
    this.getInviterInvitations()
    if (this.month in this.myinvitations) {
      if (this.myinvitations[this.month].length !== 0) {
        this.hasData = true
      } else {
        this.hasData = false
      }
    } else {
      this.hasData = false
    }
  },

  onPullDownRefresh: function () {
    console.log(this.myinvitations)
    this.$mp.page.onShow()
    // this.$router.replace({ path: '/invite/inviter_index' })
    wx.stopPullDownRefresh()
  },

  methods: {
    ...mapMutations([
      'setInviterInvitations'
    ]),
    getInviterInvitations () {
      //
      // get my invitations and store them
      //
      this.sessionKey = wx.getStorageSync('sessionKey')
      Vue.prototype.$http
        .get('invitation/getInviterInvitations', {
          sessionKey: this.sessionKey
        })
        .then(d => {
          console.log(d.data)
          this.setInviterInvitations(d.data)
          // for (let eleArray in d.data) {
          // console.log(eleArray)
          // d.data[eleArray].forEach(element => {
          //   if (this.myinvitations.hasOwnProperty(element.month)) {
          //     this.myinvitations[element.month].push({
          //       time: element.time,
          //       date: element.date,
          //       month: element.month,
          //       thing: element.thing,
          //       place: element.place,
          //       eventKey: element.eventKey,
          //       invitee: element.invitee
          //     })
          //   } else {
          //     this.myinvitations[element.month] = [
          //       {
          //         time: element.time,
          //         date: element.date,
          //         month: element.month,
          //         thing: element.thing,
          //         place: element.place,
          //         eventKey: element.eventKey,
          //         invitee: element.invitee
          //       }
          //     ]
          //   }
        })
        .catch(err => {
          console.log(err.status, err.message)
        })
    },

    prev (e) {
      //
      // respond to "calendar-prev"
      // update the month and year to the previous month date
      //
      if (this.month === '01') {
        this.month = '12'
        this.year = parseInt(this.year) - 1
      } else {
        this.month = formatNumber(parseInt(this.month) - 1)
      }
      this.monthText = this.months[parseInt(this.month) - 1]
    },

    next (e) {
      //
      // respond to "calendar-next"
      // update the month and year to the next month date
      //
      if (this.month === '12') {
        this.month = '01'
        this.year = parseInt(this.year) + 1
      } else {
        this.month = formatNumber(parseInt(this.month) + 1)
      }
      this.monthText = this.months[parseInt(this.month) - 1]
    },

    toDetail (e, invitation) {
      //
      // go to the detail of one invitation
      //
      this.$router.push({ path: '/invite/invite_detail', query: { month: invitation.month, eventKey: invitation.eventKey } })
    }
  }
}
</script>

<style lang="scss" scoped>
.notfound {
  margin-top: 200rpx;
  text-align: center;
}
.calendar-tools {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #5e7a88;
  box-shadow: 0rpx 4rpx 8rpx rgba(25, 47, 89, 0.1);
  margin-bottom: 30rpx;
  border-top: 1px solid rgba(200, 200, 200, 0.1);
}
.calendar-prev {
  width: 14.28571429%;
  float: left;
  text-align: center;
}
.calendar-prev img,
.calendar-next img {
  width: 34rpx;
  height: 34rpx;
}
.calendar-info {
  padding-top: 3px;
  font-size: 16px;
  line-height: 1.3;
  text-align: center;
  width: 220rpx;
  margin: 0 auto;
}
.calendar-info > div.mc-month {
  margin: auto;
  height: 40rpx;
  width: 100px;
  text-align: center;
  color: #5e7a88;
  overflow: hidden;
  position: relative;
}
.calendar-info > div.mc-month .mc-month-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 480rpx;
  transition: top 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.calendar-info .mc-month-text {
  display: block;
  font-size: 28rpx;
  height: 40rpx;
  width: 200rpx;
  overflow: hidden;
  text-align: center;
}
.calendar-info > div.mc-month .mc-month-inner > span {
  display: block;
  font-size: 14px;
  height: 20px;
  width: 100px;
  overflow: hidden;
  text-align: center;
}
.calendar-info > div.mc-year {
  font-size: 10px;
  line-height: 1;
  color: #999;
}
.calendar-next {
  width: 14.28571429%;
  float: right;
  text-align: center;
}
ul {
  li {
    padding: 0 12rpx;
    display: block;
    p {
      &.title {
        font-size: 45rpx;
        color: #ea6151;
      }
      display: flex;
      justify-content: space-between;
      span {
        display: inline;
      }
    }
  }
}
.icon {
  width: 54rpx;
  height: 54rpx;
}
.tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10rpx;
  margin-left: -4rpx;
  background: #f7f7fa;
  font-size: 20rpx;
  color: #8a8a8a;
  box-shadow: 6rpx 6rpx 6rpx 6rpx #aaa;
}
.tabBar-item {
  float: left;
  width: 25%;
  text-align: center;
  overflow: hidden;
}
.tabBartext {
  color: grey;
}
.body {
  width: 100%;
  margin-bottom: 150rpx;
}
.content {
  background-color: #7b68ee;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-bottom: 10rpx;
  margin-left: 5rpx;
  font-size: 40rpx;
  width: 80%;
}
.title {
  background-color: #7b68ee;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 10rpx;
  margin-bottom: 10rpx;
  margin-right: 5rpx;
  font-size: 40rpx;
  font-weight: 900;
}
.item {
  display: flex;
}
.item p {
  margin-bottom: 10rpx;
}
</style>
