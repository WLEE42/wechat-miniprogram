<template lang="pug">
  .page
    .weui-cell 我是设置
    .weui-cell
      button(open-type="getUserInfo" @getuserinfo="getUserInfo") 获取授权
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
      this.$router.push({ path: '/pages/index', isTab: true })
    }
  },
  created () {
    // console.log('launch')
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          // 存在code
          console.log('获取用户信息成!' + res.code)
          wx.request({
            url: 'http://127.0.0.01:5000',
            data: { code: res.code }
          })
        } else {
          console.log('获取用户信息失败!' + res.errMsg)
        }
      }
    })
  }
}
</script>

<style scoped>
</style>
