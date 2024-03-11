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
      <copy-right class="copy"></copy-right>
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
#app .copy {
  display: flex;
}
</style>
