<template lang="pug">
  .box
    .text 我是设置
    div
      button(open-type="getUserInfo" @getuserinfo="getUserInfo") 获取授权
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import fly from '../utils/fly'

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
      this.$router.push({ path: '/pages/main' })
    }
  },
  created () {
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          // 存在code
          console.log('获取用户信息成!' + res.code)
          fly.get('login', { code: res.code })
        } else {
          console.log('获取用户信息失败!' + res.errMsg)
        }
      }
    })
  }
}
</script>

<style scoped>
.text {
  text-align: center;
}
.box {
  position: relative;
  width: 400rpx;
  top: 350rpx;
  left: 175rpx;
}
</style>
