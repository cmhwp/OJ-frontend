<template>
  <a-list
    class="list-demo-action-layout"
    item-layout="horizontal"
    :bordered="false"
    :split="false"
    :data="props.postList"
  >
    <template #item="{ item }">
      <div
        style="
          background-color: #ffffff;
          width: 900px;
          height: 184px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px auto 15px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        "
      >
        <a-list-item class="list-demo-item" action-layout="vertical">
          <template #actions>
            <span
              class="action"
              key="heart"
              @click="onLikeChange(item.id)"
              style="margin-left: 10px"
            >
              <span v-if="item.hasThumb == 1">
                <IconHeartFill :style="{ color: '#f53f3f' }" size="15" />
              </span>
              <span v-else>
                <IconHeart size="15" />
              </span>
              {{ item?.thumbNum }}
            </span>
            <span class="action">
              <span>
                <icon-eye size="15" />
              </span>
              {{ item?.readNum }}
            </span>
            <span class="action" key="star" @click="onStarChange(item.id)">
              <span v-if="item.hasFavour == 1">
                <IconStarFill
                  :style="{
                    color: '#ffb400'
                  }"
                  size="15"
                />
              </span>
              <span v-else>
                <IconStar size="15" />
              </span>
              {{ item.favourNum }}
            </span>
            <span class="action" key="reply"><IconMessage />评论</span>
          </template>
          <template #extra>
            <div class="image-area" v-if="item.cover">
              <img
                alt="arco-design"
                :src="item.cover"
                style="border-radius: 10px; width: 100%; height: 100%; object-fit: cover"
              />
            </div>
          </template>
          <a-list-item-meta>
            <template #title>
              <h3 class="item-title" style="margin-top: -5px">
                {{ item.title }}
              </h3>
            </template>
            <template #description>
              <a-space wrap align="start" class="item-tags">
                <a-tag v-for="(tag, index) of item.tagList" :key="index" color="cyan">
                  {{ tag }}
                </a-tag>
              </a-space>
              <p
                class="item-description"
                @click="handleItemClick(item.id)"
                v-html="highlightSearchText(item.content)"
              ></p>
            </template>
            <template #avatar>
              <a-avatar
                shape="square"
                style="margin-left: 15px; margin-top: -60px"
                :image-url="item.user?.userAvatar"
              >
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </div>
    </template>
    <template #empty>
      <div
        v-for="index in 20"
        :key="index"
        style="
          background-color: #ffffff;
          width: 900px;
          height: 184px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px auto 15px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        "
      >
        <a-skeleton :animation="true">
          <div style="display: flex; width: 100%">
            <a-skeleton-shape style="margin-right: 10px; width: 45px; height: 42px" />
            <a-space direction="vertical" :style="{ width: '600px' }" size="large">
              <a-skeleton-line :rows="5" />
            </a-space>
            <a-skeleton-shape style="margin-left: 20px; width: 200px; height: 160px" />
          </div>
        </a-skeleton>
      </div>
    </template>
  </a-list>
  <div
    v-if="props.postTotal == props.postList.length && props.postTotal != 0"
    style="margin-top: 30px; margin-bottom: 500px"
  >
    <span style="color: #76767a">已经到底啦~</span>
  </div>
  <!--    <div style="display: flex; justify-content: flex-end; height: 100px">-->
  <!--      <a-pagination-->
  <!--        :total="total"-->
  <!--        show-jumper-->
  <!--        show-page-size-->
  <!--        @change="onPageChange"-->
  <!--        @pageSizeChange="onPageSizeChange"-->
  <!--        :pageSizeOptions="customPageSizeOptions"-->
  <!--        :current="current"-->
  <!--        :page-size="pageSize"-->
  <!--        :page-item-style="{ borderRadius: '5px', backgroundColor: '#F2F3F4' }"-->
  <!--        :active-page-item-style="{-->
  <!--          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',-->
  <!--          backgroundColor: '#FFFFFF',-->
  <!--          color: '#1a1a1a',-->
  <!--          borderRadius: '5px',-->
  <!--        }"-->
  <!--      >-->
  <!--        <template #page-item="{ page }"> {{ page }}</template>-->
  <!--        <template #page-item-step="{ type }">-->
  <!--          <icon-right-->
  <!--            :style="-->
  <!--              type === 'previous' ? { transform: `rotate(180deg)` } : undefined-->
  <!--            "-->
  <!--          />-->
  <!--        </template>-->
  <!--        <template #page-item-ellipsis>-->
  <!--          <icon-sun-fill />-->
  <!--        </template>-->
  <!--      </a-pagination>-->
  <!--    </div>-->
</template>

<script setup lang="ts">
import {
  PostFavourControllerService,
  PostReadControllerService,
  PostThumbControllerService
} from '../../../generated'
import { defineProps, withDefaults } from 'vue'
import message from '@arco-design/web-vue/es/message'
import router from '@/router'

interface Props {
  postList: any[]
  postTotal: number
  searchText: string
}

/**
 * 从搜索页父组件获取数据
 */
const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
  postTotal: () => 0,
  searchText: ''
})

const highlightSearchText = (content: string): string => {
  const searchText = props.searchText.trim().toLowerCase()
  if (!searchText) return content

  const regex = new RegExp(searchText, 'ig')
  return content.replace(regex, (match) => `<span class="highlight">${match}</span>`)
}

// 点爱心
const onLikeChange = async (postId: number) => {
  const res = await PostThumbControllerService.doThumbUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    const index = props.postList.findIndex((item) => item.id === postId)
    if (index !== -1) {
      const post = props.postList[index]
      post.thumbNum += res.data === 1 ? 1 : -1
      post.hasThumb = res.data
    }
  } else {
    message.error('点赞失败：' + res.message)
  }
}

/**
 * 收藏
 * @param postId
 */
const onStarChange = async (postId: number) => {
  const res = await PostFavourControllerService.doPostFavourUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    const index = props.postList.findIndex((item) => item.id === postId)
    if (index !== -1) {
      const post = props.postList[index]
      post.favourNum += res.data === 1 ? 1 : -1
      post.hasFavour = res.data
    }
  } else {
    message.error('收藏失败：' + res.message)
  }
}

const onEyeChange = async (postId: number) => {
  const res = await PostReadControllerService.doPostReadUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    const index = props.postList.findIndex((item) => item.id === postId)
    if (index !== -1) {
      const post = props.postList[index]
      post.readNum += 1
    }
  } else {
    message.error('浏览失败：' + res.message)
  }
}

const handleItemClick = async (id: number) => {
  await router.push({
    path: '/post/detail',
    query: {
      id: id
    }
  })
  await onEyeChange(id)
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
  font-weight: normal; /* 去掉加粗 */
  margin-bottom: 2px; /* 调整标题与描述之间的底部间距 */
}

.list-demo-item .item-description {
  max-width: 620px;
  height: 45px;
  text-align: left;
  margin-top: -2px; /* 调整上边距为负值 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 最大显示行数 */
  line-clamp: 2; /* 最大显示行数 */
  color: #3c3c4399;
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

.highlight {
  background-color: yellow; /* Change this to the desired highlight color */
  font-weight: bold; /* Optionally make the text bold */
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
