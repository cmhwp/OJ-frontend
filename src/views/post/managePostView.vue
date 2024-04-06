<script setup lang="ts">
import {
  PostControllerService,
  PostReplyControllerService,
  type PostVO,
  type User
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watchEffect } from 'vue'
import moment from 'moment/moment'

const route = useRoute()
const router = useRouter()

const dataList = ref([])
const total = ref(0)

const customPageSizeOptions = ref([10, 20, 30])
const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 20)
const sortField = ref(route.query.sortField as string)
const sortOrder = ref(route.query.sortOrder as string)
const searchParams = ref({
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || 'createTime',
  sortOrder: sortOrder.value || 'descend'
})

const loadData = async () => {
  const res = await PostControllerService.listPostVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    console.log(res)
    total.value = res.data.total
  } else {
    message.error('加载失败：' + res.message)
  }
}

const columns = [
  {
    title: '标题',
    slotName: 'title'
  },

  {
    title: '话题',
    slotName: 'topic'
  },
  {
    title: '标签',
    slotName: 'tags',
    width: 200
  },
  {
    title: '内容',
    slotName: 'content'
  },
  {
    title: '封面',
    slotName: 'cover'
  },
  {
    title: '点赞数',
    slotName: 'thumbNum'
  },
  {
    title: '收藏数',
    slotName: 'favourNum'
  },
  {
    title: '阅读数',
    slotName: 'readNum'
  },
  {
    title: '回复数',
    slotName: 'replyNum'
  },
  {
    title: '创建者',
    slotName: 'creator'
  },
  {
    title: '创建时间',
    slotName: 'createTime'
  },
  {
    title: '更新时间',
    slotName: 'updateTime'
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center'
  }
]

const handleSortChange = (dataIndex: string, direction: string) => {
  if (!direction) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: undefined,
      sortField: undefined
    }
  } else if (dataIndex == 'title') {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: direction,
      sortField: 'id'
    }
  } else {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: direction,
      sortField: dataIndex
    }
  }
  router.push({
    query: searchParams.value as any
  })
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
})

// 行选择
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})

//  选中的行
const selectedKeys = ref([])

// 删除帖子和帖子回复
const doDelete = async (postVO: PostVO) => {
  const resOne = await PostControllerService.deletePostUsingPost({
    id: postVO.id
  })
  if (resOne.code === 0) {
    message.success('删除成功！')
    await loadData()
  } else {
    message.error('删除失败：' + resOne.message)
  }
  const resTwo = await PostReplyControllerService.deletePostReplyUsingPost({
    id: postVO.id
  })
  if (resTwo.code === 0) {
    message.success('删除成功！')
    await loadData()
  } else {
    message.error('删除失败：' + resTwo.message)
  }
}

const doForbidden = async (user: User) => {
  const res = await PostControllerService.updatePostUsingPost({
    id: user.id,
    status: 'ban'
  })
  if (res.code === 0) {
    message.success('禁用成功！')
    await loadData()
  } else {
    message.error('禁用失败：' + res.message)
  }
}
const doRelieve = async (user: User) => {
  const res = await PostControllerService.updatePostUsingPost({
    id: user.id,
    status: 'allow'
  })
  if (res.code === 0) {
    message.success('解封成功！')
    await loadData()
  } else {
    message.error('解封失败：' + res.message)
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
    query: searchParams.value as any
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
    query: searchParams.value as any
  })
}

// 将搜索框上的内容同步到url上
const searchText = ref(route.query.searchText)
const formattedSearchText: string = typeof searchText.value === 'string' ? searchText.value : ''

// 查询
const onSearch = (value: string) => {
  value = value.trim() // 过滤掉空格
  if (value) {
    router.push({
      query: {
        ...(searchParams.value as any),
        searchText: value,
        current: 1
      }
    })
  } else {
    router.push({
      query: {
        pageSize: searchParams.value.pageSize,
        current: searchParams.value.current
      }
    })
  }
}

// 搜索栏一键删除
const onClear = () => {
  router.push({
    query: {
      ...(searchParams.value as any),
      searchText: undefined,
      current: 1
    }
  })
}
</script>

<template>
  <div id="MenagePostView">
    <div style="height: 50px">
      <a-space :size="20">
        <a-input
          allow-clear
          :default-value="formattedSearchText"
          style="border-radius: 5px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)"
          :style="{ width: '250px' }"
          placeholder="请输入标题或内容！"
          @input="onSearch"
          @clear="onClear"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-space>
    </div>
    <div style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)">
      <a-table
        :columns="columns as any"
        :data="dataList"
        :bordered="false"
        :hoverable="true"
        :pagination="false"
        @sorter-change="handleSortChange"
        :row-selection="rowSelection as any"
        row-key="id"
        v-model:selectedKeys="selectedKeys"
      >
        <template #title="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="left"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px">ID: {{ record.id }}</span></template
            >
            <span style="margin-left: 5px">{{ record.title }}</span>
          </a-tooltip>
        </template>
        <template #content="{ record }">
          <a-trigger position="right" v-if="record.content">
            <div>
              <icon-content size="20" style="cursor: pointer; margin-top: 10px" />
            </div>
            <template #content>
              <div class="content-basic">
                <MdView
                  :value="record.content"
                  style="width: 800px; height: 500px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
        </template>
        <template #cover="{ record }">
          <a-image v-if="record.cover" :width="66" :src="record.cover" />
          <div
            v-else
            style="
              width: 66px;
              height: 66px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <icon-exclamation-circle :size="20" />
          </div>
        </template>
        <template #tags="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px"
              v-for="(tag, index) of record.tagList ? record.tagList.slice(0, 6) : []"
              :key="index"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #topic="{ record }">
          <div style="display: flex; align-items: center">
            <icon-topic :size="20" />
            <span style="margin-left: 3px; margin-top: 2px"> {{ record.topic }}</span>
          </div>
        </template>
        <template #thumbNum="{ record }">
          <div style="display: flex; align-items: center">
            <icon-thumb-up :size="20" />
            <span style="margin-left: 3px; margin-top: 3px; white-space: nowrap">
              {{ record.thumbNum }}</span
            >
          </div>
        </template>
        <template #favourNum="{ record }">
          <div style="display: flex; align-items: center">
            <icon-heart :size="20" />
            <span style="margin-left: 3px; margin-top: 3px; white-space: nowrap">
              {{ record.favourNum }}</span
            >
          </div>
        </template>
        <template #readNum="{ record }">
          <div style="display: flex; align-items: center">
            <icon-eye :size="20" />
            <span style="margin-left: 3px; margin-top: 3px; white-space: nowrap">
              {{ record.readNum }}</span
            >
          </div>
        </template>
        <template #replyNum="{ record }">
          <div style="display: flex; align-items: center">
            <icon-message :size="20" />
            <span style="margin-left: 3px; margin-top: 3px; white-space: nowrap">
              {{ record.replyNum }}</span
            >
          </div>
        </template>
        <template #creator="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="left"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px"
                >用户ID: {{ record.userId }}</span
              ></template
            >
            <div style="cursor: pointer; display: flex; align-items: center">
              <a-avatar :size="24" :image-url="record?.user?.userAvatar"
                ><img
                  class="round-avatar"
                  alt="avatar"
                  src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              /></a-avatar>
              <span v-if="record.user?.userName" style="margin-left: 5px">{{
                record.user?.userName
              }}</span>
              <span v-else style="margin-left: 5px"> 未命名用户 </span>
            </div>
          </a-tooltip>
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format('YYYY-MM-DD') }}
        </template>
        <template #updateTime="{ record }">
          {{ moment(record.updateTime).format('YYYY-MM-DD') }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              v-if="record.status == 'allow'"
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              status="warning"
              @click="doForbidden(record)"
            >
              禁用
            </a-button>
            <a-button
              v-else
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              status="success"
              @click="doRelieve(record)"
            >
              允许
            </a-button>
            <a-popconfirm content="确定要删除此条数据！" @ok="doDelete(record)" position="top">
              <a-button
                style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
                type="outline"
                status="danger"
              >
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 25px">
      <a-pagination
        :total="total"
        show-total
        show-jumper
        show-page-size
        @change="onPageChange"
        @pageSizeChange="onPageSizeChange"
        :pageSizeOptions="customPageSizeOptions"
        :current="current"
        :page-size="pageSize"
        :page-item-style="{ borderRadius: '5px', backgroundColor: '#F2F3F4' }"
        :active-page-item-style="{
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFFF',
          color: '#1a1a1a',
          borderRadius: '5px'
        }"
      >
        <template #page-item="{ page }"> {{ page }}</template>
        <template #page-item-step="{ type }">
          <icon-right :style="type === 'previous' ? { transform: `rotate(180deg)` } : undefined" />
        </template>
        <template #page-item-ellipsis>
          <icon-sun-fill />
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<style scoped>
#MenagePostView {
  margin: 90px 20px 20px 20px;
}

.content-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
}
</style>
