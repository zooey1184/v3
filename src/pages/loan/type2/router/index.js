
import Vue from 'vue'
import Router from '@/common/js/router-esm'
import store from '../store/index.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: () => import('../../notFound.vue')
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
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/verify',
      name: 'verify',
      meta: {
        title: '认证授权'
      },
      component: () => import('../views/verify.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('SET_ROUTER', window.directionPage)
  setTimeout(() => {
    next()
  }, 20)
})

export default router
