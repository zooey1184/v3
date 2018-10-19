import Vue from 'vue'
import App from './App.vue'
import router1 from './type1/router'
import router2 from './type2/router'
// import component1 from './type1/components/index'
// import component2 from './type2/components/index'
import egg from '@/components/index.js'
import store1 from '././type1/store'
import store2 from '././type2/store'
import '@/common/js/global'
Vue.config.productionTip = false

const router = window.location.href.match(/type2/g) ? router2 : router1
const store = window.location.href.match(/type2/g) ? store2 : store1
// const component = window.location.href.match(/type2/g) ? component2 : component1

Vue.use(egg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
