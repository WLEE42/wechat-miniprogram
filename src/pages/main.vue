<template lang="pug">

  .page
    div.title 主页面

    button(@click="$router.replace({path:'/pages/index'})") 日程管理

    button(@click="$router.replace({path:'/pages/setting'})") 用户中心 
    
    button(@click="$router.replace({path:'/pages/inviter_index'})") 日程邀请

    button() 时间统计
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
  padding: 48rpx 32rpx 32rpx;
  color: rgba(0, 0, 0, 0.87);
  font-size: 50rpx;
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
}
</style>
