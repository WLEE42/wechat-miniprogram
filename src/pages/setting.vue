<template>
  <div>
    <div class="weui-cell">我是设置</div>
    <div class="weui-cell">
      <div class="userinfo" @click="bindViewTap">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <div class="userinfo-nickname">
          <div class="weui-cell__bd">{{userInfo.nickName}}</div>
        </div>
      </div>

      <div class="usermotto">
        <div class="user-motto">
          <card :text="motto"></card>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">意见反馈</div>
    <div class="weui-cells">
      <div class="weui-cells::before">
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>意见反馈</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>关于日历</p>
        </div>
      </div>
      <div class="weui-cell__ft::after">
        </div>
    </div>
    <div class="weui-cell">
      <button open-type="getUserInfo" @getuserinfo="getUserInfo">
        获取授权
      </button>
    </div>
  </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 150px;
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
