<template>
  <div class='box'>
    <img
      v-if="isShow"
      class="start_img"
      :src="userInfo.avatarUrl"
    ></img>
    <img
      v-else
      class="start_img"
      src="/static/icon.png"
    ></img>
    <p class="text"> Hello! {{userInfo.nickName}}</p>
    <button
      class="btn"
      v-if="isShow"
      @click="redirect"
    > 开始探索 </button>
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
      textShow: false,
      inviterID: '',
      statID: '',
      eventKey: '',
      date: '',
      time: ''
    }
  },

  components: {
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  onLoad: function (res) {
    if (res) {
      this.statID = res.statID
      this.eventKey = res.eventKey
      this.inviterID = res.inviterID
      this.date = res.date
      this.time = res.time
    }
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
    },

    redirect () {
      if (this.inviterID) {
        this.$router.replace({ path: '/invite/invite_accept?inviterID=' + this.inviterID + '&date=' + this.date + '&time=' + this.time })
      } else if (this.statID) {
        this.$router.replace({ path: '/stat/statistic_accept?statID=' + this.statID + '&eventKey=' + this.eventKey })
      } else {
        this.$router.replace({path: '/pages/main'})
      }
    }
  }
}
</script>

<style scoped>
.text {
  text-align: center;
  margin-top: 200rpx;
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
.btn {
  width: 100%;
}
</style>
