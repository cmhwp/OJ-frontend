<template>
  <div id="PostView">
    <a-row>
      <a-col :span="15">
        <div style="width: 760px; margin-left: auto">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <a-menu
              mode="horizontal"
              :default-selected-keys="['1']"
              style="margin-left: -40px"
              :style="{ width: `300px` }"
            >
              <a-menu-item key="1">最热 </a-menu-item>
              <a-menu-item key="2">最新 </a-menu-item>
              <a-menu-item key="3">推荐 </a-menu-item>
            </a-menu>
            <div style="display: flex; margin-right: 5px">
              <a-input-search
                style="width: 230px; border: 1px solid #dfdfdf; margin-right: 10px"
                placeholder="搜索"
              />
              <a-button
                @click="handlePostClick"
                style="width: 100px"
                type="primary"
                status="success"
                shape="round"
                >发起讨论
                <template #icon>
                  <icon-edit :size="18" />
                </template>
              </a-button>
            </div>
          </div>
          <a-space style="height: 50px">
            <a-tag
              :color="showTags.includes(item) ? '#165dff' : 'gray'"
              :checkable="true"
              :checked="true"
              @click="doTagCheck(item)"
              style="border-radius: 10px"
              v-for="(item, index) in searchTags"
              :key="index"
              ><span
                :style="{
                  color: showTags.includes(item) ? '#F7F8FA' : '#165dff'
                }"
                >{{ item }}
              </span></a-tag
            >
          </a-space>
          <a-list
            class="list-demo-action-layout"
            item-layout="horizontal"
            :bordered="false"
            :split="false"
            :data="dataList"
            v-if="isShow"
          >
            <template #item="{ item }">
              <div
                style="
                  background-color: #ffffff;
                  width: 750px;
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
                      {{ item.thumbNum }}
                    </span>
                    <span class="action">
                      <span>
                        <icon-eye size="15" />
                      </span>
                      {{ item.readNum }}
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
                    <span class="action" key="reply"> <IconMessage /> 评论 </span>
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
                        <a-tag
                          v-for="(tag, index) of item.tagList"
                          :key="index"
                          :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                          style="border-radius: 10px"
                        >
                          {{ tag }}
                        </a-tag>
                      </a-space>
                      <p class="item-description" @click="handleItemClick(item.id)">
                        {{ item.summary }}
                      </p>
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
                  width: 750px;
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
                    <a-space direction="vertical" :style="{ width: '450px' }" size="large">
                      <a-skeleton-line :rows="5" />
                    </a-space>
                    <a-skeleton-shape style="margin-left: 20px; width: 200px; height: 160px" />
                  </div>
                </a-skeleton>
              </div>
            </template>
          </a-list>
          <div style="height: 100px" v-if="isShow">
            <a-pagination
              :total="total"
              :base-size="5"
              :buffer-size="2"
              show-jumper
              show-page-size
              @change="onPageChange"
              @pageSizeChange="onPageSizeChange"
              :pageSizeOptions="customPageSizeOptions"
              :current="current"
              :page-size="pageSize"
              :page-item-style="{
                borderRadius: '5px',
                backgroundColor: '#F2F3F4'
              }"
              :active-page-item-style="{
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#FFFFFF',
                color: '#1a1a1a',
                borderRadius: '5px'
              }"
            >
              <template #page-item="{ page }"> {{ page }}</template>
              <template #page-item-step="{ type }">
                <icon-right
                  :style="type === 'previous' ? { transform: `rotate(180deg)` } : undefined"
                />
              </template>
              <template #page-item-ellipsis>
                <icon-more :stroke-width="5" />
              </template>
            </a-pagination>
          </div>
          <a-empty v-if="!isShow"></a-empty>
        </div>
      </a-col>
      <a-col :span="9">
        <div style="margin-left: 10px">
          <div style="margin-top: 20px; margin-bottom: 10px">
            <a-space :size="42">
              <a-space :direction="'vertical'" :size="1">
                <icon-star style="color: #87878c" :size="26" />
                <span style="font-size: 13px; color: #262626bf">收藏</span>
              </a-space>
              <a-space :direction="'vertical'" :size="1">
                <icon-notification style="color: #87878c" :size="26" />
                <span style="font-size: 13px; color: #262626bf">订阅</span>
              </a-space>
              <a-space :direction="'vertical'" :size="1">
                <icon-message style="color: #87878c" :size="26" />
                <span style="font-size: 13px; color: #262626bf">讨论</span>
              </a-space>
              <a-space :direction="'vertical'" :size="1">
                <icon-book style="color: #87878c" :size="26" />
                <span style="font-size: 13px; color: #262626bf">文章</span>
              </a-space>
            </a-space>
          </div>
          <div
            style="
              min-width: 250px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
              border-radius: 6px;
              position: fixed;
              background-color: #ffffff;
              padding: 16px 16px 4px;
            "
          >
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span style="color: #262626bf">必读榜</span>
              <a-space>
                <a-button shape="round" size="mini" type="text"
                  ><span style="color: #262626bf">日</span></a-button
                >
                <a-button shape="round" size="mini" type="text"
                  ><span style="color: #262626bf">周</span></a-button
                >
                <a-button shape="round" size="mini" type="text"
                  ><span style="color: #262626bf">月</span></a-button
                >
              </a-space>
            </div>
            <a-list :bordered="false" :data="list" :split="false">
              <template #item="{ item }">
                <a-list-item>
                  <a-list-item-meta>
                    <template #avatar>
                      <a-avatar
                        :image-url="item.user?.userAvatar"
                        :size="22"
                        style="margin-top: -20px"
                      >
                      </a-avatar>
                    </template>
                    <template #title>
                      <h4
                        class="item-title"
                        style="
                          max-width: 160px;
                          display: -webkit-box;
                          margin-left: -10px;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          -webkit-line-clamp: 1;
                          line-clamp: 1;
                          font-weight: normal;
                          margin-top: -10px;
                          margin-bottom: -10px;
                        "
                      >
                        {{ item.title }}
                      </h4>
                    </template>
                    <template #description>
                      <p
                        style="
                          max-width: 200px;
                          margin-left: -40px;
                          margin-bottom: -15px;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          -webkit-line-clamp: 1; /* 最大显示行数 */
                          line-clamp: 1; /* 最大显示行数 */
                          color: #3c3c434d;
                        "
                      >
                        {{ item.content }}
                      </p>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'
import {
  PostControllerService,
  PostFavourControllerService,
  type PostQueryRequest,
  PostThumbControllerService
} from '../../../generated'

const route = useRoute()
const router = useRouter()
//是否有数据
const isShow = ref(true)

// 设置每页的页数
const customPageSizeOptions = ref([10, 15, 20])

// 根据标签搜索
const showTags = ref<string[]>([])

const searchTags = ['Java', '面经', '面试经验', '求职求助', 'C++', '校招', 'C', 'Python']

interface PostItem {
  id: number
  title: string
  content: string
  cover: string
  userId: number
  tagList: string[]
  userAvatar: string
  hasThumb: boolean
  favourNum: number
  hasFavour: boolean
  thumbNum: number
}

const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 15)

const searchParams = ref<PostQueryRequest>({
  sortOrder: 'descend',
  sortField: 'createTime',
  searchText: '',
  pageSize: pageSize.value,
  current: current.value
})
const handlePostClick = () => {
  router.push({
    path: 'user/addPost'
  })
  console.log('handlePostClick')
}
const dataList = ref<PostItem[]>([])

const total = ref()

const loadData = async () => {
  const res = await PostControllerService.listPostVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    console.log(res)
    total.value = res.data.total as number
    // 判断是否有数据
    if (res.data.total === '0') {
      console.log('没有数据')
      isShow.value = false
    } else {
      isShow.value = true
    }
    console.log(isShow.value)
  } else {
    message.error('加载失败：' + res.message)
  }
}

const list = ref([])

const listParams = ref<PostQueryRequest>({
  sortOrder: 'descend',
  sortField: 'createTime',
  pageSize: 10,
  current: 1
})

// 榜单信息
const listData = async () => {
  const res = await PostControllerService.listPostVoByPageUsingPost(listParams.value)
  if (res.code === 0) {
    list.value = res.data.records
  } else {
    message.error('加载失败：' + res.message)
  }
}

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.searchText
  } as never
  loadData()
  listData()
})

/**
 * 页面加载时，请求数据
 */
// onMounted(() => {
//   loadData()
// })

const doTagCheck = (tag: string) => {
  searchParams.value = {
    ...searchParams.value
  }
  if (!showTags.value.includes(tag)) {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = []
      }

      showTags.value.push(tag)
      searchParams.value.tags.push(tag)
    }
  } else {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = []
      }
      showTags.value = showTags.value.filter((t) => t !== tag)
      searchParams.value.tags = searchParams.value.tags.filter((t) => t !== tag)
    }
  }
}

// 点爱心
const onLikeChange = async (postId: number) => {
  const res = await PostThumbControllerService.doThumbUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    const index = dataList.value.findIndex((item) => item.id === postId)
    if (index !== -1) {
      const post = dataList.value[index]
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
    const index = dataList.value.findIndex((item) => item.id === postId)
    if (index !== -1) {
      const post = dataList.value[index]
      post.favourNum += res.data === 1 ? 1 : -1
      post.hasFavour = res.data
    }
  } else {
    message.error('收藏失败：' + res.message)
  }
}

// 切换当前页码
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  current.value = page
  router.push({
    query: searchParams.value
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
// 切换每页显示条数
const onPageSizeChange = (Size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: Size
  }
  pageSize.value = Size
  router.push({
    query: searchParams.value
  })
}
//跳转到帖子详情页面
const handleItemClick = (id: number) => {
  router.push({
    path: '/post/detail',
    query: {
      id: id
    }
  })
}
</script>

<style scoped>
#PostView {
  background-color: rgb(var(--color-bg-1));
  margin: 90px 10px 20px 100px;
}

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
  max-width: 470px;
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

.css-1tphb23-basicStyle-ImgWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 160px;
  height: 100%;
  border-radius: 8px;
  padding: 12px 0 0 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  background: white;
  color: #262626bf;
}

.css-1tphb23-basicStyle-ImgWrapper-active {
  color: white;
  background: linear-gradient(rgb(56, 151, 255), rgb(0, 122, 255));
}

.css-kv2vx8-basicStyle-ImgWrapper {
  color: #262626bf;
  width: 154px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  align-items: center;
  padding: 0 10px 0 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>
