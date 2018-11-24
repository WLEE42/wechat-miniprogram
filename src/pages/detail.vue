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
        label 地点：{{place}}
      .weui-cell
        label 事件：{{thing}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      time: '请选择时间',
      date: '请选择日期',
      thing: '',
      place: ''
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  },
  methods: {
    ...mapMutations([])
  },
  mounted () {
    // console.log(this.$route.query.date)
    if (this.todos[this.$route.query.date].length !== 0) {
      this.todos[this.$route.query.date].forEach(todo => {
        if (todo.id === this.$route.query.id) {
          this.date = todo.date
          this.time = todo.time
          this.thing = todo.thing
          this.place = todo.place
        }
      })
    } else {
      this.thing = '今日无事件'
    }
  }
}
</script>

<style scoped>
</style>
