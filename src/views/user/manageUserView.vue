<script setup lang="ts">
import { type User, UserControllerService } from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watchEffect } from 'vue'
import moment from 'moment/moment'
import IconCompany from '@/components/calendar/icon/icon-company.vue'

const route = useRoute()
const router = useRouter()

const dataList = ref([])
const total = ref(0)

const customPageSizeOptions = ref([20, 50, 100])
const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 50)
const sortField = ref(route.query.sortField as string)
const sortOrder = ref(route.query.sortOrder as string)
const searchParams = ref({
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || undefined,
  sortOrder: sortOrder.value || undefined
})

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败：' + res.message)
  }
}

const columns = [
  {
    title: '昵称',
    slotName: 'userName'
  },
  {
    title: '性别',
    align: 'center',
    slotName: 'gender',
    width: '60'
  },
  {
    title: '技能标签',
    slotName: 'tags'
  },
  {
    title: '个性简介',
    align: 'center',
    slotName: 'userProfile'
  },
  {
    title: '个人网站',
    align: 'center',
    slotName: 'websites'
  },
  {
    title: 'GitHub',
    slotName: 'gitHubName'
  },
  {
    title: '地址',
    slotName: 'address'
  },
  {
    title: '就读学校',
    slotName: 'school'
  },
  {
    title: '公司',
    slotName: 'company'
  },
  {
    title: '角色',
    slotName: 'userRole'
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
    query: searchParams.value as never
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

// 删除用户
const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id
  })
  if (res.code === 0) {
    message.success('删除成功！')
    await loadData()
  } else {
    message.error('删除失败：' + res.message)
  }
}

const doForbidden = async (user: User) => {
  const res = await UserControllerService.updateUserUsingPost({
    id: user.id,
    userRole: 'ban'
  })
  if (res.code === 0) {
    message.success('封号成功！')
    await loadData()
  } else {
    message.error('封号失败：' + res.message)
  }
}
const doRelieve = async (user: User) => {
  const res = await UserControllerService.updateUserUsingPost({
    id: user.id,
    userRole: 'user'
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
  <div id="MenageUserView">
    <div style="height: 50px">
      <a-space :size="20">
        <a-input
          allow-clear
          :default-value="formattedSearchText"
          style="border-radius: 5px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)"
          :style="{ width: '250px' }"
          placeholder="请输入昵称、账号或ID！"
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
        <template #websites="{ record }">
          <a-trigger position="right" v-if="record.websites">
            <div>
              <icon-content size="20" style="cursor: pointer; margin-top: 10px" />
            </div>
            <template #content>
              <div class="content-basic">
                <a-space direction="vertical">
                  <a :href="record.websites" target="_blank">
                    {{ record.websites }}
                  </a>
                </a-space>
              </div>
            </template>
          </a-trigger>
          <icon-exclamation-circle v-else :size="20" />
        </template>
        <template #userProfile="{ record }">
          <a-trigger position="right" v-if="record.userProfile">
            <div>
              <icon-content size="20" style="cursor: pointer; margin-top: 10px" />
            </div>
            <template #content>
              <div class="content-basic">
                <MdView
                  :value="record.userProfile"
                  style="width: 300px; height: 125px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
          <icon-exclamation-circle v-else :size="20" />
        </template>
        <template #gender="{ record }">
          <a-space wrap style="margin-top: 10px">
            <span v-if="record.gender === 1" style="color: #ff74d0">
              <icon-woman :size="20" />
            </span>
            <span v-else-if="record.gender === 0" style="color: #007aff">
              <icon-man :size="20" />
            </span>
            <icon-exclamation-circle v-else :size="20" />
          </a-space>
        </template>
        <template #gitHubName="{ record }">
          <div v-if="record.gitHubName">
            <icon-github :size="20" />
            <span style="margin-left: 3px"> {{ record.gitHubName }}</span>
          </div>
          <icon-exclamation-circle v-else :size="20" />
        </template>
        <template #school="{ record }">
          <div v-if="record.school" style="display: flex; align-items: center">
            <icon-school :size="20" />
            <span style="margin-left: 3px; margin-top: 3px"> {{ record.school }}</span>
          </div>
          <icon-exclamation-circle v-else :size="20" />
        </template>
        <template #address="{ record }">
          <div v-if="record.address" style="display: flex; align-items: center">
            <icon-location :size="20" />
            <span style="margin-left: 3px"> {{ record.address }}</span>
          </div>
          <icon-exclamation-circle v-else :size="20" />
        </template>
        <template #userRole="{ record }">
          <a-space wrap style="margin-top: 10px">
            <div
              v-if="record.userRole === 'admin'"
              style="color: #f53f3f; display: flex; align-items: center"
            >
              <icon-user :size="20" />
              <span style="margin-left: 3px; margin-top: 3px">管理员</span>
            </div>
            <div
              v-else-if="record.userRole === 'user'"
              style="color: #165dff; display: flex; align-items: center"
            >
              <icon-user :size="20" />
              <span style="margin-left: 3px; margin-top: 3px">普通用户</span>
            </div>
            <div
              v-else-if="record.userRole === 'ban'"
              style="color: #f53f3f; display: flex; align-items: center"
            >
              <icon-stop :size="20" />
              <span style="margin-left: 3px; margin-top: 3px">禁用</span>
            </div>
          </a-space>
        </template>
        <template #tags="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px"
              v-for="(tag, index) of record.tags ? JSON.parse(record.tags) : ['未设置']"
              :key="index"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #userName="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="right"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content>
              <a-space direction="vertical"
                ><span style="color: black; font-size: 13px">账号: {{ record?.userAccount }}</span>
                <span style="color: black; font-size: 13px">ID: {{ record?.id }}</span>
                <span style="color: black; font-size: 13px"
                  >生日: {{ moment(record?.birthday).format('YYYY-MM-DD') }}</span
                ></a-space
              >
            </template>
            <div style="cursor: pointer; display: flex; align-items: center">
              <a-avatar :size="24" :image-url="record?.userAvatar"></a-avatar>
              <span style="margin-left: 5px">{{ record?.userName }}</span>
            </div>
          </a-tooltip>
        </template>
        <template #company="{ record }">
          <a-tooltip
            v-if="record.company"
            background-color="#FFFFFF"
            position="right"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content>
              <div style="display: flex; align-items: center">
                <icon-position />
                <span style="color: black; font-size: 13px">职位: {{ record?.position }}</span>
              </div>
            </template>
            <div style="display: flex; align-items: center">
              <icon-company :size="18" />
              <span style="cursor: pointer; margin-left: 3px; margin-top: 3px">{{
                record?.company
              }}</span>
            </div>
          </a-tooltip>
          <icon-exclamation-circle v-else :size="20" />
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
              v-if="record.userRole != 'ban'"
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              status="warning"
              @click="doForbidden(record)"
              :disabled="record.userRole == 'admin'"
            >
              封号
            </a-button>
            <a-button
              v-else
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              status="success"
              @click="doRelieve(record)"
            >
              解封
            </a-button>
            <a-popconfirm content="确定要删除此条数据！" @ok="doDelete(record)" position="top">
              <a-button
                style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
                type="outline"
                status="danger"
                :disabled="record.userRole == 'admin'"
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
#MenageUserView {
  margin: 90px 20px 20px 20px;
}

.content-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
}
</style>
