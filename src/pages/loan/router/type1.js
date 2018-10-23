const router = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '贷贷贷'
    },
    component: () => import('../type1/views/home.vue')
  },
  {
    path: '/basic',
    name: 'basic',
    meta: {
      title: '基本信息'
    },
    component: () => import('../type1/views/basic.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: '联系人信息'
    },
    component: () => import('../type1/views/contact.vue')
  },
  {
    path: '/zhima',
    name: 'zhima',
    meta: {
      title: '芝麻信用'
    },
    component: () => import('../type1/views/zhima.vue')
  },
  {
    path: '/operator',
    name: 'operator',
    meta: {
      title: '运营商'
    },
    component: () => import('../type1/views/operation.vue')
  },
  {
    path: '/photo',
    name: 'photo',
    meta: {
      title: '身份证拍照'
    },
    component: () => import('../type1/views/photo.vue')
  },
  {
    path: '/fail',
    name: 'fail',
    meta: {
      title: '认证结果'
    },
    component: () => import('../type1/views/fail.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '认证结果'
    },
    component: () => import('../contain/result.vue')
  }
]
export default router
