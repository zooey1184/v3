import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
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
