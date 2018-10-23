<template>
  <div class="page">
    <div class="weui-msg__title">添加日程</div>

    <div class="weui-cells">

      <div class="weui-cell">
        <picker class="weui-btn" mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange">
          <label class="weui-cell__bd">
            时间：
          </label>
          <label class="weui-cell__ft">{{time}}</label>
        </picker>
      </div>

      <div class="weui-cell">
        <picker class="weui-btn" mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange">
          <label class="weui-cell__bd">
            日期：
          </label>
          <label class="weui-cell__ft">{{date}}</label>
        </picker>
      </div>

      <div class=" weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">事件：</label>
        </div>
        <input class="weui-input" placeholder="请输入日程"></imput>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">邀请好友：</label>
        </div>
        <mp-button type="default" size="normal">邀请好友</mp-button>
      </div>

      <button class="weui-btn" @click="addTodo">添加日程</button>

      <button class='weui-btn' @click="$router.push({path:'/pages/index',isTab:true})">查看日程</button>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mpButton from 'mpvue-weui/src/button'

export default {
  data () {
    return {
      motto: 'Hello World',
      time: '请选择时间',
      date: '请选择日期'
    }
  },
  components: {
    mpButton
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ]),
    TimeChange (e) {
      console.log('选中的时间为：' + e.mp.detail.value)
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
</style>
