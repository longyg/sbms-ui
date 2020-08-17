import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import api from './http'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './i18n'
import global from '@/utils/global'
import store from './store'

Vue.use(api) //注册使用 api 模块
Vue.prototype.global = global // 挂载全局配置模块

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
