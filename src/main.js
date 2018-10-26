import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import 'mpvue-weui/src/style/weui.css'
import fly from './utils/fly'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)
App.store = store
App.mpType = 'app'
Vue.prototype.$http = fly // 将fly实例挂在vue原型上

const app = new Vue(App)
app.$mount()
