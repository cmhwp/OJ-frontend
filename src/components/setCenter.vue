<script setup lang="ts">
import { Image8, Image9, Image10, Image11, Image12, Image13 } from '@/assets/image/imgExport'
import { ref, computed } from 'vue'
import useUserStore from '@/stores/user/user'
import router from '@/router'

const userAvatar = ref(
  'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
)
const loginUser = useUserStore()
const avatar = computed(() => {
  if (loginUser.userAvatar) {
    return loginUser.userAvatar
  }
  return userAvatar.value
})
const userName = loginUser.userName
const id = loginUser.id
//用户中心
const goHome = async () => {
  console.log('个人主页')
  await router.push({
    name: '个人主页',
    params: { id: id }
  })
  await window.location.reload()
}
//账号设置
const goCenter = () => {
  router.push({
    path: '/personal/center'
  })
}

//退出登录
const doLogout = async () => {
  const userStore = useUserStore()
  userStore.logoutAction()
}
</script>

<template>
  <div>
    <a-space direction="vertical" :size="10" style="color: black">
      <div class="avatar-wrapper">
        <img :src="avatar" alt="" class="round-avatar" @click="goHome" />
        <div style="display: flex; flex-direction: column; align-items: flex-start; width: 180px">
          <span @click="goHome" class="username">{{ userName }}</span>
          <a-progress :percent="0.2" :show-text="false" />
        </div>
      </div>
      <a-grid :cols="3" :colGap="18" :rowGap="18">
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image9" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">收藏夹</span>
          </div>
        </a-grid-item>
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image11" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">笔记本</span>
          </div>
        </a-grid-item>
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image8" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">我的题解</span>
          </div>
        </a-grid-item>
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image13" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">做题分析</span>
          </div>
        </a-grid-item>
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image10" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">积分</span>
          </div>
        </a-grid-item>
        <a-grid-item class="grid-item">
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer">
            <img :src="Image12" alt="收藏夹" style="width: 42px" />
            <span style="font-size: 12px; color: #0000008c">进度管理</span>
          </div>
        </a-grid-item>
      </a-grid>
      <div class="container" @click="goCenter">
        <icon-account-setting
          color="#969696"
          size="20"
          style="margin-left: 10px; margin-right: 15px; stroke: currentColor; stroke-width: 8px"
        />
        <span style="color: #0000008c; margin-top: 3px">账号设置</span>
      </div>
      <div class="container" @click="doLogout">
        <icon-drop-out
          color="#969696"
          size="20"
          style="margin-left: 10px; margin-right: 15px; stroke: currentColor; stroke-width: 8px"
        />
        <span style="color: #0000008c; margin-top: 3px">退出</span>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.avatar-wrapper {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: flex-start;
}

.round-avatar {
  border-radius: 50%; /* 将图片设为圆形 */
  width: 66px; /* 图片宽度 */
  height: 66px; /* 图片高度 */
  margin-right: 15px; /* 图片右侧留出一些间距 */
  cursor: pointer;
}

.username {
  font-weight: bold; /* 设置字体加粗 */
  font-size: 20px; /* 设置字体大小为16像素 */
  cursor: pointer;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #0000000a;
  width: 86px;
  height: 86px;
}

.grid-item:hover {
  background-color: #f0f0f0;
}

.container {
  height: 41px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.container:hover {
  background-color: #f7f7f8;
}
</style>
