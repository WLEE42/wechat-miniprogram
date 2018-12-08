<template lang="pug">
  .box
    .text 我是设置
    div
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
      this.$router.replace('/pages/main')
    }
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
