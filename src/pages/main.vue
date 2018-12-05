<template lang="pug">

</template>

<script>

export default {
  data () {
    return {}
  },

  components: {
  },

  onLaunch: function () {
    wx.login({
      success: function (res) {
        var code = res.code
        if (code) {
          console.log('获取用户登录凭证：' + res.code)
          // 发送凭证
          this.$http.get('login', { code: code }).then(d => {
            console.log(d.sessionkey)
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg)
        }
      }
    })
  },

  computed: {
  },

  mounted () {
    this.showTodos()
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
