/* eslint-disable */
import Vue from 'vue'
import Router from '@/common/js/router-esm'
import store from '../store/index.js'
import querystring from 'querystring'
import type1 from './type1'
import type2 from './type2'
import type3 from './type3'
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
  else if (p.match(/entry_id=3/g)) {
    window.localStorage.setItem('entry_id', '3')
    r = type3
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
      case '3':
        r = type3
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
      component: () => import('../views/notFound.vue')
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
    {
      path: '/copyright',
      name: 'copyright',
      meta: {
        title: '服务协议'
      },
      component: () => import('../views/copyright.vue')
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
