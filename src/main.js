import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装 toast 插件
Vue.use(toast)

//使用 fastclick 插件，解决点击 300ms 延迟
FastClick.attach(document.body)

//使用 lazyload 图片懒加载插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/waiting.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
