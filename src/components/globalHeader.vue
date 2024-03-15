<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { routes } from '@/router/routes'
import { type RouteRecordRaw, useRouter } from 'vue-router'
import image from '@/assets/image/我家哥哥的蛋.png'
import useUserStore from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import checkAccess from '@/utils/access/checkAccess'
import accessEnum from '@/utils/access/accessEnum'

const selectedKeys = ref<string[]>(['/'])
const router = useRouter()
const show = ref(false)

router.afterEach((to) => {
  selectedKeys.value = [to.path]
  return true // 返回 true 表示允许路由切换，返回 false 表示阻止路由切换
})
const doMenuClick = (key: string) => {
  router.push({
    path: key
  })
}
const goHomePage = () => {
  router.push({
    path: '/'
  })
}
const loginState = useUserStore()
const userInfo = storeToRefs(loginState)
const routeList = ref<RouteRecordRaw[]>([])
const avatar = ref(
  'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
)
const updateRouteList = () => {
  // Update routeList when userRole changes
  routeList.value = routes.filter((route) => {
    // 如果路由设置为不显示，则过滤掉
    if (route.meta?.show === false) return false

    // 如果路由没有定义Auth属性，则默认为可访问
    if (!route.meta?.Auth) return true

    // 检查用户角色是否匹配路由要求的权限
    return checkAccess(userInfo.userRole.value as accessEnum, route.meta?.Auth as accessEnum)
  })
  if (userInfo.userAvatar.value) {
    avatar.value = userInfo.userAvatar.value
  }
}
watch(() => userInfo.userRole.value, updateRouteList)
updateRouteList()
const doRegister = () => {
  router.push({
    path: '/register'
  })
}
const doLogin = () => {
  router.push({
    path: '/user/login'
  })
}
console.log('routeList', routeList)
console.log('userInfo', userInfo)
const smallColor = ref('#737373')

//开关
const handleSwitchClick = (index) => {
  if (index === 0) {
    document.body.setAttribute('arco-theme', 'dark')
  } else if (index === 1) {
    // 执行亮色模式相关操作
    document.body.removeAttribute('arco-theme')
  }
}
</script>

<template>
  <a-row id="global-header" align="center" justify="center" :wrap="false">
    <a-col flex="6">
      <a-menu mode="horizontal" :selectedKeys="selectedKeys" @menu-item-click="doMenuClick">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled
          ><div class="title-bar">
            <img class="logo" :src="image" alt="IKUN OJ" @click="goHomePage" /></div
        ></a-menu-item>
        <a-menu-item class="menu-item" v-for="item in routeList" :key="item.path">{{
          item?.name
        }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="150px">
      <a-space>
        <a-trigger>
          <div class="icon-sun">
            <IconSun style="height: 24px; width: 24px" />
          </div>
          <template #content>
            <div class="theme-select">
              <a-space
                direction="vertical"
                style="display: flex; flex-direction: column; align-items: center"
              >
                <a-list>
                  <a-list>
                    <a-list>
                      <a-list-item
                        style="cursor: pointer"
                        class="list-change"
                        @click="handleSwitchClick(0)"
                        >黑暗模式</a-list-item
                      >
                      <a-list-item
                        style="cursor: pointer"
                        class="list-change"
                        @click="handleSwitchClick(1)"
                        >亮色模式</a-list-item
                      >
                    </a-list>
                  </a-list>
                </a-list>
              </a-space>
            </div>
          </template>
        </a-trigger>
        <div v-if="userInfo.id === ''">
          <span class="registration-text" @click="doRegister">注册</span>
          <a-divider direction="vertical" size="0" :margin="5" />
          <span style="color: #0000008c; font-size: 14px">或</span>
          <a-divider direction="vertical" size="0" :margin="5" />
          <span class="registration-text" @click="doLogin">登录</span>
        </div>
        <div v-else style="margin-left: 10px">
          <a-trigger :popup-translate="[-130, 20]" :popup-visible="show">
            <a-avatar :size="27" style="cursor: pointer" @click="show = !show">
              <img alt="avatar" :src="avatar" />
            </a-avatar>
            <template #content>
              <SetCenter @click="show = !show" />
            </template>
          </a-trigger>
        </div>
      </a-space>
    </a-col>
  </a-row>
</template>

<style scoped>
#global-header {
  background-clip: padding-box;
}

.title-bar {
  display: flex;
  align-items: center;
}
.logo {
  height: 36px;
  cursor: pointer;
}
.registration-text {
  color: #0000008c;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.registration-text:hover {
  color: black;
}

.icon-sun {
  border-radius: 5px;
}

.icon-sun:hover {
  background-color: #e7e7e7;
  color: black;
}
.theme-select {
  box-sizing: border-box;
  width: 100px;
  background-color: #ffffff;
  border-radius: 10px;
}
.list-change:hover {
  background-color: #e7e7e7;
}
</style>
