<template lang="pug">
  .page
    div 具体日程

    div.weui-cells

      .weui-cell
        label.weui-cell__bd 时间：
        label.weui-cell__ft {{time}}
      .weui-cell
        label.weui-cell__bd 日期：
        label.weui-cell__ft {{date}}
      .weui-cell
        label 事件：
        label.weui-cell__ft {{thing}}

</template>

<script>
  export default {
    data () {
      return {
        date: [],
        time: '12',
        thing: 'ss'
      }
    },
    method: {},
    mounted () {
      // console.log(this.$route.query.date)
      this.date = this.$route.query.year + '-' + this.$route.query.month + '-' + this.$route.query.date
    }
  }
</script>

<style scoped>

</style>
