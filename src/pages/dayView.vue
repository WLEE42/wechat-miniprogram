<template lang="pug">
  .page
    div 每天日程

    div.weui-cells

      //- .weui-cell
      //-   label.weui-cell__bd 时间：
      //-   label.weui-cell__ft {{time}}
      .weui-cell
        label.weui-cell__bd 日期：
        label.weui-cell__ft {{date}}
      .weui-cell
        label 事件：
        label.weui-cell__ft {{thing}}

</template>

<script>
import formatDate from '../utils/index'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      date: '',
      thing: ''
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  },
  method: {},
  mounted () {
    // console.log(this.$route.query.date)
    if (this.$route.query.year) {
      this.date = this.$route.query.year + '-' + this.$route.query.month + '-' + this.$route.query.date
    } else {
      this.date = formatDate(new Date())
    }
    if (this.todos[this.date]) {
      this.thing = this.todos[this.date]
    } else {
      this.thing = '今日无事件'
    }
  }
}
</script>

<style scoped>
</style>
