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
        label 参与人数: {{stat.people}}
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="handleInit" ref="echarts" />
    </div>
    button(open-type="share" class="share") 分享统计
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'

let chart = null

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      option: null,
      stat: {
      },
      result: {}
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
    },
    initChart () {
      this.option = {
        title: { text: '时间统计' },
        color: ['#37a2da', '#32c5e9', '#67e0e3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['人数']
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
            axisLabel: {
              color: '#666'
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: Object.keys(this.result),
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
            name: '人数',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: Object.values(this.result),
            itemStyle: {
              emphasis: {
                color: '#37a2da'
              }
            }
          }
        ]
      }
      // this.$refs.echarts.init()
    },
    handleInit (canvas, width, height) {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      chart.setOption(this.option)
      return chart
    }
  },
  onLoad () {
    this.statistics.forEach(stat => {
      if (String(stat.eventKey) === this.$route.query.eventKey) {
        this.stat = stat
        stat.choices.forEach((choice) => {
          this.result[choice.date + ' ' + choice.time] = choice.number
        })
      }
    })
    this.initChart()
  },

  onUnload () {
    this.result = {}
  },

  onShareAppMessage: function (res) {
    //
    // Triggered when the invite button is pressed
    // enter the friend list and locate the page to share
    //
    var that = this
    if (res.from === 'button') {
      console.log('stat_add: ' + res.target)
    }
    return {
      title: this.thing,
      // the page to share
      // the parameters are to identify a specific event
      path: '/pages/start?statID=' + this.sessionKey + '&eventKey=' + this.$route.query.eventKey,
      success: function (res) {
        console.log('stat_add.onShareAppMessage: success')
        that.addInvitation()
      },
      fail: function (res) {
        console.log('stat_add: share failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: 0px 0px;
  padding: 0 32rpx;
  margin: 20rpx 16rpx;
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
  height: 250px;
}
.share {
  margin-top: 200rpx;
}
</style>
