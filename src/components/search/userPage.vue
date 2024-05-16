<template>
  <a-list
    class="list-demo-action-layout"
    :grid-props="{ gutter: [0, 0], sm: 24, md: 16, lg: 12, xl: 8 }"
    :bordered="false"
    :split="false"
    :data="props.userList"
    :showSizeChanger="true"
  >
    <template #item="{ item }">
      <div class="avatar-container">
        <div class="avatar-top">
          <a-avatar
            :image-url="item?.userAvatar"
            style="width: 60px; height: 60px; cursor: pointer; margin-right: 12px"
            @click="handleClick(item?.id)"
          ></a-avatar>
          <div class="avatar-name">
            <div class="avatar-name-detail">
              <div style="flex: 1 1 auto; min-width: 0px">
                <div class="avatar-name-top">
                  <div class="avatar-name-top-left">
                    <div class="avatar-name-top-left-name">
                      <span
                        style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          font-weight: 500;
                          line-height: 20px;
                          cursor: pointer;
                          color: rgba(38, 38, 38, 1);
                          font-size: 14px;
                        "
                        v-html="highlightKeyword(item?.userName, props.searchText)"
                      ></span>
                    </div>
                    <span
                      style="
                        position: relative;
                        display: inline-block;
                        user-select: none;
                        line-height: 12px;
                        margin-left: 8px;
                      "
                    >
                      <svg
                        width="32"
                        height="14"
                        viewBox="0 0 32 14"
                        fill="rgba(var(--dsw-brand-orange-light-rgb), 1)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.187.677C3.563.247 4.105 0 4.674 0h7.121c.57 0 1.111.247 1.487.677l2.694 3.085c.666.763.657 1.91-.023 2.662L9.7 13.348a1.97 1.97 0 01-2.929 0L.516 6.424a2.007 2.007 0 01-.022-2.662L3.187.677z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M5.005 5.83l2.479 2.817a1 1 0 001.501 0l2.48-2.817a.5.5 0 00-.376-.83H5.38a.5.5 0 00-.375.83z"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.187.677C3.563.247 4.105 0 4.674 0h20.44C28.918 0 32 3.134 32 7s-3.083 7-6.886 7H7.756l-.068-.077c-.34-.098-.66-.29-.918-.575L.516 6.424A1.997 1.997 0 01.008 5.26L0 5.25l.007-.007c-.043-.523.12-1.06.487-1.481L3.187.677zm1.714 1.319a.5.5 0 00-.376.171L2.273 4.746a.5.5 0 00.005.664l5.586 6.183a.5.5 0 00.742 0L14.19 5.41a.5.5 0 00.006-.664l-2.252-2.579a.5.5 0 00-.377-.171H4.901z"
                        ></path>
                      </svg>
                      <span class="avatar-name-level">L9</span>
                    </span>
                  </div>
                  <div
                    style="
                      display: flex;
                      -webkit-box-align: center;
                      align-items: center;
                      color: rgba(60, 60, 67, 0.3);
                      font-size: 12px;
                      flex-shrink: 0;
                      margin-left: 16px;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      class="css-8er82g css-1rhb60f-Svg ea8ky5j0"
                      style="margin-right: 3px"
                    >
                      <path
                        d="M6.486 5.5a.986.986 0 00-.986.986v7.596a.986.986 0 101.972 0V6.486a.986.986 0 00-.986-.986z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M9.472 5.5a1 1 0 00-1 1v7.576a.992.992 0 101.984 0v-2.512h2.008c1.045 0 1.924-.225 2.545-.758.637-.546.919-1.34.919-2.286 0-.94-.279-1.729-.913-2.27-.62-.529-1.496-.75-2.539-.75H9.472zm.984 4.212v-2.36h1.96c.635 0 .995.125 1.199.3l.012.01.013.01c.166.124.304.364.304.848 0 .474-.134.734-.313.888-.21.172-.58.304-1.215.304h-1.96z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>{{ item?.address ?? '未知IP' }}</span>
                  </div>
                </div>
                <div class="avatar-name-center">
                  <span style="font-size: 12px; line-height: 16px; color: rgba(89, 89, 89, 1)"
                    >全站排名
                    <span style="color: rgba(0, 175, 155, 1)">9999+</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="avatar-profile">
              {{ item?.userProfile ?? '该用户未设置个人简介' }}
            </div>
          </div>
        </div>
        <div class="avatar-center">
          <div
            class="avatar-center-line"
            style="flex: 1 1 auto; position: relative; cursor: default"
          >
            <div class="avatar-read">关注</div>
            <div class="avatar-num">{{ item?.concernNum }}</div>
          </div>
          <div
            class="avatar-center-line"
            style="flex: 1 1 auto; position: relative; cursor: default"
          >
            <div class="avatar-read">粉丝</div>
            <div class="avatar-num">{{ item?.fansNum }}</div>
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <div style="display: flex" v-for="index in 20" :key="index">
        <div
          v-for="index in 3"
          :key="index"
          style="
            background-color: #ffffff;
            width: 400px;
            height: 130px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px auto 15px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          "
        >
          <a-skeleton :animation="true">
            <div style="display: flex">
              <a-skeleton-shape
                :shape="'circle'"
                style="margin-right: 20px; width: 85px; height: 85px"
              />
              <a-space direction="vertical" :style="{ width: '250px' }" size="large">
                <a-skeleton-line :rows="3" />
              </a-space>
            </div>
          </a-skeleton>
        </div>
      </div>
    </template>
  </a-list>
  <div
    v-if="props.userTotal == props.userList.length && props.userTotal != 0"
    style="margin-top: 30px; margin-bottom: 700px"
  >
    <span style="color: #76767a">已经到底啦~</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

interface Props {
  userList: any[]
  userTotal: number
  searchText: string
}

// 从搜索页父组件获取数据

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
  userTotal: () => 0,
  searchText: () => ''
})

const handleClick = async (id: number) => {
  await router.push({
    name: '个人主页',
    params: { id: id }
  })
  await window.location.reload()
}
const highlightKeyword = (text: any, searchText: string) => {
  if (!text || !searchText) return text
  const regex = new RegExp(`(${searchText})`, 'gi')
  return text.replace(regex, '<span style="color: red">$1</span>')
}
</script>

<style scoped>
.list-demo-action-layout .image-area {
  width: 190px;
  height: 150px;
  border-radius: 2px;
  overflow: hidden; /* 限制图片溢出容器 */
  margin-right: 18px;
  margin-top: 10px;
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.list-demo-item .item-title {
  text-align: left;
  margin-bottom: 2px; /* 调整标题与描述之间的底部间距 */
}

.list-demo-item .item-description {
  height: 20px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1; /* 最大显示行数 */
  line-clamp: 1; /* 最大显示行数 */
  color: #61666d;
}

.item-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.list-demo-action-layout .arco-list-item {
  border-radius: 4px;
}

.action:hover {
  background: var(--color-fill-3);
}
.avatar-container {
  width: 260px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
}
.avatar-top {
  width: 100%;
  display: flex;
}
.avatar-name {
  flex: 1 1 auto;
  height: 100%;
  min-width: 0px;
}
.avatar-name-detail {
  width: 100%;
  display: flex;
}
.avatar-name-top {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.avatar-name-top-left {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: start;
  min-width: 0px;
}
.avatar-name-top-left-name {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.avatar-name-level {
  color: rgba(255, 255, 255, 1);
  font-family: TypoRound, serif;
  position: absolute;
  right: 4px;
  top: 1px;
  font-size: 12px;
  transform: scale(calc(0.916667));
}
.avatar-name-center {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 7px;
}
.avatar-profile {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  color: rgba(191, 191, 191, 1);
  margin-top: 4px;
  text-align: left;
}
.avatar-center {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 12px -9px 0px;
}
.avatar-center-line:not(:last-of-type)::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: 0px;
  width: 1px;
  height: 26px;
  transform: translateY(-50%);
  background: rgba(240, 240, 240, 1);
}
.avatar-read {
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: rgba(38, 38, 38, 0.75);
  white-space: nowrap;
}
.avatar-num {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  color: rgba(38, 38, 38, 1);
}
.avatar-bottom {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 12px;
}
.avatar-concern {
  line-height: 20px;
  border: none;
  outline: none;
  user-select: none;
  text-decoration: none;
  padding: 0px;
  margin: 0px;
  width: 60px;
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  background: rgba(0, 122, 255, 1);
  cursor: pointer;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 32px;
  flex: 1 1 0%;
  font-size: 14px;
  font-weight: 500;
}
.avatar-concern:hover {
  opacity: 0.8;
}
.avatar-concerned {
  line-height: 20px;
  border: none;
  outline: none;
  user-select: none;
  text-decoration: none;
  padding: 0px;
  margin: 0px;
  width: 60px;
  border-radius: 5px;
  background: rgba(0, 10, 32, 0.05);
  color: rgba(38, 38, 38, 0.75);
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  height: 32px;
  flex: 1 1 0%;
  font-size: 14px;
  font-weight: 500;
}
</style>
