<template>
  <div class='page'>
    <view class="body">
      <Calendar
        :events="events"
        @select="select"
        ref="calendar"
        @selectMonth="selectMonth"
        @selectYear="selectYear"
      ></Calendar>

      <div class="weui-cells__title"> 日程</div>
      <ul>
        <li
          v-for='todo in todos[currentDate]'
          :key="todo.eventKey"
          @click="toDetail($event,todo)"
        >
          <view class="item">
            <view>
              <p class="title">{{todo.time}}</p>
            </view>
            <view class="content">
              <view class="item">
                <span v-if="todo.thing!=''"> {{todo.thing}} </span>
                <span v-else> 没有事件描述 </span>
              </view>
            </view>
          </view>
        </li>
      </ul>
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
          <view class="tabBartext">日程</view>
        </view>
        <view
          class="tabBar-item"
          @click="$router.push({path:'/pages/add'})"
        >
          <view>
            <image
              class="icon"
              src='/static/add.png'
            ></image>
          </view>
          <view class="tabBartext">添加日程</view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'
import { formatDate, formatNumber } from '../utils'

export default {
  data () {
    return {
      todayDate: '',
      currentDate: ''
    }
  },

  onPullDownRefresh: function () {
    this.$mp.page.onShow()
    wx.stopPullDownRefresh()
  },

  components: {
    Calendar
  },

  computed: {
    ...mapState([
      'todos',
      'events'
    ])
  },

  onShow () {
    this.todayDate = formatDate(new Date())
    this.currentDate = this.todayDate
    this.showTodosAction()
  },

  methods: {
    ...mapActions([
      'showTodosAction'
    ]),
    select (val, val2) {
      val[1] = formatNumber(val[1])
      val[2] = formatNumber(val[2])
      this.currentDate = val.join('-')
    },
    toDetail (e, todo) {
      this.$router.push({ path: '/pages/detail', query: { date: this.currentDate, eventKey: todo.eventKey } })
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
.btn_cell {
  display: flex;
  justify-content: center;
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
.item {
  display: flex;
}
.item p {
  margin-bottom: 10rpx;
}
.content {
  background-color: #00bfff;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 50rpx;
  margin-bottom: 10rpx;
  margin-left: 5rpx;
  font-size: 40rpx;
  width: 80%;
}
.title {
  background-color: #00bfff;
  border-radius: 30rpx;
  padding-left: 20rpx;
  padding-right: 10rpx;
  margin-bottom: 10rpx;
  margin-right: 5rpx;
  font-size: 40rpx;
}
</style>
