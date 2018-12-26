<template lang="pug">
  .page
    .weui-cells
      .weui-cell
        label 标题：
        input(v-model="title" placeholder="请输入标题")
      .weui-cell 
        label 事件：
        input(v-model="thing" placeholder="请输入日程")
    ul.weui-cells
      li.weui-cell(v-for='choice in choices' :key="choice.number") 
        div
          picker.pick(mode="date" v-bind:value="choice.date" start="1999-01-01" end="2099-01-01" @change="DateChange($event,choice)")
            label {{choice.date}}
        div 
          picker.pick(mode="time" v-bind:value="choice.time" start="00:00" end="24:00" @change="TimeChange($event,choice)")
            label {{choice.time}}
      .weui-cell
        picker.pick(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange2")
          label() 时间
          label {{newTime}}
        picker.pick(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange2")
          label() 日期
          label {{newDate}}
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
      .weui-cell
        label 地点：
        input(v-model="place" placeholder="请输入地点")

    button.weui-btn(@click="addStatistic" type="default" open-type="share" :disabled = "disabled") 发起统计
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { formatTime, formatDate } from '../utils'

export default {
  data () {
    return {
      title: '标题',
      choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
      newTime: '请选择时间',
      newDate: '请选择日期',
      deadTime: '请选择时间',
      deadDate: '请选择日期',
      disabled: true,
      thing: '',
      place: ''
    }
  },

  computed: {
    ...mapState([
      'sessionKey'
    ])
  },

  watch: {
    deadDate (newVal, oldVal) {
      if (newVal !== '请选择日期' && this.time !== '请选择时间') {
        this.disabled = false
      }
    },
    deadTime (newVal, oldVal) {
      if (newVal !== '请选择时间' && this.date !== '请选择日期') {
        this.disabled = false
      }
    }
  },

  mounted () {
    this.choices.push({
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      number: 0
    })
    console.log(this.choices[0])
  },

  methods: {
    ...mapMutations([
    ]),

    addStatistic () {
      //
      // Triggered when 'onShareAppMessage' is successful
      // add invitation to server database and local storage
      //
      var that = this
      this.$http.get('statistic/addStatistic', {
        title: this.title,
        thing: this.thing,
        deadTime: this.deadTime,
        deadDate: this.deadDate,
        choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
        place: this.place
      }).then(d => {
        if (d.data.state === 'success') {
          console.log('添加时间统计成功' + d.data.state)
          that.statistics[that.date.split('-')[1]].push({
            title: this.title,
            thing: this.thing,
            deadTime: this.deadTime,
            deadDate: this.deadDate,
            choices: [{ date: '2018-12-26', time: '20:20', number: '0' }],
            place: this.place
          })
          wx.showModal({
            title: '成功！',
            content: '已添加日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.$router.replace({ path: '/invite/inviter_index' })
              }
            }
          })
        } else if (d.data.state === 'fail') {
          console.log('添加失败' + d.data.state)
          wx.showModal({
            title: '时间冲突',
            content: '与原有日程时间冲突\n[确定]继续编辑当前日程\n[取消]跳转至原有日程',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log(that.date)
                that.$router.push({ path: '/invite/detail', query: { date: that.date, eventKey: d.data.eventKey } })
              }
            }
          })
        }
      })
    },

    addChoices () {
      this.choices.push({
        date: this.newDate,
        time: this.newTime,
        number: this.choices.length
      })
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
    },
    TimeChange (e, choice) {
      for (let i = 0; i < this.choices.length; i++) {
        if (this.choices[i].number === choice.number) {
          this.choices[i].time = e.mp.detail.value
        }
      }
    },

    DateChange (e, choice) {
      for (let i = 0; i < this.choices.length; i++) {
        if (this.choices[i].number === choice.number) {
          this.choices[i].date = e.mp.detail.value
        }
      }
      // console.log('选中的日期为：' + e.mp.detail.value.split('-')[1])
    }
  },

  onShareAppMessage: function (res) {
    //
    // Triggered when the invite button is pressed
    // enter the friend list and locate the page to share
    //
    var that = this
    if (res.from === 'button') {
      console.log('invite_add: ' + res.target)
    }
    return {
      title: this.thing,
      // the page to share
      // the parameters are to identify a specific event
      path: '/pages/invite_accept?inviterID=' + this.sessionKey + '&date=' + this.date + '&time=' + this.time,
      success: function (res) {
        console.log('invite_add.onShareAppMessage: success')
        that.addInvitation()
      },
      fail: function (res) {
        console.log('invite_add: share failed')
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
  min-width: 176rpx;
  background-color: #b2bec3;
  max-width: 100%;
  vertical-align: middle;
}
.pick {
  width: 700 rpx;
  display: block;
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
  background-color: #b2bec3;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}
</style>
