<template>
  <div>
    <div>我是设置</div>
    <p> 意见反馈</p>
    <p> 关于日历</p>
    <view class="tabBar">
      <block>
        <view class="tabBar-item" @click="$router.replace({path:'/pages/main'})">
          <view><image class="icon" src='/static/settings.png'></image></view>
          <view class="tabBartext">主页</view>
        </view>
        <view class="tabBar-item" @click="$router.replace({path:'/pages/index'})">
          <view><image class="icon" src='/static/calendar.png'></image></view>
          <view class="tabBartext">日程</view>
        </view>
        <view class="tabBar-item" @click="$router.push({path:'/pages/add'})">
          <view><image class="icon" src='/static/add.png'></image></view>
          <view class="tabBartext">添加日程</view>
        </view>
      </block>
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
