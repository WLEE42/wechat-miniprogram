<template lang="pug">
  .page
    .weui-cell 我是设置
    .weui-cell.userinfo
      .userinfo(@click="bindViewTap")
        img.userinfo-avatar(v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover")
        .userinfo-nickname
          .weui-cell__bd {{userInfo.nickName}}

      .usermotto
        .user-motto
          div(:text="motto")
    .weui-cells__title 意见反馈
    .weui-cells
      .weui-cell
        .weui-cell__bd
          p 意见反馈
        .weui-cell__ft
      .weui-cell
        .weui-cell__bd
          p 关于日历
    .weui-cell
      button(open-type="getUserInfo" @getuserinfo="getUserInfo") 获取授权
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    mpButton
  },

  methods: {
    bindViewTap () {
      const url = '/packageA/logs'
      wx.navigateTo({ url })
    },
    getUserInfo (e) {
      // 调用登录接口
      this.userInfo = e.mp.detail.userInfo
    }
  },

  onLoad () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
.userinfo {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 15px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
