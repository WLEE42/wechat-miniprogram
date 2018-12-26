<template>

  <div class='page'>
    <div class='title'> 主页面</div>

    <button
      class='btn1'
      @click="$router.replace({path:'/pages/index'})"
    > 日程管理</button>

    <button
      class='btn2'
      @click="$router.replace({path:'/pages/setting'})"
    > 用户中心</button>

    <button
      class='btn3'
      @click="$router.replace({path:'/invite/inviter_index'})"
    > 日程邀请</button>

    <button
      class='btn4'
      @click="$router.replace({path:'/stat/statistic_index'})"
    > 时间统计</button>
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
.title {
  text-align: center;
  display: block;
  padding: 48rpx 32rpx 32rpx;
  color: rgba(0, 0, 0, 0.87);
  font-size: 50rpx;
}
button {
  &.btn1 {
    background-color: #ff6347;
  }
  &.btn3 {
    background-color: rgba(79,132,196, 0.87);
  }
  &.btn2 {
    background-color:  rgba(0, 88, 94, 0.87);
  }
  border: 0px 0px;
  padding: 0 32rpx;
  margin: 32rpx 16rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 300rpx;
  width: 340rpx;
  height: 300rpx;
  display: inline-block;
  background-color: rgb(250, 250, 250);
  max-width: 100%;
  vertical-align: middle;
}
</style>
