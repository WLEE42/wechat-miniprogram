<template lang="pug">
  .page
    div 日程详情

    .weui-cells

      .weui-cell
        label.weui-cell__bd 截止时间：
        label.weui-cell__ft {{stat.deadDate+' '+stat.deadTime}}
      .weui-cell
        label 地点：{{stat.place}}
      .weui-cell
        label 事件：{{stat.thing}}
      .weui-cell
        label 参与人数: {{stat.people.length}}
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
    </div>
    button(open-type="share") 分享统计
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'

let chart = null

function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          emphasis: {
            color: '#37a2da'
          }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          emphasis: {
            color: '#32c5e9'
          }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          emphasis: {
            color: '#67e0e3'
          }
        }
      }
    ]
  }
  chart.setOption(option)

  return chart // 返回 chart 后可以自动绑定触摸操作
}

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      onInit: initChart,
      stat: {
        title: '我爱学习',
        thing: '预定在本周进行学习',
        deadTime: '08:08',
        deadDate: '2018-12-03',
        choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
        people: [{ openid: '111', choice: 0 }],
        place: '北京',
        eventKey: ''
      }
    }
  },
  computed: {
    ...mapState([
      'statistics',
      'sessionKey'
    ])
  },
  methods: {
    ...mapMutations([]),

    modifyEvents () {
      console.log('modify')
      this.$http.get('statistics/modifyStatistic', {
        sessionKey: this.sessionKey,
        time: this.todo.time,
        date: this.todo.date,
        thing: this.todo.thing,
        place: this.todo.place,
        eventKey: this.todo.eventKey
      }).then(
        d => {
          this.todos[this.$route.query.date].forEach((todo, index, object) => {
            if (todo.eventKey === this.$route.query.eventKey) {
              object.splice(index, 1, this.todo)
            }
          })
        }
      )
    },
    deleteEvents () {
      console.log('delete')
      if (this.todo.thing === '今日无事件') {
        return
      }
      this.$http.get('statistics/deleteStatistic', {
        sessionKey: this.sessionKey,
        eventKey: this.todo.eventKey
      }).then(
        d => {
          this.todos[this.$route.query.date].forEach((todo, index, object) => {
            if (todo.eventKey === this.$route.query.eventKey) {
              object.splice(index, 1)
            }
          })
        }
      )
      this.$router.back()
    }
  },
  mounted () {
    this.statistics.forEach(stat => {
      if (stat.eventKey === this.$route.query.eventKey) {
        this.stat = stat
      }
    })
  },

  onShareAppMessage: function (res) {
    //
    // Triggered when the invite button is pressed
    // enter the friend list and locate the page to share
    //
    // var that = this
    return {
      title: this.todo.title,
      // the page to share
      // the parameters are to identify a specific event
      path: '/invite/invite_accept?inviterID=' + this.sessionKey + '&date=' + this.todo.date + '&time=' + this.todo.time,
      success: function (res) {
        console.log('invite_add.onShareAppMessage: success')
        // that.addInvitation()
      },
      fail: function (res) {
        console.log('invite_add: share failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
