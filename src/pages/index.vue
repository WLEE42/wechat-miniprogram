<template lang="pug">
  .page

    .page__hd
      h1.page__title 给队伍取个名字
      p.page__desc 我是首页
      p.page__desc 日程

    .weui-cells__title 日程
    ul.weui-cells
      .weui-cell(v-for='(todo, index) in todos' :key="index")
        .weui-cell__bd {{todo.date}}：
        .weui-cell__bd {{todo.time}}
        .weui-cell__ft {{todo.thing}}
  
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'
export default {
  data () {
    return {
    }
  },

  components: {
    mpButton
  },

  computed: {
    ...mapState([
      'todos'
    ])
  },

  mounted () {
    this.showTodos()
  },

  methods: {
    ...mapMutations([
      'showTodos'
    ])
  }
}
</script>

<style scoped>
</style>
