<template lang="pug">
  <div>
    <view class="body">
      <div>
        <p class='tit'> 查看个人日程</p>
      </div>
      <div class="btn_cell">
        <button> 月 </button>
        <button @click="$router.push({path:'/pages/dayView'})"> 日</button>
      </div>
    
    <div class="weui-cells__title"> 日程</div>
    <ul>
      <li v-for='todo in todos[todayDate]' :key="todo.eventKey" @click="toDetail($event,todo)">
        <p class='title'>
          <span> {{todo.date}} </span>
          <span> {{todo.time}} </span>
        </p>
        <p>
          <span> {{todo.thing}} </span>
          <span> {{todo.place}} </span>
        </p>
      </li>
    </ul>
    </view>
    
    <view class="tabBar">
      <block>
        <view class="tabBar-item">
          <navigator open-type="redirect" url="/pages/main">
            <view><image class="icon" src='/static/settings.png'></image></view>
            <view class="tabBartext">主页</view>
          </navigator>  
        </view>
        <view class="tabBar-item">
          <navigator open-type="redirect" url="/pages/index">
            <view><image class="icon" src='/static/calendar.png'></image></view>
            <view class="tabBartext">显示</view>
          </navigator>  
        </view>
        <view class="tabBar-item">
          <navigator open-type="redirect" url="/pages/add">
            <view><image class="icon" src='/static/add.png'></image></view>
            <view class="tabBartext">添加</view>
          </navigator>  
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'
import { formatDate } from '../utils'

export default {
  data () {
    return {
      todayDate: ''
    }
  },

  components: {
    Calendar
  },

  computed: {
    ...mapState([
      'todos',
      'events'
    ])
  },

  mounted () {
    this.todayDate = formatDate(new Date())
    this.showTodos()
  },

  methods: {
    ...mapMutations([
      'showTodos'
    ]),
    dateInfo () {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info)
    },
    select (val, val2) {
      console.log(val)
      console.log(val2)
      this.$router.push({ path: '/pages/dayView', query: { date: val[2], year: val[0], month: val[1] } })
    },
    toDetail (e, todo) {
      this.$router.push({ path: '/pages/detail', query: { date: this.todayDate, eventKey: todo.eventKey } })
    }
    // touchStart (e) {
    //   // 获取移动距离，可以通过打印出e，然后分析e的值得出
    //   this.startX = e.mp.changedTouches[0].clientX
    // },
    // // 滑动结束
    // touchEnd (e, index) {
    //   // 获取移动距离
    //   this.endX = e.mp.changedTouches[0].clientX
    //   if (this.startX - this.endX > 10) {
    //     for (let i = 0; i < this.commitInfo.length; i++) {
    //       this.commitInfo[i].type = 0
    //     }
    //     this.commitInfo[index].type = 1
    //   } else if (this.startX - this.endX < -10) {
    //     for (let i = 0; i < this.commitInfo.length; i++) {
    //       this.commitInfo[i].type = 0
    //     }
    //   }
    // },
    // // 点击回复原状
    // recover (index) {
    //   this.commitInfo[index].type = 0
    // }
  }
}
</script>

<style lang="scss" scoped>
.tit {
  padding: 48rpx 32rpx 32rpx;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  font-size: 50rpx;
}
button {
  border: 0px 0px;
  padding: 0 32rpx;
  margin: 32rpx 16rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 100rpx;
  min-width: 176rpx;
  background-color: rgb(250, 250, 250);
  max-width: 100%;
  vertical-align: middle;
}
.btn_cell {
  display: flex;
  justify-content: center;
}
ul {
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    display: block;
    border-top: 1rpx solid #d9d9d9;
  }
  li {
    padding: 0 32rpx;
    display: block;
    &:after {
      border-top-width: 1rpx;
      border-top-style: solid;
      display: block;
      content: "";
      width: 100%;
      position: absolute;
      color: #d9d9d9;
    }
    p {
      &.title {
        font-size: 45rpx;
        color: #ea6151;
      }
      display: flex;
      justify-content: space-between;
      span {
        display: inline;
      }
    }
  }
}
.icon {
  width: 54rpx;
  height: 54rpx;
}
.tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10rpx;
  margin-left: -4rpx;
  background: #f7f7fa;
  font-size: 20rpx;
  color: #8a8a8a;
  box-shadow: 6rpx 6rpx 6rpx 6rpx #aaa;
}
.tabBar-item {
  float: left;
  width: 33%;
  text-align: center;
  overflow: hidden;
}
/*当前字体颜色*/
.tabBartext {
  color: grey;
}
.body {
  width: 100%;
  margin-bottom: 150rpx;
}
</style>
