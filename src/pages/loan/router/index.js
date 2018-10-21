/* eslint-disable */
import Vue from 'vue'
import Router from '@/common/js/router-esm'
import store from '../store/index.js'
import querystring from 'querystring'
import type1 from './type1'
import type2 from './type2'
let p = window.location.href
let r = type1
if(p.match(/entry_id=/g)) {
  if(p.match(/entry_id=2/g)) {
    window.localStorage.setItem('entry_id', '2')
    r = type2
  }else if(p.match(/entry_id=1/g)) {
    window.localStorage.setItem('entry_id', '1')
    r = type1
  }
}else {
  let local_s = window.localStorage.getItem('entry_id')
  if(local_s) {
    switch (local_s) {
      case '1':
        r = type1
        break;
      case '2':
        r = type2
        break;
      default: r = type1
        break;
    }
  }
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: () => import('../notFound.vue')
    },
    {
      path: '/',
      name: 'h',
      redirect: '/home'
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/home'
    },
    ...r
  ]
})
router.beforeEach((to, from, next) => {
  if (!window.Param) {
		window.Param = { ...querystring.parse(), ...to.query } // 分别为井号前后的链接参数
		const ua = window.navigator.userAgent
		if (/iPhone|iPad/i.test(ua)) {
			Param.plat = 1
			Param.isIos = true
		} else if (/android/i.test(ua)) Param.plat = 2
		Param.inWechat = /MicroMessenger/i.test(ua)
		Vue.prototype.$Param = Param
	}
  store.commit('SET_ROUTER', window.directionPage)
  setTimeout(() => {
    next()
  }, 20)
})

export default router
