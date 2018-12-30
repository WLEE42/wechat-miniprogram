<template>
  <div class='page'>
    <view class="line">
      <button
        class='btn1'
        @click="$router.replace({path:'/pages/index'})"
      > 日程管理</button>

      <button
        class='btn2'
        @click="$router.replace({path:'/invite/inviter_index'})"
      > 日程邀请</button>
    </view>

    <view class="line">
      <button
        class='btn3'
        @click="$router.replace({path:'/stat/statistic_index'})"
      > 时间统计</button>

      <button
        class='btn4'
        @click="$router.push({path:'/pages/setting'})"
      > 用户中心</button>
    </view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: {
    ...mapState([
      'count',
      'todos'
    ])
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
button {
  &.btn1 {
    background-color: #00BFFF;
  }
  &.btn2 {
    background-color: #7B68EE;
  }
  &.btn4 {
    background-color: #FF4500;
  }
  &.btn3 {
    background-color: #F9F902;
  }
  border: 0px 0px;
  padding: 200rpx 32rpx;
  margin: 20rpx 10rpx;
  border-radius: 20rpx;
  width: 50%;
  height: 100%;
  font-weight: 900;
  font-size: 60rpx;
}
.line {
  display: flex;
  height: 560rpx;
  margin: 15rpx 0rpx;
}
</style>
