<template>
  <div class="page">
    <view class="line">
      <button class="btn1" @click="$router.replace({path:'/pages/index'})"></button>
      
      <button class="btn2" @click="$router.replace({path:'/invite/inviter_index'})"></button>
    </view>

    <view class="line">
      <button class="btn3" @click="$router.replace({path:'/stat/statistic_index'})"></button>
      
      <button class="btn4" @click="$router.push({path:'/pages/setting'})"></button>
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
    ...mapState(['count', 'todos'])
  },

  mounted () {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.page {
  background-image: url("https://github.com/yewh16/wechat-miniprogram/blob/master/image/background_main.jpg?raw=true");
  background-size: 100% 100%
}
button {
  background-color: rgba(0,0,0,0);
  border: none;
  &::after{
    border:none;
  }
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
.bg {
  height: 1200rpx;
  position: relative;
  width: 750rpx;
}
</style>
