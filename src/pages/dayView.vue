<template>
  <div>
    <div class='title'> 今日日程</div>

    <div class='date'>
      <label> {{date}}</label>
    </div>

    <ul v-if="flag">
      <li
        v-for="todo in thing"
        :key="todo.eventKey"
        @click="toDetail($event,todo)"
      >
        <p>
          span {{todo.date}} </span>
          span {{todo.time}}</span>
        </p>
        <p>
          <span> {{todo.thing}} </span>
          <span> {{todo.place}}</span>
        </p>
      </li>
    </ul>
    <div v-else> 今日无事件</div>
  </div>
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
  color: #ff6347;
  margin: 36rpx 0rpx;
  justify-content: center;
}
ul {
  &:before {
    content: "before";
    display: table;
  }
  li {
    padding: 0 32rpx;
    display: block;
    p {
      display: flex;
      justify-content: space-between;
      span {
        display: inline;
      }
    }
  }
}
</style>
