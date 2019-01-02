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
    <view class="tabBar">
    </view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
    ...mapMutations([
    ]),
    bindViewTap () {
      const url = '/packageA/logs'
      wx.navigateTo({ url })
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
  margin-left: 60rpx;
}

.userinfo-nickname {
  color: #aaa;
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
.weui-cell {
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}
</style>
