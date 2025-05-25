import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from '../../router'
import store from '../../store'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import Header from '../h5/common/Header/index.vue'
Vue.component('Header', Header)

import i18n from '../../lang' // Internationalization
import '../../icons' // icon
import './common/errorLog' // error log
import './common/permission' // permission control
// import './mock' // simulation data
import '../../directive/lazySrc/index'

import * as filters from '../../filters' // global filters
import axios from 'axios'
Vue.prototype.$axios = axios

import Meta from 'vue-meta'
Vue.use(Meta)

// 防抖处理
const on = Vue.prototype.$on
Vue.prototype.$on = function(event, func) {
  let timer
  let newFunc = func
  if (event === 'click') {
    newFunc = function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
        func.apply(this, arguments)
      }, 500)
    }
  }
  on.call(this, event, newFunc)
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
console.log(JSON.stringify(process.env.ENV_CONFIG) === '"prod"' ? 'run in >>>prod' : 'run in >>>' + JSON.stringify(process.env.ENV_CONFIG))
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
