<script setup lang="ts">
import { ref } from 'vue'
import { routes } from '@/router/routes'
import { useRouter } from 'vue-router'
import image from '@/assets/image/我家哥哥的蛋.png'
import useUserStore from '@/stores/user/user'
import { storeToRefs } from 'pinia'

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
        <a-menu-item class="menu-item" v-for="item in routes" :key="item.path">{{
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
