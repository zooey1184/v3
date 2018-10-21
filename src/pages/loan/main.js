import Vue from 'vue'
import App from './App.vue'
// import router1 from './type1/router'
// import router2 from './type2/router'
import router from './router'
import egg from '@/components/index.js'
import store from './store'
import '@/common/js/global'
Vue.config.productionTip = false

// const router = window.location.href.match(/type2/g) ? router2 : router1
// const component = window.location.href.match(/type2/g) ? component2 : component1
// Vue.directive('transfer-dom', TransferDom)
// TransferDom(Vue)

Vue.use(egg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
