<template>
  <div class="page">

    <div class="page__hd">
      <h1 class="page__title">给队伍取个名字</h1>
      <p class="page__desc">我是首页</p>
      <p class="page__desc">日程</p>
    </div>

    <ul class="weui-cells">
      <view class="weui-cell" v-for='(todo, index) in todos' :key="index">
        <div class="weui-cell__bd">{{todo.date}}：</div>
        <div class="weui-cell__ft">{{todo.thing}}</div>
      </view>
    </ul>
    <view>
      <input type="text" v-model="mytodo">
    </view>
  </div>
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
      'count',
      'todos'
    ])
  },

  mounted () {
  },

  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ]),
    clickHandle (msg, ev) {
      // eslint-disable-next-line
      console.log('clickHandle:', msg, ev)
    }
  }
}
</script>

<style scoped>
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
