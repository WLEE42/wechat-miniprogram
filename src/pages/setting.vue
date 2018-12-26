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
      </div>
      <div class='weui-cells__title'> 意见反馈</div>
      <div class='weui-cells'>
        <div class='weui-cell'>
          <div class='weui-cell__bd'>
            <p> 意见反馈</p>
          </div>
          <div class='weui-cell__ft'>
          </div>
        </div>
        <div class='weui-cell'>
          <div class='weui-cell__bd'>
            <p> 关于日历</p>
          </div>
        </div>
      </div>
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
