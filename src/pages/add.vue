<template lang="pug">
  .page
    div 添加日程

    .weui-cells

      .weui-cell
        picker.pick(mode="time" v-bind:value="time" start="00:00" end="24:00" @change="TimeChange")
          label.weui-cell__bd 时间：
          label.weui-cell__ft {{time}}
      .weui-cell
        picker.pick(mode="date" v-bind:value="date" start="1999-01-01" end="2099-01-01" @change="DateChange")
          label.weui-cell__bd 日期：
          label.weui-cell__ft {{date}}
      .weui-cell
        label 事件：
        input(placeholder="请输入日程")
      .weui-cell
        label 地点：
        input(placeholder="请输入地点")
      
      .weui-cell.invite
        label 邀请好友：
        button.invite-btn 邀请好友

    button.weui-btn(@click="addTodo", type="primary") 添加日程

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
        thing: '',
        place: ''
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
    methods: {
      ...mapMutations([
        'addTodo'
      ]),
      addTodo () {
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
        this.todos.push({ time: this.time, date: this.date, thing: this.thing, place: this.place })
        console.log(this.todos)
        this.$http.get('add', {
          todo: {
            time: this.time,
            date: this.date,
            thing: this.thing,
            place: this.place
          }
        }).then(d => {
          if (d === 'success') {
            console.log('添加成功' + d)
            wx.showModal({
              title: '成功！',
              content: '已添加日程',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          } else {
            console.log('添加失败' + d)
            wx.showModal({
              title: '时间冲突',
              content: '与原有日程时间冲突\n[确定]继续编辑当前日程\n[取消]跳转至原有日程',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else {
                  this.$router.push({ path: '/pages/detail', query: { id: d.id } })
                }
              }
            })
          }
        })
      },//
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

<style scoped>
.pick {
  width: 700 rpx;
}

.invite {
  justify-content: space-between;
}

.invite-btn {
  margin-right: 0px;
  height: 100 rpx;
}
</style>
