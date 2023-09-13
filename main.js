import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
import $showMsg from './utils/showMsg.js'
import store from './store/store.js'
Vue.config.productionTip = false
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  // 判断请求的是否为有权限的 API 接口
    if (options.url.indexOf('/my/') !== -1) {
      options.header = {       // 为请求头添加身份认证字段
        Authorization: store.state.m_user.token,         // 字段的值可以直接从 vuex 中进行获取
      }
    }
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
//挂载http到uni上
uni.$http = $http
//挂载$showMsg到uni上
uni.$showMsg=$showMsg
App.mpType = 'app'

const app = new Vue({
	...App,
  store
})
app.$mount()
