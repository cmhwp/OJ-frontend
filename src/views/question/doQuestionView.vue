<script setup lang="ts">
import Image1 from '@/assets/image/我家哥哥的蛋.png'
import { ref, watchEffect } from 'vue'
import type { QuestionQueryRequest } from '../../../generated'
import { useRoute } from 'vue-router'
const route = useRoute()
const goHomePage = () => {}
// 按钮样式
const buttonStyle = ref({ backgroundColor: '#f0f0f0' })

const handleMouseOver = () => {
  buttonStyle.value.backgroundColor = '#E2E2E2'
}

const handleMouseLeave = () => {
  buttonStyle.value.backgroundColor = '#f0f0f0'
}
// 弹窗
const visible = ref(false)

const handleClick = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}
//抽屉数据
const dataList = ref([])
//list分页
const customPageSizeOptions = ref([20, 40, 60])
const searchParams = ref<QuestionQueryRequest>({
  pageSize: 20,
  current: 1
})
const total = ref(0)
const question = ref()
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}
const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize
  }
}

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  question.value = route.params.id
})
</script>

<template>
  <div style="background-color: #f0f0f0; overflow: hidden">
    <div style="height: 5vh; display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px">
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <img class="logo" :src="Image1" alt="LOGO" @click="goHomePage" />
        <a-divider direction="vertical"></a-divider>
        <a-button
          :style="buttonStyle"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
          @click="handleClick"
        >
          <icon-menu-unfold style="margin-right: 10px" size="20"></icon-menu-unfold>
          题库
          <a-button
            :style="buttonStyle"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
          >
            <icon-launch style="margin: -18px" size="15"></icon-launch>
          </a-button>
        </a-button>
        <a-drawer
          :width="600"
          :visible="visible"
          @cancel="handleCancel"
          :placement="'left'"
          :footer="false"
          unmountOnClose
          :drawer-style="{ borderRadius: '0 15px 15px 0' }"
        >
          <template #title>题目列表</template>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto 15px;
              border-radius: 10px;
            "
          >
            <a-space direction="vertical">
              <a-list
                style="margin-bottom: 25px"
                :data="dataList"
                :hoverable="true"
                :pagination-props="{
                  bufferSize: 3,
                  showJumper: true,
                  showPageSize: true,
                  showTotal: true,
                  pageSizeOptions: customPageSizeOptions,
                  pageSize: searchParams.pageSize,
                  current: searchParams.current,
                  total
                }"
                @page-change="onPageChange"
                @page-size-change="onPageSizeChange"
              ></a-list>
            </a-space>
          </div>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 36px;
  cursor: pointer;
  margin-left: 15px;
}
</style>
