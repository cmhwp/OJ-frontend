import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../views/user/userLoginView.vue')
  },
  {
    path: '/question',
    name: '题库',
    component: () => import('../views/notFound/not-foundView.vue')
  },
  {
    path: '/post',
    name: '讨论',
    component: () => import('../views/notFound/not-foundView.vue')
  },
  {
    path: '/admin',
    name: '管理',
    component: () => import('../views/admin/adminView.vue'),
    meta: {
      //管理员
      Auth: 'admin'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/notFound/not-foundView.vue')
  }
]
