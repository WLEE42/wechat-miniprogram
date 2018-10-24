<template lang="pug">
  .page
    div 添加日程

    .weui-cells

      .weui-cell
        picker.weui-btn(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange")
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{time}}   
      .weui-cell  
        picker.weui-btn(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange")
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{date}}      
      .weui-cell
        label 事件：
        input(placeholder="请输入日程")
      .weui-cell.invite
        label 邀请好友：
        button.invite2 邀请好友

    button.weui-btn(@click="addTodo") 添加日程

    button.weui-btn(@click="$router.push({path:'/pages/index',isTab:true})") 查看日程
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {
      motto: 'Hello World',
      time: '请选择时间',
      date: '请选择日期',
      thing: ''
    }
  },
  components: {
    mpButton
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'count',
      'todos'
    ])
  },
  methods: {
    ...mapMutations([
    ]),
    addTodo () {
      if (this.date === '请选择日期' || this.time === '请选择时间') {
        return
      }
      this.todos.push({ time: this.time, date: this.date, thing: this.thing })
      console.log(this.todos)
    },
    TimeChange (e) {
      // console.log('选中的时间为：' + e.mp.detail.value)
      // console.log(this.time)
      this.time = e.mp.detail.value
    },
    DateChange (e) {
      console.log('选中的日期为：' + e.mp.detail.value)
      this.date = e.mp.detail.value
    }
  }
}
</script>

<style scoped>
.invite {
  justify-content: space-between;
}
.invite2 {
  margin-right: 0px;
}
</style>
