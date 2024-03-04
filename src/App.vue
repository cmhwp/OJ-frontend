<script setup lang="ts">
import BasicLayout from '@/layout/basicLayout.vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user/user'
const router = useRouter()
const loginState = useUserStore()
router.beforeEach((to, from, next) => {
  if (to.meta?.Auth === 'admin') {
    if (loginState.userRole !== 'admin') {
      // 如果用户角色不是管理员，重定向到"/"
      next('/')
    } else {
      // 用户角色是管理员，允许导航到/admin
      next()
    }
  } else {
    // 不需要管理员权限，继续导航
    next()
  }
})
</script>

<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>

<style scoped>
#app {
  background: url('@/assets/image/背景.png');
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}
</style>
