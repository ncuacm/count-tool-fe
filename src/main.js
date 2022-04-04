import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AFTableColumn from 'af-table-column'
import instance from './store/http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(AFTableColumn)
var axios = require('axios')
//axios.defaults.baseURL = 'http://peterliang.top:8087'
Vue.prototype.$axios =instance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 向后台发送数据的时候的拦截器
// axios.interceptors.request.use(function(config) {
//   // 在发送请求之前设置token
//   if (localStorage.getItem("token")) {
//     config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
