const router = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '申请借款'
    },
    component: () => import('../views/type3/home.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    meta: {
      title: '认证授权'
    },
    component: () => import('../views/type3/verify.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '认证结果'
    },
    component: () => import('../views/type3/result.vue')
  }
]
export default router
