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
      console.log(this.userInfo)
      this.$router.push({ path: '/pages/index', isTab: true })
    }
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
