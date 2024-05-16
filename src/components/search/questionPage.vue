<template>
  <div
    style="
      width: 900px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px auto 15px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      overflow: auto; /* 添加这一行以避免斑马纹效果在边缘溢出 */
    "
  >
    <a-space direction="vertical">
      <div style="display: flex; align-items: center; height: 44px; margin-top: 10px">
        <div style="width: 84px; display: flex; margin-left: 20px">状态</div>
        <div style="width: 300px; display: flex">题目</div>
        <div style="width: 136px; display: flex">题解</div>
        <div style="width: 180px; display: flex">通过率</div>
        <div style="width: 148px; display: flex">难度</div>
      </div>
      <a-divider style="margin-top: -10px; margin-bottom: -10px" />
      <a-list
        style="margin-top: -17px; margin-bottom: 15px"
        :data="props.questionList"
        :bordered="false"
        :split="false"
      >
        <template #item="{ item, index }">
          <a-list-item
            :style="{
              background: index % 2 === 1 ? '#F7F8FA' : 'transparent',
              borderRadius: '10px'
            }"
          >
            <a-list-item-meta>
              <template #description>
                <div style="height: 10px; display: flex; align-items: center">
                  <div style="width: 84px; display: flex">
                    <a-trigger auto-fit-position :unmount-on-close="false"
                      ><img
                        style="width: 19px; height: 19px; margin-left: 5px; cursor: pointer"
                        v-if="item.status == 3"
                        alt="avatar"
                        :src="Image6"
                      />
                      <template #content>
                        <div class="adopt-basic">通过</div>
                      </template>
                    </a-trigger>
                    <a-trigger auto-fit-position :unmount-on-close="false">
                      <img
                        style="width: 18px; height: 18px; cursor: pointer; margin-left: 5px"
                        v-if="item.status == 2"
                        alt="avatar"
                        :src="Image3"
                      />
                      <template #content>
                        <div class="Attempted-basic">尝试过</div>
                      </template>
                    </a-trigger>
                  </div>
                  <div style="width: 300px; text-align: left; margin-top: 10px">
                    <a-link :href="`/view/question/${item.id}/description`" :hoverable="false"
                      ><span class="hover-effect">
                        {{ item.title }}
                      </span>
                    </a-link>
                  </div>
                  <div style="width: 136px; display: flex; margin-left: 5px">1</div>
                  <div style="width: 180px; display: flex">
                    <a-statistic
                      :value="
                        item.submitNum
                          ? (parseFloat(item.acceptedNum) / parseFloat(item.submitNum)) * 100
                          : 0
                      "
                      :precision="2"
                      :value-style="{ color: '#262626', fontSize: '14px' }"
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                  </div>
                  <div style="width: 148px; display: flex">
                    <span v-if="item.difficulty === 1" style="color: #00af9b"> 简单 </span>
                    <span v-else-if="item.difficulty === 3" style="color: #ff2d55"> 中等 </span>
                    <span v-else-if="item.difficulty === 2" style="color: #ffb800"> 困难 </span>
                  </div>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
        <template #empty>
          <a-skeleton :animation="true">
            <div
              style="display: flex; align-items: center; height: 42px; width: 100%"
              v-for="index in 50"
              :key="index"
              :style="{
                background: index % 2 === 0 ? '#F7F8FA' : 'transparent',
                borderRadius: '10px'
              }"
            >
              <a-skeleton-shape
                shape="circle"
                size="small"
                style="width: 20px; height: 20px; margin-left: 24px"
              />
              <a-space direction="vertical" size="large" style="width: 250px; margin-left: 60px">
                <a-skeleton-line :rows="1" :line-height="15" />
              </a-space>
              <a-skeleton-shape
                shape="circle"
                size="small"
                style="width: 20px; height: 20px; margin-left: 52px"
              />
              <a-space direction="vertical" size="large" style="width: 100px; margin-left: 115px">
                <a-skeleton-line :rows="1" :line-height="15" />
              </a-space>
              <a-space direction="vertical" size="large" style="width: 100px; margin-left: 82px">
                <a-skeleton-line :rows="1" :line-height="15" />
              </a-space>
            </div>
          </a-skeleton>
        </template>
      </a-list>
    </a-space>
  </div>
  <div
    v-if="props.questionTotal == props.questionList.length && props.questionTotal != 0"
    style="margin-top: 30px; margin-bottom: 600px"
  >
    <span style="color: #76767a">已经到底啦~</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { Image3, Image6 } from '@/assets/image/imgExport'

interface Props {
  questionList: any[]
  questionTotal: number
}

// 从搜索页父组件获取数据
const props = withDefaults(defineProps<Props>(), {
  questionList: () => [],
  questionTotal: () => 0
})
</script>

<style scoped>
.hover-effect {
  color: #262626;
  display: inline-block;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hover-effect:hover {
  color: #3370ff;
  cursor: pointer;
}

.adopt-basic {
  padding: 5px;
  width: 45px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}

.Attempted-basic {
  padding: 5px;
  width: 50px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}
</style>
