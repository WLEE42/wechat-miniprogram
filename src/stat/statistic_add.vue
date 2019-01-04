<template lang="pug">
  .page
    .weui-cells
      .weui-cell
        label 标题：
        input(v-model="title" placeholder="请输入标题")
      .weui-cell
        label 事件：
        input(v-model="thing" placeholder="请输入日程")
      .weui-cell
        label 地点：
        input(v-model="place" placeholder="请输入地点")
    ul.weui-cells
      li.weui-cell(v-for='choice in choices' :key="choice.number")
        div
          picker.pick(mode="date" v-bind:value="choice.date" start="1999-01-01" end="2099-01-01")
            label {{choice.date}}
        div
          picker.pick(mode="time" v-bind:value="choice.time" start="00:00" end="24:00")
            label {{choice.time}}
      .weui-cell
        picker.pick(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange2" class="choose")
          label() 时间
          label.weui-cell__ft {{newTime}}
        picker.pick(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange2")
          label() 日期
          label.weui-cell__ft {{newDate}}
        button(@click="addChoices") 添加选项

    .weui-cells
      .weui-cell
        picker.pick(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange3")
          label.weui-cell__bd 截止时间：
          label.weui-cell__ft {{deadTime}}
      .weui-cell
        picker.pick(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange3")
          label.weui-cell__bd 截止日期：
          label.weui-cell__ft {{deadDate}}

    button.weui-btn(@click="addStatistic" type="default" open-type="share" :disabled = "disabled") 发起统计
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      title: '',
      choices: {},
      newTime: '请选择时间',
      newDate: '请选择日期',
      deadTime: '请选择时间',
      deadDate: '请选择日期',
      disabled: true,
      thing: '',
      place: '',
      month: '',
      count: 0,
      eventKey: ''
    }
  },

  computed: {
    ...mapState([
      'sessionKey',
      'statistics'
    ])
  },

  watch: {
    deadDate (newVal, oldVal) {
      if (newVal !== '请选择日期' && this.deadTime !== '请选择时间') {
        this.disabled = false
      }
    },
    deadTime (newVal, oldVal) {
      if (newVal !== '请选择时间' && this.deadDate !== '请选择日期') {
        this.disabled = false
      }
    }
  },

  mounted () {
    this.month = new Date().getMonth() + 1
  },

  methods: {
    ...mapMutations([
      'setStatistics'
    ]),

    addStatistic () {
      //
      // Triggered when 'onShareAppMessage' is successful
      // add statistic to server database and local storage
      //
      var that = this
      console.log(JSON.stringify(this.choices))
      this.$http.get('statistics/addStatistic', {
        title: this.title,
        thing: this.thing,
        deadTime: this.deadTime,
        deadDate: this.deadDate,
        choices: JSON.stringify(this.choices),
        place: this.place,
        sessionKey: this.sessionKey
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('添加时间统计成功' + d.data.state)
          this.eventKey = d.data.eventKey
          that.statistics.push({
            title: this.title,
            thing: this.thing,
            deadTime: this.deadTime,
            deadDate: this.deadDate,
            choices: this.choices,
            place: this.place,
            eventKey: d.data.eventKey,
            people: '0'
          })
          wx.showToast({
            title: '成功！',
            content: '已添加日程',
            duration: 1000,
            success: function (res) {
              that.$router.back()
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showToast({
            title: '添加失败',
            duration: 2000,
            icon: 'success'
          })
        }
      })
    },

    addChoices () {
      if (this.newTime === '请设置时间' || this.newDate === '请设置日期') {
        wx.showToast({
          title: '请设置选项'
        })
        setTimeout(() => { wx.hideToast() }, 1000)
        return
      }
      this.count = this.count + 1
      this.choices[this.count] = {
        'time': this.newTime,
        'date': this.newDate,
        'number': 0,
        'rank': this.count
      }
      this.newTime = '请设置时间'
      this.newDate = '请设置日期'
    },

    TimeChange2 (e) {
      console.log(e.mp.detail.time)
      this.newTime = e.mp.detail.value
    },
    DateChange2 (e) {
      this.newDate = e.mp.detail.value
    },
    TimeChange3 (e) {
      console.log(e.mp.detail.time)
      this.deadTime = e.mp.detail.value
    },
    DateChange3 (e) {
      this.deadDate = e.mp.detail.value
    }
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
      path: '/pages/start?statID=' + this.sessionKey + '&eventKey=' + this.eventKey,
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

.weui-cells {
  margin-bottom: 100rpx;
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
  background-color: #f0ebb8;
  min-width: 150rpx;
  max-width: 100%;
  vertical-align: middle;
}

.pick {
  width: 700rpx;
  display: flex;
}

label.weui-cell__ft {
  font-weight: 900;
  margin-left: 10rpx;
  color: #797979;
}

input {
  font-weight: 550;
  border-radius: 30rpx;
  padding: 10rpx 10rpx;
  font-size: 40rpx;
}

.weui-cell {
  background-color: #f2f0db;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}
.choose {
  display: flex;
  flex-direction: row;
}
</style>
