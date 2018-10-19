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
      meta: {
        title: '贷贷贷'
      },
      component: () => import('../views/home.vue')
    },
    {
      path: '/basic',
      name: 'basic',
      meta: {
        title: '基本信息'
      },
      component: () => import('../views/basic.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {
        title: '联系人信息'
      },
      component: () => import('../views/contact.vue')
    },
    {
      path: '/zhima',
      name: 'zhima',
      meta: {
        title: '芝麻信用'
      },
      component: () => import('../views/zhima.vue')
    },
    {
      path: '/operator',
      name: 'operator',
      meta: {
        title: '运营商'
      },
      component: () => import('../views/operation.vue')
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
