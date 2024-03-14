<script setup lang="ts">
import Image1 from '@/assets/image/我家哥哥的蛋.png'
import { ref, watchEffect, onMounted } from 'vue'
import { QuestionControllerService, type QuestionQueryRequest } from '../../../generated'
import { useRoute } from 'vue-router'
import message from '@arco-design/web-vue/es/message'
import router from '@/router'
const route = useRoute()
import useUserStore from '@/stores/user/user'

const loginUser = useUserStore()
const userAvatar = loginUser.userAvatar
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
// 获取数据
const loadData = async () => {
  //抽屉数据
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('数据加载失败,请稍后重试:' + res.message)
  }
  console.log(res)
}
onMounted(() => {
  loadData()
})
//处理链接跳转
const handleLinkClick = (id: any) => {
  console.log(id)
  router.push({
    path: `/do/question/${id}/description`
  })
  visible.value = false
}
//处理运行代码
const handleRunCode = () => {
  console.log('运行代码')
}
//提交代码
const handleSubmitCode = () => {
  console.log('提交代码')
}
//提交数
const submitNumber = ref(0)
//颜色
const color = ref('#737373')
const smallColor = ref('#737373')
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
              >
                <template #item="{ item }">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #description>
                        <div style="height: 18px; display: flex; align-items: center">
                          <div style="width: 480px; display: flex">
                            <a-link style="color: #262626" @click="handleLinkClick(item.id)"
                              >{{ item.title }}
                            </a-link>
                          </div>
                          <div style="width: 30px; display: flex">
                            <span v-if="item.difficulty === 1" style="color: #00af9b"> 简单 </span>
                            <span v-else-if="item.difficulty === 3" style="color: #ff2d55">
                              中等
                            </span>
                            <span v-else-if="item.difficulty === 2" style="color: #ffb800">
                              困难
                            </span>
                          </div>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </a-space>
          </div>
        </a-drawer>
        <a-button>
          <icon-left />
        </a-button>
        <a-button>
          <icon-right />
        </a-button>
      </div>
      <div style="height: 100%; display: flex; justify-content: center; align-items: center">
        <button @click="handleRunCode" :class="{ runButton: true }">
          <icon-run size="18" color="#686868" style="margin-right: 7px"></icon-run>
          <span style="color: #1a1a1a">运行</span>
        </button>
        <button @click="handleSubmitCode" :class="{ submitButton: true }">
          <icon-submit size="22" color="#02b128" style="margin-right: 7px"></icon-submit>
          <span style="color: #02b128">提交</span>
        </button>
      </div>
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          margin-right: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        "
      >
        <div
          class="icon-css-samll"
          @mouseover="smallColor = 'black'"
          @mouseout="smallColor = '#737373'"
        >
          <icon-small-bell
            size="20"
            :color="smallColor"
            style="stroke: currentColor; stroke-width: 15px"
          />
        </div>
        <div class="icon-css" @mouseover="color = 'black'" @mouseout="color = '#737373'">
          <icon-flame size="20" :color="color" style="stroke: currentColor; stroke-width: 15px" />
          <span style="font-weight: bold; margin-left: 5px; margin-right: 5px; font-size: 16px">{{
            submitNumber
          }}</span>
        </div>
        <div>
          <a-trigger :pup-translate="[-140, 15]" trigger="hover">
            <a-avatar :size="30">
              <img v-if="userAvatar" alt="avatar" :src="userAvatar" />
              <img
                v-else
                alt="avatar"
                src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <set-center></set-center>
            </template>
          </a-trigger>
        </div>
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
.runButton {
  background-color: #e7e7e7;
  border-radius: 5px 0 0 5px; /* 设置圆角大小 */
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #f0f0f0;
}

.runButton:hover {
  background-color: #e2e2e2;
}
.submitButton {
  border-radius: 0 5px 5px 0; /* 设置圆角大小 */
  background-color: #e7e7e7;
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.submitButton:hover {
  background-color: #e2e2e2;
}
</style>
