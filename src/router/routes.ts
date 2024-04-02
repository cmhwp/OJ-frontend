import type { RouteRecordRaw } from 'vue-router'
import accessEnum from '@/utils/access/accessEnum'
import AccessEnum from '@/utils/access/accessEnum'

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
    component: () => import('../views/question/questionsView.vue')
  },
  {
    path: '/post',
    name: '讨论',
    component: () => import('../views/post/postView.vue')
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
    path: '/add/question',
    name: '创建题目',
    component: () => import('../views/question/addQuestionView.vue'),
    meta: {
      Auth: accessEnum.ADMIN
    }
  },
  {
    path: '/manage/question',
    name: '题目管理',
    component: () => import('../views/question/manageQuestionView.vue'),
    meta: {
      Auth: accessEnum.ADMIN
    }
  },
  {
    path: '/update/question',
    name: '更新题目',
    component: () => import('../views/question/addQuestionView.vue'),
    meta: {
      Auth: accessEnum.ADMIN,
      show: false
    }
  },
  {
    path: '/do/question/:id/:category?/:questionSubmitId?',
    name: '在线做题',
    component: () => import('../views/question/doQuestionView.vue'),
    props: true,
    meta: {
      Auth: accessEnum.USER,
      show: false
    }
  },
  {
    path: '/personal/center',
    name: '用户中心',
    component: () => import('../views/user/userSettingView.vue'),
    meta: {
      Auth: AccessEnum.USER,
      show: false
    }
  },
  {
    path: '/personal/homepage',
    name: '个人主页',
    component: () => import('../views/user/userCenterView.vue'),
    meta: {
      Auth: AccessEnum.USER,
      show: false
    }
  },
  {
    path: '/user/addPost',
    name: '发帖',
    component: () => import('../views/post/addPostView.vue'),
    meta: {
      Auth: AccessEnum.USER,
      show: false
    }
  },
  {
    path: '/manage/submit_question',
    name: '提交管理',
    component: () => import('../views/question/questionSubmitView.vue'),
    meta: {
      Auth: AccessEnum.ADMIN,
      show: true
    }
  },
  {
    path: '/post/detail',
    name: '发帖详情',
    component: () => import('../views/post/postDetail.vue'),
    meta: {
      Auth: AccessEnum.USER,
      show: false
    }
  },
  {
    path: '/manage/user',
    name: '用户管理',
    component: () => import('../views/user/manageUserView.vue'),
    meta: {
      Auth: AccessEnum.ADMIN,
      show: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/notFound/not-foundView.vue')
  }
]
