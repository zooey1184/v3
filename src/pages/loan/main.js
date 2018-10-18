import Vue from 'vue'
import App from './App.vue'
import router1 from './type1/router'
import router2 from './type2/router'
import page from '@/components/pageWrap/page.vue'
// import store from './store'

Vue.config.productionTip = false
let router = window.location.href.match(/type2/g) ? router2 : router1
console.log(window.location.host)
Vue.component('page', page)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
