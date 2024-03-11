import type { RouteRecordRaw } from 'vue-router'
import accessEnum from '@/utils/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户',
    component: () => import('../layout/userLayout.vue'),
    children: [
      { path: 'login', name: '登录', component: () => import('../views/user/userLoginView.vue') },
      {
        path: 'register',
        name: '注册',
        component: () => import('../views/user/userRegisterView.vue')
      },
      {
        path: 'userInfo',
        name: '用户信息',
        component: () => import('../views/user/userInfoView.vue')
      }
    ],
    meta: {
      show: false
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../views/notFound/not-foundView.vue')
  },
  {
    path: '/question',
    name: '题库',
    component: () => import('../views/notFound/not-foundView.vue'),
    meta: {
      Auth: accessEnum.USER
    }
  },
  {
    path: '/post',
    name: '讨论',
    component: () => import('../views/notFound/not-foundView.vue'),
    meta: {
      Auth: accessEnum.USER
    }
  },
  {
    path: '/admin',
    name: '管理',
    component: () => import('../views/admin/adminView.vue'),
    meta: {
      //管理员
      Auth: accessEnum.ADMIN
    }
  },
  {
    path: '/hide',
    name: '隐藏',
    component: () => import('../views/admin/adminView.vue'),
    meta: {
      //隐藏
      show: false,
      Auth: accessEnum.USER
    }
  },
  {
    path: '/add/question',
    name: '创建题目',
    component: () => import('../views/question/addQuestionView.vue'),
    meta: {
      access: accessEnum.ADMIN
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/notFound/not-foundView.vue')
  }
]
