<template lang="pug">
  .page
    .weui-cell 我是设置
    .weui-cell.userinfo
      .userinfo(@click="bindViewTap")
        img.userinfo-avatar(v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover")
        .userinfo-nickname
          .weui-cell__bd {{userInfo.nickName}}
    .weui-cells__title 意见反馈
    .weui-cells
      .weui-cell
        .weui-cell__bd
          p 意见反馈
        .weui-cell__ft
      .weui-cell
        .weui-cell__bd
          p 关于日历
</template>

<script>
import mpButton from 'mpvue-weui/src/button'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },

  components: {
    mpButton
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
  },

  onLoad () {
    // 调用应用实例的方法获取全局数据
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
