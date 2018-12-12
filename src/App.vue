<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'sessionKey'
    ])
  },
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // eslint-disable-next-line
    console.log('app created and cache logs by setStorageSync')
  },
  onLaunch: function () {
    wx.login({
      success (res) {
        console.log(res)
        var code = res.code
        if (code) {
          console.log('获取用户登录凭证：' + res.code)
          // 发送凭证
          // 发起网络请求
          wx.request({
            url: 'http://39.96.33.101:80/login',
            data: {
              code: res.code
            },
            success (res) {
              // var jsonStr = res.data
              // var obj = JSON.parse(jsonStr)
              // var result = obj.result
              wx.setStorageSync('sessionKey', res.data['sessionKey'])
              // this.sessionKey = res.data['sessionKey']
              console.log('写入sessionKey' + res.data['sessionKey'])
            },
            fail (res) {
              console.log('访问服务器失败')
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg)
        }
      },
      fail (error) {
        console.log('login failed' + error.message)
      },
      complete () {
        console.log('login complete')
      }

    })
  }

}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
