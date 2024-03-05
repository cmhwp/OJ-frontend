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
}
watch(() => userInfo.userRole.value, updateRouteList)
updateRouteList()
console.log('routeList', routeList)
console.log('userInfo', userInfo)
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
    <a-col flex="100px">
      <div>{{ userInfo.userName?.value ?? '未登录' }}</div>
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
</style>
