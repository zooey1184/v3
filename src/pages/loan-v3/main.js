import Vue from 'vue'
import App from './App.vue'
// import router1 from './type1/router'
// import router2 from './type2/router'
import router from './router'
import egg from '@/components/index.js'
import store from './store'
import '@/common/js/global'
Vue.config.productionTip = false
import api from './api'

// const router = window.location.href.match(/type2/g) ? router2 : router1
// const component = window.location.href.match(/type2/g) ? component2 : component1
// Vue.directive('transfer-dom', TransferDom)
// TransferDom(Vue)

Vue.use(egg)
new Vue({
  router,
  store,
  created() {
		let channel = Param.refer || Param.c
		const appMat = /\/app\/(.+)/.exec(location.pathname)
		if(appMat) channel = appMat[1]
		console.log(channel)
		if(channel) localStorage.url_refer = channel
		Param.refer = localStorage.url_refer || 'h5'
		this.getConfig()
  },
  methods: {
		async getConfig() {
			this.$load.show()
			try {
				const logKey = 'logId-' + Param.refer
				const res = await this.$http.get('v6/credit/info/h5-config/' + Param.refer, {
					params: {
						logId: localStorage[logKey],
					}
				})
				const h5Config = res.body
				localStorage[logKey] = h5Config.logId || ''
				this.$store.commit('setData', {
					h5Config,
					// stopInfo: location.host == 'www.newkouzi.com' ? '系统维护中，预计10月14号03:00恢复' : '',
				})
			} catch (e) {
				console.log(e.message)
			}
			this.$load.hide()
		},
	},
  render: h => h(App)
}).$mount('#app')
