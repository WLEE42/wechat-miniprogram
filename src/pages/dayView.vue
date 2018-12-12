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
      //- .weui-cel
      //-   label 事件：
      //-   label.weui-cell__ft {{thing}}
      //- .weui-cells__title 日程
      ul.weui-cells(v-if="flag")
        li.weui-cell(v-for="todo in thing" :key="todo.eventKey"  @click="toDetail($event,todo)")
          .weui-cell__bd {{todo.date}}：
          .weui-cell__bd {{todo.time}}
          .weui-cell__ft {{todo.thing}}
          .weui-cell__ft {{todo.place}}
      div.weui-cell(v-else) 今日无事件
      

</template>

<script>
import { formatDate, formatNumber } from '../utils/index'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      date: '',
      thing: '',
      flag: false
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  },
  method: {
    toDetail (e, todo) {
      console.log(todo.eventKey)
      this.$router.push({ path: '/pages/detail', query: { date: this.date, eventKey: todo.eventKey } })
    }
  },
  mounted () {
    this.flag = false
    if (this.$route.query.year !== undefined) {
      this.date = this.$route.query.year + '-' + formatNumber(parseInt(this.$route.query.month)) + '-' + formatNumber(parseInt(this.$route.query.date))
    } else {
      this.date = formatDate(new Date())
      console.log(this.date)
    }
    if (Array.isArray(this.todos[this.date])) {
      this.thing = this.todos[this.date]
      this.flag = true
    } else {
      this.thing = '今日无事件'
    }
  }
}
</script>

<style scoped>
</style>
