const router = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '申请借款'
    },
    component: () => import('../views/type2/home.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    meta: {
      title: '认证授权'
    },
    component: () => import('../views/type2/verify.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '认证结果'
    },
    component: () => import('../views/type2/result.vue')
  }
]
export default router
