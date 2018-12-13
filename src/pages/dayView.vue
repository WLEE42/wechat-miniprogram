<template lang="pug">
  div
    div.title 今日日程

    div.date
      label 日期：
      label {{date}}

      //- .weui-cell
      //-   label.weui-cell__bd 时间：
      //-   label.weui-cell__ft {{time}}
      //- .weui-cel
      //-   label 事件：
      //-   label.weui-cell__ft {{thing}}
      //- .weui-cells__title 日程
    ul(v-if="flag")
      li(v-for="todo in thing" :key="todo.eventKey"  @click="toDetail($event,todo)") 
        div {{todo.date}}
        div {{todo.time}}
        div {{todo.thing}} 
        div {{todo.place}}
    div(v-else) 今日无事件
      
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
  methods: {
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

<style lang="scss" scoped>
.title {
  font: 50rpx sans-serif;
  text-align: center;
}
.date {
display: flex;
justify-content: space-between;
}
ul {
  &:before{
    content: "before";
    display: table;
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
    border-bottom: solid 2rpx;
    border-bottom-color:hotpink;
    div {
      display: inline;
    }
  }
}
</style>
