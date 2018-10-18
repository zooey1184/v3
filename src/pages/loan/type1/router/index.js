import Vue from 'vue'
import Router from '@/common/js/router-esm'
import store from '../store/index.js'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: ()=> import ('../view/NotFound.vue')
    // },
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/basic',
      name: 'basic',
      component: () => import('../views/basic.vue')
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
