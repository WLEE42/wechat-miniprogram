<template lang="pug">
  .box
    div.card 
      div.title 我是设置
      div.content 是否授权socially使用您的个人信息？
      p - 昵称，头像等信息
      p - 个人日程信息
    div.btn_cell
      button(open-type="getUserInfo" @getuserinfo="getUserInfo") 获取授权
      button 取消授权
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },

  components: {
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    getUserInfo (e) {
      // 调用登录接口
      this.setUserInfo(e.mp.detail.userInfo)

      this.$router.replace('/pages/main')

    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  .title {
    padding: 48rpx 32rpx 32rpx;
    display: flex;
    color: rgba(0, 0, 0, 0.87);
    font-size: 72rpx;
  }
  .content {
    padding: 32rpx;
    display: block;
    color: rgba(0, 0, 0, 0.87);
  }
  justify-content: flex-start;
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  margin: 16rpx;
  border: 0;
  box-shadow: 0 2rpx 6rpx 0 rgba(0, 0, 0, 0.2),
    0 2rpx 2rpx 0 rgba(0, 0, 0, 0.14), 0 4rpx 2rpx -2px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  background-color: rgb(255, 255, 255);
  border-radius: 4rpx;
  line-height: 1.4;
}
.btn_cell {
  display: flex;
  justify-content: flex-end;
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
.box {
  position: relative;
  // width: 400rpx;
  top: 250rpx;
  // left: 175rpx;
}
</style>
