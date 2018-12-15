<template>
  <div>
    <img
      v-if="isShow"
      class="start_img"
      :src="userInfo.avatarUrl"
    >
    <img
      v-else
      class="start_img"
      src="/static/calendar.png"
    >
    <p> Hello! {{userInfo.nickName}}</p>
    <navigator
      v-if="isShow"
      open-type="redirect"
      url="/pages/main"
    >
      <button class="btn"> 开始探索 </button>
    </navigator>
    <button
      v-else
      class="btn"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    > 获取授权 </button>
    <p v-show="textShow">我们需要您的授权！</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isShow: false,
      textShow: false
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
      console.log(e)
      // 用户授权
      if (e.mp.detail.rawData) {
        // 调用登录接口
        this.setUserInfo(e.mp.detail.userInfo)
        this.isShow = true
      } else {
        this.textShow = true
      }
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
  top: 30rpx;
  left: 175rpx;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.start_img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  margin: 100rpx 0;
}
</style>
