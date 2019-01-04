<template>
  <div class="page">
    <div class='weui-cell'> 设置</div>

    <div class='weui-cell.userinfo'>
      <div
        class='userinfo'
        @click="bindViewTap"
      >
        <img
          class='userinfo-avatar'
          v-if="userInfo.avatarUrl"
          :src="userInfo.avatarUrl"
          background-size="cover"
        ></img>
        <div class='userinfo-nickname'>
          <div class='weui-cell__bd'> {{userInfo.nickName}}</div>
        </div>

        <div class='weui-cells'>
          <div class='weui-cell'>
            <div class='weui-cell__bd'>
              <p> 意见反馈</p>
            </div>
          </div>

          <div class='weui-cell'>
            <div class='weui-cell__bd'>
              <p> 关于日历</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
.page {
  background-color: #f2f0db;
  height: 100%;
  background-image: url("https://github.com/yewh16/wechat-miniprogram/blob/master/image/background_common.jpg?raw=true");
  background-size: 100% 100%;
  height: 1100rpx;
}

.icon {
  width: 54rpx;
  height: 54rpx;
}
.tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10rpx;
  margin-left: -4rpx;
  background: #f7f7fa;
  font-size: 20rpx;
  box-shadow: 6rpx 6rpx 6rpx 6rpx #aaa;
}
.tabBar-item {
  float: left;
  width: 33%;
  text-align: center;
  overflow: hidden;
}
.tabBartext {
  color: grey;
}
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
  margin-left: 60rpx;
}

.userinfo-nickname {
  color: rgb(102, 101, 101);
  margin-left: 100rpx;
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
  border: 1px solid blue;
}
.weui-cells {
  background-color: #f2f0db;
}
.weui-cell {
  border-radius: 0rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
  background-color: #f2f0db;
}
</style>
