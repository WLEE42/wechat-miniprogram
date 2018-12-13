<template lang="pug">

  .page
    div 主页面

    button.weui-btn(@click="$router.push({path:'/pages/index',isTab:true})") 日程管理

    button.weui-btn(@click="$router.push({path:'/pages/setting',isTab:true})") 用户中心 
    
    button.weui-btn() 日程邀请

    button.weui-btn() 时间统计

</template>

<script>
import { mapState } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {}
  },

  components: {
    mpButton
  },

  computed: {
    ...mapState([
      'count',
      'todos'
    ])
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style scoped>
.weui-btn {
  width: 50%;
  background: #66ccff;
  border-radius: 5px;
}

</style>
