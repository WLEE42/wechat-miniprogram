<template lang="pug">
  .page
    div 添加日程

    .weui-cells

      .weui-cell
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{time}}
      .weui-cell
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{date}}
      .weui-cell
        label 事件：
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        time: '请选择时间',
        date: '请选择日期',
        thing: ''
      }
    },
    computed: {
      ...mapState([
        'todos'
      ])
    },
    methods: {
      ...mapMutations([])
    }
  }
</script>

<style scoped>
</style>
