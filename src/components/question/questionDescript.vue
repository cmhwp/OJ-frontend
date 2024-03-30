：芥末喂泡泡糖
-->
<template>
  <div style="margin-left: 15px; margin-right: 15px">
    <a-typography>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <a-typography-title :heading="4" style="font-weight: bold; white-space: nowrap">
          {{ props.question.title }}
        </a-typography-title>
        <div v-if="status == 3" style="display: flex; align-items: center; margin-top: 5px">
          <span style="color: #0000008c; white-space: nowrap">已解决</span
          ><img
            style="width: 18px; height: 18px; margin-right: 15px; margin-left: 5px"
            alt="avatar"
            :src="Image6"
          />
        </div>
        <div v-if="status == 2" style="display: flex; align-items: center; margin-top: 5px">
          <span style="color: #0000008c">尝试过</span
          ><img
            style="width: 18px; height: 18px; margin-right: 15px; margin-left: 5px"
            alt="avatar"
            :src="Image3"
          />
        </div>
      </div>
      <a-space
        ><span v-if="props.question.difficulty === 1">
          <a-tag color="gray" style="border-radius: 10px; color: #00af9b">简单</a-tag>
        </span>
        <span v-else-if="props.question.difficulty === 2">
          <a-tag color="gray" style="border-radius: 10px; color: #ffb800">中等</a-tag>
        </span>
        <span v-else-if="props.question.difficulty === 3">
          <a-tag color="gray" style="border-radius: 10px; color: #ff2d55">困难</a-tag>
        </span>
        <a-tag checkable style="border-radius: 10px">
          <icon-tag :size="15" style="margin-right: 5px; transform: scaleX(-1)" />
          相关标签
        </a-tag>
        <a-tag checkable style="border-radius: 10px">
          <icon-bulb :size="15" style="margin-right: 5px" />
          提示
        </a-tag>
      </a-space>
      <div style="margin-left: 2px">
        <a-typography-title :heading="5" style="font-weight: bold"> 判题条件 </a-typography-title>
        <a-descriptions :column="{ xs: 1, md: 2, lg: 3 }">
          <a-descriptions-item label="时间限制:">
            <a-tag color="gray" style="border-radius: 10px">
              {{ props.question.judgeConfig?.timeLimit ?? 0 }} ms
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="内存限制:">
            <a-tag color="gray" style="border-radius: 10px">
              {{ props.question.judgeConfig?.memoryLimit ?? 0 }} MB
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="堆栈限制:">
            <a-tag color="gray" style="border-radius: 10px">
              {{ props.question.judgeConfig?.stackLimit ?? 0 }} K
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <MdView :value="props.question.content || ''" />
    </a-typography>
    <div>
      <a-divider />

      <a-space :size="5" style="height: 20px">
        <p style="color: #262626bf">通过次数</p>
        <b>{{ props.question.acceptedNum }}</b>
        <a-divider direction="vertical" />
        <p style="color: #262626bf">提交次数</p>
        <b>{{ props.question.submitNum }}</b>
        <a-divider direction="vertical" />
        <p style="color: #262626bf">通过率</p>
        <a-statistic
          :value="
            props.question.submitNum
              ? (parseFloat(String(props.question.acceptedNum)) /
                  parseFloat(String(props.question.submitNum))) *
                100
              : 0
          "
          :precision="2"
          :value-style="{
            color: '#262626',
            fontSize: '14px',
            fontWeight: 'bold'
          }"
        >
          <template #suffix>%</template>
        </a-statistic>
      </a-space>
      <a-divider />
      <div>
        <div
          style="display: flex; justify-content: space-between; height: 20px"
          @click="rotateIconTags"
        >
          <div style="display: flex; align-items: center">
            <icon-tag :size="15" style="margin-right: 5px; transform: scaleX(-1)" />
            <span>相关标签</span>
          </div>
          <icon-down
            :size="16"
            class="icon-down"
            :class="{
              'rotate-clockwise': rotatedTags,
              'rotate-counterclockwise': !rotatedTags
            }"
          />
        </div>
        <transition name="tag-list">
          <div v-if="rotatedTags" class="tag-list" ref="tagList">
            <a-space style="margin-left: 18px">
              <a-tag
                v-for="(tag, index) of props.question.tags"
                :key="index"
                color="gray"
                style="border-radius: 10px"
              >
                {{ tag }}
              </a-tag>
            </a-space>
          </div>
        </transition>
      </div>
      <a-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from 'vue'

import { QuestionSubmitControllerService } from '../../../generated'
import { Image3, Image6 } from '@/assets/image/imgExport'

interface Props {
  question?: any
}

const props = withDefaults(defineProps<Props>(), {
  question: () => []
})

const rotatedTags = ref(false)
const rotateIconTags = () => {
  rotatedTags.value = !rotatedTags.value
}

// 获取状态

const status = ref()
const getStatus = async () => {
  const res = await QuestionSubmitControllerService.getQuestionSubmitStatusUsingGet(
    props.question.id
  )
  if (res.code === 0) {
    status.value = res.data
  }
}

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  getStatus()
})
</script>

<style scoped>
.icon-down {
  color: #dfdfdf;
  cursor: pointer;
}

.icon-down:hover {
  color: #c7c7c7;
}

.rotate-clockwise {
  animation: rotateClockwise 0.2s linear forwards;
}

.rotate-counterclockwise {
  animation: rotateCounterclockwise 0.2s linear forwards;
}

@keyframes rotateClockwise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes rotateCounterclockwise {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0);
  }
}

.tag-header {
  display: flex;
  justify-content: space-between;
  height: 20px;
  cursor: pointer;
}

.tag-header-content {
  display: flex;
  align-items: center;
}

.tag-list {
  overflow: hidden;
}

.tag-list-enter-active,
.tag-list-leave-active {
  transition: max-height 0.5s;
}

.tag-list-enter,
.tag-list-leave-to {
  max-height: 0;
}
</style>
