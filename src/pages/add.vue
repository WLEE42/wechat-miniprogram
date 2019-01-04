<template>
  <div class='page'>

    <div class='weui-cells'>

      <div class='weui-cell'>
        <picker
          class='pick'
          mode="time"
          v-bind:value="time"
          start="00:00"
          end="24:00"
          @change="TimeChange"
        >
          <label class='weui-cell__bd'> 时间：</label>
          <label class='weui-cell__ft'> {{time}}</label>
        </picker>
      </div>
      <div class='weui-cell'>
        <picker
          class='pick'
          mode="date"
          v-bind:value="date"
          start="1999-01-01"
          end="2099-01-01"
          @change="DateChange"
        >
          <label class='weui-cell__bd'> 日期：</label>
          <label class='weui-cell__ft'> {{date}}</label>
        </picker>
      </div>
      <div class='weui-cell'>
        <label> 事件：</label>
        <input
          v-model="thing"
          placeholder="请输入日程"
        />
      </div>
      <div class='weui-cell'>
        <label> 地点：</label>
        <input
          v-model="place"
          placeholder="请输入地点"
        />
      </div>
    </div>

    <button
      class='weui-btn'
      @click="addTodo"
      type="primary"
    > 添加日程</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      motto: 'Hello World',
      time: '请选择时间',
      date: '请选择日期',
      thing: '',
      place: ''
    }
  },

  computed: {
    ...mapState([
      'count',
      'todos',
      'sessionKey'
    ])
  },

  methods: {
    ...mapMutations([
      'addTodos'
    ]),

    addTodo () {
      //
      // triggered when the button is pressed
      // add event into calendar
      //
      if (this.date === '请选择日期' || this.time === '请选择时间') {
        wx.showModal({
          title: '提示',
          content: '请填写日期与时间',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      var that = this
      this.$http.get('event/addEvent', {
        time: this.time,
        date: this.date,
        thing: this.thing,
        place: this.place,
        sessionKey: this.sessionKey
      }).then(d => {
        console.log(d)
        if (d.data.state === 'success') {
          console.log('添加成功' + d.data.state)
          this.addTodos({ time: this.time, date: this.date, thing: this.thing, place: this.place, eventKey: d.data.eventKey })
          wx.showToast({
            title: '成功！',
            content: '已添加日程',
            duration: 1000,
            mask: true,
            success: function (res) {
              wx.hideToast()
              that.time = '请选择时间'
              that.date = '请选择日期'
              that.thing = ''
              that.place = ''
              that.$router.back()
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
                that.$router.push({ path: '/pages/detail', query: { date: that.date, eventKey: d.data.eventKey } })
              }
            }
          })
        }
      })
    },
    TimeChange (e) {
      // console.log('选中的时间为：' + e.mp.detail.value)
      // console.log(this.time)
      this.time = e.mp.detail.value
    },
    DateChange (e) {
      // console.log('选中的日期为：' + e.mp.detail.value)
      this.date = e.mp.detail.value
    }
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
        // 如果这里有 shareTickets，则说明是分享到群的
        console.log(res.shareTickets)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-image: url("https://github.com/yewh16/wechat-miniprogram/blob/master/image/background_add.jpg?raw=true");
  background-size: 100% 100%;
  background-color: #f2f0db;
  height: 100%;
}
button {
  border: 0px 0px;
  padding: 0 32rpx;
  margin: 80rpx 16rpx 540rpx 16rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.26);
  color: rgb(33, 33, 33);
  letter-spacing: 0.01em;
  line-height: 100rpx;
  min-width: 176rpx;
  background-color:  #f2f0db;
  max-width: 100%;
  vertical-align: middle;
}
.pick {
  width: 100%;
}
label.weui-cell__ft {
  font-weight: 900;
  color: #848484;
  margin-left: 10rpx;
}
input {
  font-weight: 550;
  border-radius: 30rpx;
  padding: 10rpx 10rpx;
  font-size: 40rpx;
}
.weui-cells {
  background-color: #f2f0db;
}
.weui-cell {  
  background-color: #f2f0db;
  border-radius: 30rpx;
  padding: 20rpx 20rpx;
  font-size: 40rpx;
  font-weight: 900;
  margin: 10rpx 20rpx;
}
</style>
