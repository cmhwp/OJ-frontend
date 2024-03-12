<script setup lang="ts">
import BasicLayout from '@/layout/basicLayout.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
/**
 * 全局初始化函数，有全局单次调用的代码，都可以写在这里
 */
const doInit = () => {
  console.log('欢迎来到 OJ 项目')
}

onMounted(() => {
  doInit()
})
</script>

<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user') || route.path.startsWith('/view')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style scoped>
#app {
  background-color: #fff;
}
</style>
