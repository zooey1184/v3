const router = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '贷贷贷'
    },
    component: () => import('../type2/views/home.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    meta: {
      title: '认证授权'
    },
    component: () => import('../type2/views/verify.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '认证结果'
    },
    component: () => import('../type2/views/result.vue')
  }
]
export default router
