<template>
  <div class="page">
    <view class="body">
      <view
        v-if="!hasData"
        class="notfound"
      >
        <image src='/static/rocket.png'></image>
        <p>您还没有统计</p>
      </view>
      <view v-else>
        <ul>
          <li
            v-for='statistic in statistics'
            :key="statistic.eventKey"
            @click="toDetail($event,statistic)"
          >
            <view class="item">
              <view class="content">
                <view class="item">
                  <p>时间：</p>
                  <span> {{statistic.deadDate + ' ' + statistic.deadTime}} </span>
                </view>
                <view class="item">
                  <p>事件：</p>
                  <span v-if="statistic.thing!=''"> {{statistic.title}} </span>
                  <span v-else> 无 </span>
                </view>
                <view class="item">
                  <p>地点：</p>
                  <span v-if="statistic.place!=''"> {{statistic.place}} </span>
                  <span v-else> 无 </span>
                </view>
                <view class="item">
                  <p>参与者人数：</p>
                  <span v-if="statistic.people!=0"> {{statistic.people}} </span>
                  <span v-else> 暂无 </span>
                </view>
              </view>
            </view>
          </li>
        </ul>
      </view>

    </view>

    <view class="tabBar">
      <block>
        <view
          class="tabBar-item"
          @click="$router.replace({path:'/pages/main'})"
        >
          <view>
            <image
              class="icon"
              src='/static/settings.png'
            ></image>
          </view>
          <view class="tabBartext">主页</view>
        </view>
        <view class="tabBar-item">
          <view>
            <image
              class="icon"
              src='/static/calendar.png'
            ></image>
          </view>
          <view class="tabBartext">时间统计</view>
        </view>
        <view
          class="tabBar-item"
          @click="$router.push({path:'/stat/statistic_add'})"
        >
          <view>
            <image
              class="icon"
              src='/static/add.png'
            ></image>
          </view>
          <view class="tabBartext">添加统计</view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import './icon.css'
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  data () {
    return {
      // store system info
      hasData: false,
      year: 0,
      month: 0,
      monthText: '',
      sessionKey: '',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },

  watch: {
    month: function () {
      if (this.statistics.length > 0) {
        this.hasData = true
      } else {
        this.hasData = false
      }
    }
  },

  computed: {
    ...mapState([
      'statistics'
    ])
  },

  created () {
    //
    // initialize systeminfo and date
    //
    this.sessionKey = wx.getStorageSync('sessionKey')
    // var that = this
    this.getStatistics()
    let now = new Date()
    this.year = now.getFullYear()
    this.month = now.getMonth()
    this.monthText = this.months[this.month]
  },

  onShow () {
    if (this.statistics.length > 0) {
      this.hasData = true
    } else {
      this.hasData = false
    }
    this.getStatistics()
  },

  onPullDownRefresh: function () {
    this.$mp.page.onShow()
    wx.stopPullDownRefresh()
  },

  methods: {
    ...mapMutations([
      'setStatistics'
    ]),
    getStatistics () {
      //
      // initialize statistic.Get and store the info.
      //
      this.statistics.splice(0, this.statistics.length)
      this.sessionKey = wx.getStorageSync('sessionKey')
      Vue.prototype.$http
        .get('statistics/getStatistics', {
          sessionKey: this.sessionKey
        })
        .then(d => {
          console.log(d.data.statistics)
          this.setStatistics(d.data.statistics)
          this.hasData = true
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
      if (this.month === 0) {
        this.month = 11
        this.year = parseInt(this.year) - 1
      } else {
        this.month = parseInt(this.month) - 1
      }
      this.monthText = this.months[this.month]
    },

    next (e) {
      //
      // respond to "calendar-next"
      // update the month and year to the next month date
      //
      if (this.month === 11) {
        this.month = 0
        this.year = parseInt(this.year) + 1
      } else {
        this.month = parseInt(this.month) + 1
      }
      this.monthText = this.months[this.month]
    },

    toDetail (e, statistic) {
      this.$router.push({
        path: '/stat/statistic_detail',
        query: { eventKey: statistic.eventKey }
      })
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
  width: 33%;
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
  background-color: #ffa000;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-bottom: 10rpx;
  margin-left: 5rpx;
  margin-right: 5rpx;
  font-size: 40rpx;
  width: 100%;
}

.item {
  display: flex;
}

.item p {
  margin-bottom: 10rpx;
  font-weight: 900;
}
</style>
