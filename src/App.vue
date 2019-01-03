<script>
import { mapActions } from 'vuex'

export default {

  methods: {
    ...mapActions([
      'showTodosAction'
    ])
  },

  created () {
  },
  onLaunch: function () {
    var that = this
    wx.checkSession({
      success () {
        that.showTodosAction()
      },
      fail () {
        wx.login({
          success (res) {
            var code = res.code
            if (code) {
              // 发送凭证
              // 发起网络请求
              wx.request({
                url: 'https://www.giveteamaname.top/login/',
                // url: 'http://localhost:8000/login/',
                data: {
                  code: res.code
                },
                success (res) {
                  // var jsonStr = res.data
                  // var obj = JSON.parse(jsonStr)
                  // var result = obj.result
                  wx.setStorageSync('sessionKey', res.data['sessionKey'])
                  // this.sessionKey = res.data['sessionKey']
                  that.showTodosAction()
                }
              })
            }
          }
        })
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
