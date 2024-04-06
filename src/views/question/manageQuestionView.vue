<template>
  <div id="menageQuestionView">
    <a-trigger
      v-if="selectedKeys.length != 0"
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible2"
    >
      <div
        style="background-color: #165dff"
        :class="`button-trigger ${popupVisible2 ? 'button-trigger-active' : ''}`"
      >
        <IconClose v-if="popupVisible2" />
        <icon-up v-else />
      </div>
      <template #content>
        <a-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <a-menu-item key="1" @click="handleDelete">
            <template #icon>
              <icon-delete />
            </template>
            删除所选行
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger>
    <div style="height: 50px">
      <a-space :size="20">
        <a-trigger position="bl" :popup-visible="displayedDifficulty">
          <a-button
            style="
              width: 103px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            "
            @click="rotateIconDifficulty"
            >难度
            <icon-down
              :size="16"
              :class="{
                'rotate-clockwise': rotatedDifficulty,
                'rotate-counterclockwise': !rotatedDifficulty
              }"
            />
          </a-button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn" @click="doDifficulty(1)">
                <span style="color: #00af9b">简单</span>
                <img v-if="tag === 1" :src="trueImage" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doDifficulty(2)">
                <span style="color: #ffb800">中等</span>
                <img v-if="tag === 2" :src="trueImage" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doDifficulty(3)">
                <span style="color: #ff2d55">困难</span>
                <img v-if="tag === 3" :src="trueImage" alt="" class="small-image" />
              </button>
            </div>
          </template>
        </a-trigger>
        <a-trigger
          trigger="click"
          :unmount-on-close="false"
          position="bl"
          @hide="closeTags"
          @show="showTag"
        >
          <a-button
            style="
              width: 103px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            "
            @click="rotateIconTag"
            >标签
            <a-tag
              v-if="showTags.length != 0"
              color="#D9DBDE"
              style="color: #262626bf; border-radius: 100%; transform: scale(0.8)"
              >{{ showTags.length }}
            </a-tag>
            <icon-down
              :size="16"
              :class="{
                'rotate-clockwise': rotatedTag,
                'rotate-counterclockwise': !rotatedTag
              }"
            />
          </a-button>
          <template #content>
            <div
              style="
                margin-top: 4px;
                padding: 10px;
                width: 300px;
                height: 472px;
                background-color: var(--color-bg-popup);
                border-radius: 4px;
                box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
                text-align: center;
              "
            >
              <a-input
                v-model:value="Tag"
                style="border-radius: 5px; margin-bottom: 10px"
                :style="{ width: '300px' }"
                placeholder="筛选标签"
                allow-clear
                @input="selectTags"
                @clear="closeTagsList"
              >
                <template #prefix>
                  <icon-search />
                </template>
              </a-input>
              <div style="width: 310px; height: 400px" class="outer-div">
                <div style="text-align: left; margin-bottom: 10px">
                  <a-tag
                    checkable
                    :checked="true"
                    style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                    v-for="(tag, index) of selectTagsList"
                    :key="index"
                    :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                    @click="doTagCheck(tag)"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">基本</span>
                    <icon-down
                      @click="doBasicIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': basicIcon,
                        'rotate-counterclockwise': !basicIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of basicTags.slice(0, basicTagsNum)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">算法</span>
                    <icon-down
                      @click="doAlgorithmIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': algorithmIcon,
                        'rotate-counterclockwise': !algorithmIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of algorithmTags.slice(0, algorithmTagsNum)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">基础数据结构</span>
                    <icon-down
                      @click="doDate_StructureIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': date_StructureIcon,
                        'rotate-counterclockwise': !date_StructureIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of date_StructureTags.slice(0, date_StructureTagsNum)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">高级数据结构</span>
                    <icon-down
                      @click="doAdvanced_Date_StructureIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': advanced_Date_StructureIcon,
                        'rotate-counterclockwise': !advanced_Date_StructureIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of advanced_Date_StructureTags.slice(
                        0,
                        advanced_Date_StructureTagsNun
                      )"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">技巧</span>
                    <icon-down
                      @click="doSkillTagsIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': skillIcon,
                        'rotate-counterclockwise': !skillIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of skillTags.slice(0, skillTagsNun)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">数学</span>
                    <icon-down
                      @click="doArithTagsIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': arithIcon,
                        'rotate-counterclockwise': !arithIcon
                      }"
                    />
                  </div>
                  <div style="display: flex; flex-wrap: wrap; align-items: center; width: 300px">
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of arithTags.slice(0, arithTagsNun)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical">
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="color: #262626bf">其他</span>
                    <icon-down
                      @click="doOtherTagsIcon"
                      style="color: #636c7b; cursor: pointer"
                      :class="{
                        'rotate-clockwise': otherIcon,
                        'rotate-counterclockwise': !otherIcon
                      }"
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;
                      width: 300px;
                      margin-bottom: 10px;
                    "
                  >
                    <a-tag
                      checkable
                      :checked="true"
                      style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                      v-for="(tag, index) of otherTags.slice(0, otherTagsNun)"
                      :key="index"
                      :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
              </div>
              <a-divider style="margin-top: 1px; margin-bottom: 10px" />
              <div style="display: flex; align-items: center; justify-content: space-between">
                <span v-if="!isALLShow" style="color: #007aff; cursor: pointer" @click="allShow"
                  >展开全部</span
                >
                <span v-else style="color: #007aff; cursor: pointer" @click="allShow"
                  >收起全部</span
                >
                <div style="color: #3c3c4399">
                  <icon-loop size="16" style="cursor: pointer" @click="resettingTags" />
                  <span style="cursor: pointer" @click="resettingTags">重置</span>
                </div>
              </div>
            </div>
          </template>
        </a-trigger>
        <a-input
          allow-clear
          :default-value="formattedSearchText"
          style="border-radius: 5px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)"
          :style="{ width: '250px' }"
          placeholder="请输入题目、编号或用户ID！"
          @input="onSearch"
          @clear="onClear"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-space>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        height: 30px;
        margin-top: -10px;
      "
    >
      <div>
        <a-tag
          closable
          v-if="tag === 1"
          style="
            color: #00af9b;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeDifficulty"
          >简单
        </a-tag>
        <a-tag
          closable
          v-if="tag === 2"
          style="
            color: #ffb800;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeDifficulty"
          >中等
        </a-tag>
        <a-tag
          closable
          v-if="tag === 3"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeDifficulty"
          >困难
        </a-tag>
        <a-tag
          closable
          style="
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          v-for="(tag, index) of showTags"
          :key="index"
          @close="closeTag(tag)"
        >
          {{ tag }}
        </a-tag>
      </div>
      <a-tag
        v-if="tag != 0 || showTags.length != 0"
        style="border-radius: 15px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); cursor: pointer"
        @click="resettingAll"
      >
        <span style="color: #3c3c4399"
          ><icon-loop :size="16" style="margin-right: 2px" />重置</span
        ></a-tag
      >
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
        <template #difficulty="{ record }">
          <a-space wrap style="margin-top: 10px">
            <span v-if="record.difficulty === 1" style="color: #00af9b"> 简单 </span>
            <span v-else-if="record.difficulty === 2" style="color: #ffb800"> 中等 </span>
            <span v-else-if="record.difficulty === 3" style="color: #ff2d55"> 困难 </span>
          </a-space>
        </template>
        <template #passRate="{ record }">
          <a-statistic
            :value="record.passRate"
            :precision="2"
            :value-from="0"
            :start="true"
            animation
            style="transform: scale(0.65); margin-left: -15px"
          >
            <template #prefix>
              <icon-arrow-rise />
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </template>
        <template #title="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="right"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px">题目ID: {{ record.id }}</span></template
            >
            <span style="cursor: pointer">{{ record.title }}</span>
          </a-tooltip>
        </template>
        <template #content="{ record }">
          <a-trigger position="right">
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
        <template #answer="{ record }">
          <a-trigger position="right">
            <div>
              <icon-content size="20" style="cursor: pointer; margin-top: 10px" />
            </div>
            <template #content>
              <div class="content-basic">
                <MdView
                  :value="record.answer"
                  style="width: 800px; height: 500px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
        </template>
        <template #tags="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px"
              v-for="(tag, index) of JSON.parse(record.tags)"
              :key="index"
              :color="showTags.includes(tag) ? '#165dff' : ''"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #judgeConfig="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px; width: 80px"
              v-for="(judgeConfig, index) of JSON.parse(record.judgeConfig)"
              :key="index"
            >
              <template #icon>
                <icon-execute-time
                  v-if="index.toString() === 'timeLimit'"
                  size="16"
                  style="margin-top: 6px"
                />
                <icon-cpu v-if="index.toString() === 'memoryLimit'" style="margin-top: 6px" />
                <icon-storage-place
                  v-if="index.toString() === 'stackLimit'"
                  style="margin-top: 6px"
                />
              </template>
              {{ judgeConfig }}
              <span v-if="index.toString() === 'timeLimit'">ms</span>
              <span v-if="index.toString() === 'memoryLimit'">MB</span>
              <span v-if="index.toString() === 'stackLimit'">KB</span>
            </a-tag>
          </a-space>
        </template>
        <template #judgeCase="{ record }">
          <a-trigger position="right">
            <div>
              <icon-content size="20" style="cursor: pointer; margin-top: 10px" />
            </div>
            <template #content>
              <div class="content-basic">
                <a-space direction="vertical">
                  <a-tag
                    style="border: 1px solid #ccc; border-radius: 10px"
                    v-for="(judgeCase, index) of JSON.parse(record.judgeCase)"
                    :key="index"
                  >
                    <span style="width: 250px">输入用例：{{ judgeCase.input }}</span>
                    <span style="margin-left: 10px; width: 250px"
                      >输出用例：{{ judgeCase.output }}</span
                    >
                  </a-tag>
                </a-space>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #userId="{ record }">
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
              <a-avatar :size="24" :image-url="record.userAvatar"></a-avatar>
              <span style="margin-left: 5px">{{ record.userName }}</span>
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
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              @click="doUpdate(record)"
            >
              编辑
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

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import {
  type Question,
  QuestionControllerService,
  type QuestionQueryRequest,
  UserControllerService
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment/moment'
import trueImage from '@/assets/image/对.png'
const route = useRoute()

interface UserItem {
  id: number
  userAvatar: string
  userName: string
  userId: number
}

const dataList = ref<UserItem[]>([])
const total = ref(0)

const customPageSizeOptions = ref([20, 50, 100])

const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 50)
const sortField = ref(route.query.sortField as string)
const sortOrder = ref(route.query.sortOrder as string)

const searchParams = ref<QuestionQueryRequest>({
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || undefined,
  sortOrder: sortOrder.value || undefined
})

// 行选择
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})
//  选中的行
const selectedKeys = ref([])

/**
 * 排序
 * @param dataIndex 排序字段
 * @param direction 排序顺序
 */
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

// 删除所有搜索条件
const resettingAll = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined
  }
  showTags.value = []
  searchParams.value.tags = []
  tag.value = 0
}

// 关闭难度标签
const closeDifficulty = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined
  }
  tag.value = 0
}

// 关闭标签 标签
const closeTag = (tag: string) => {
  searchParams.value = {
    ...searchParams.value
  }
  if (searchParams.value) {
    if (!searchParams.value.tags) {
      searchParams.value.tags = []
    }
    showTags.value = showTags.value.filter((t) => t !== tag)
    searchParams.value.tags = searchParams.value.tags.filter((t) => t !== tag)
  }
}

const tag = ref(0)
const Tag = ref('')

// 根据标签搜索
const showTags = ref<string[]>([])

// 旋转参数
const rotatedDifficulty = ref(false)
const rotatedState = ref(false)
const rotatedTag = ref(false)
// 显示参数
const displayedDifficulty = ref(false)
const displayedStatus = ref(false)

// 开启标签按钮时关闭其他按钮
const showTag = () => {
  rotatedState.value = false
  displayedStatus.value = false
  rotatedDifficulty.value = false
  displayedDifficulty.value = false
}

// 关闭时转动标签Icon图标
const closeTags = () => {
  rotatedTag.value = false
}

const rotateIconTag = () => {
  rotatedTag.value = !rotatedTag.value
}

const basicTags = [
  '数组',
  '字符串',
  '排序',
  '矩阵',
  '模拟',
  '枚举',
  '字符串匹配',
  '桶排序',
  '计数排序',
  '基数排序'
]
const algorithmTags = [
  '动态规划',
  '贪心',
  '深度优先搜索',
  '二分查找',
  '广度优先搜索',
  '回溯',
  '递归',
  '分治',
  '记忆化搜索',
  '归并排序',
  '快速选择'
]

const date_StructureTags = [
  '哈希表',
  '数',
  '二叉树',
  '栈',
  '堆（优先队列）',
  '图',
  '链表',
  '单调栈',
  '有序集合',
  '二叉搜索树',
  '队列',
  '拓扑排序',
  '最短路',
  '单调队列',
  '双向链表',
  '最小生成树',
  '强连通分量',
  '欧拉回路',
  '双连通分量'
]

const advanced_Date_StructureTags = ['并查集', '字典树', '线段树', '树状数组', '后缀数组']

const skillTags = [
  '双指针',
  '位运算',
  '前缀和',
  '滑动窗口',
  '计数',
  '状态压缩',
  '哈希函数',
  '滚动哈希',
  '扫描线'
]

const arithTags = [
  '数学',
  '数论',
  '几何',
  '组合数学',
  '博弈',
  '随机化',
  '概率与统计',
  '水塘抽样',
  '拒绝采样'
]

const otherTags = ['数据库', '设计', '数据流', '脑筋急转弯', '交互', '迭代器', '多线程', 'Shell']

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

// 标签搜索清除按钮
const closeTagsList = () => {
  selectTagsList.value = []
}
// 查询标签链表
const selectTagsList = ref<string[]>([])
// 查询标签列表
const selectTags = (value: string) => {
  if (value) {
    console.log('tag数据:', value)
    const searchTerm = value
    const filteredBasicTags = basicTags.filter((basicTag) => basicTag.includes(searchTerm))
    const filteredAlgorithmTags = algorithmTags.filter((algorithmTag) =>
      algorithmTag.includes(searchTerm)
    )
    const filteredDate_StructureTags = date_StructureTags.filter((date_StructureTag) =>
      date_StructureTag.includes(searchTerm)
    )
    const filteredAdvanced_Date_StructureTags = advanced_Date_StructureTags.filter(
      (advanced_Date_StructureTag) => advanced_Date_StructureTag.includes(searchTerm)
    )
    const filteredSkillTags = skillTags.filter((skillTag) => skillTag.includes(searchTerm))
    const filteredArithTags = arithTags.filter((arithTag) => arithTag.includes(searchTerm))
    const filteredOtherTags = otherTags.filter((otherTag) => otherTag.includes(searchTerm))

    // 将筛选出的标签数据放入 selectTagsList 数组中
    selectTagsList.value = [
      ...filteredBasicTags,
      ...filteredAlgorithmTags,
      ...filteredDate_StructureTags,
      ...filteredAdvanced_Date_StructureTags,
      ...filteredSkillTags,
      ...filteredArithTags,
      ...filteredOtherTags
    ]
  } else {
    selectTagsList.value = []
  }
}
const basicIcon = ref(false)

const basicTagsNum = ref(6)
const doBasicIcon = () => {
  basicIcon.value = !basicIcon.value
  if (basicIcon.value) {
    basicTagsNum.value = 10
  } else {
    basicTagsNum.value = 6
  }
}

// 多行删除

const handleDelete = async () => {
  const promises = selectedKeys.value.map(async (id) => {
    const res = await QuestionControllerService.deleteQuestionUsingPost({
      id
    })
    if (res.code === 0) {
      return { id, success: true }
    } else {
      return { id, success: false, message: res.message }
    }
  })

  const results = await Promise.all(promises)

  results.forEach((result) => {
    if (result.success) {
      message.success(`提交题目ID:${result.id} 删除成功！`)
    } else {
      message.error(`提交题目ID:${result.id} 删除失败：${result.message}`)
    }
  })

  await loadData()
  selectedKeys.value = []
}

const algorithmIcon = ref(false)
const algorithmTagsNum = ref(4)
const doAlgorithmIcon = () => {
  algorithmIcon.value = !algorithmIcon.value
  if (algorithmIcon.value) {
    algorithmTagsNum.value = 11
  } else {
    algorithmTagsNum.value = 4
  }
}

const date_StructureIcon = ref(false)
const date_StructureTagsNum = ref(5)
const doDate_StructureIcon = () => {
  date_StructureIcon.value = !date_StructureIcon.value
  if (date_StructureIcon.value) {
    date_StructureTagsNum.value = 19
  } else {
    date_StructureTagsNum.value = 5
  }
}

const advanced_Date_StructureIcon = ref(false)
const advanced_Date_StructureTagsNun = ref(4)
const doAdvanced_Date_StructureIcon = () => {
  advanced_Date_StructureIcon.value = !advanced_Date_StructureIcon.value
  if (advanced_Date_StructureIcon.value) {
    advanced_Date_StructureTagsNun.value = 5
  } else {
    advanced_Date_StructureTagsNun.value = 4
  }
}

const skillIcon = ref(false)
const skillTagsNun = ref(5)
const doSkillTagsIcon = () => {
  skillIcon.value = !skillIcon.value
  if (skillIcon.value) {
    skillTagsNun.value = 9
  } else {
    skillTagsNun.value = 5
  }
}

const otherIcon = ref(false)
const otherTagsNun = ref(5)
const doOtherTagsIcon = () => {
  otherIcon.value = !otherIcon.value
  if (otherIcon.value) {
    otherTagsNun.value = 8
  } else {
    otherTagsNun.value = 5
  }
}

const arithIcon = ref(false)
const arithTagsNun = ref(5)
const doArithTagsIcon = () => {
  arithIcon.value = !arithIcon.value
  if (arithIcon.value) {
    arithTagsNun.value = 9
  } else {
    arithTagsNun.value = 5
  }
}

// 删除所有的标签搜索
const resettingTags = () => {
  searchParams.value = {
    ...searchParams.value
  }
  showTags.value = []
  searchParams.value.tags = []
}

const isALLShow = ref(false)
// 标签按钮展开全部
const allShow = () => {
  if (!isALLShow.value) {
    otherIcon.value = true
    otherTagsNun.value = 8
    arithIcon.value = true
    arithTagsNun.value = 9
    skillIcon.value = true
    skillTagsNun.value = 9
    advanced_Date_StructureIcon.value = true
    advanced_Date_StructureTagsNun.value = 5
    date_StructureIcon.value = true
    date_StructureTagsNum.value = 19
    algorithmIcon.value = true
    algorithmTagsNum.value = 11
    basicIcon.value = true
    basicTagsNum.value = 10
  } else {
    otherIcon.value = false
    otherTagsNun.value = 5
    arithIcon.value = false
    arithTagsNun.value = 5
    skillIcon.value = false
    skillTagsNun.value = 5
    advanced_Date_StructureIcon.value = false
    advanced_Date_StructureTagsNun.value = 4
    date_StructureIcon.value = false
    date_StructureTagsNum.value = 5
    algorithmIcon.value = false
    algorithmTagsNum.value = 4
    basicIcon.value = false
    basicTagsNum.value = 6
  }
  isALLShow.value = !isALLShow.value
}

// 开启困难按钮时，关闭其他按钮
const rotateIconDifficulty = () => {
  rotatedDifficulty.value = !rotatedDifficulty.value
  displayedDifficulty.value = !displayedDifficulty.value
  rotatedState.value = false
  displayedStatus.value = false
}

// 改变难度
const doDifficulty = (number: number) => {
  if (tag.value != number) {
    searchParams.value = {
      ...searchParams.value,
      difficulty: number
    }

    tag.value = number
    rotatedDifficulty.value = !rotatedDifficulty.value
    displayedDifficulty.value = !displayedDifficulty.value
  } else {
    searchParams.value = {
      ...searchParams.value,
      difficulty: undefined
    }

    tag.value = 0
    rotatedDifficulty.value = !rotatedDifficulty.value
    displayedDifficulty.value = !displayedDifficulty.value
  }
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

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败：' + res.message)
  }
  await updateUserData(dataList.value)
}

// 获取用户信息
/*const userDate = async () => {
  for (const item of dataList.value) {
    const userId = item.userId;
    const id = item.id;
    const res = await UserControllerService.getUserVoByIdUsingGet(userId);
    if (res.code == 0 && res.data && res.data.userName && res.data.userAvatar) {
      const index = dataList.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        dataList.value[index].userName = res.data.userName;
        dataList.value[index].userAvatar = res.data.userAvatar;
      } else {
        console.warn(`未找到对应为${userId}de 数据`);
      }
    }
  }
};*/

// 获取用户信息 并行执行和结果缓存

const userCache: { [key: string]: { userName: string; userAvatar: string } } = {}
const updateUserData = async (dataList: any[]) => {
  const userIds = dataList.map((item) => item.userId)

  // 并行执行所有请求
  const requests = userIds.map((userId) => UserControllerService.getUserByIdUsingGet(userId))
  const responses = await Promise.all(requests)

  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i]
    const res = responses[i]

    if (res.code === 0 && res.data && res.data.userName && res.data.userAvatar) {
      const { userName, userAvatar } = res.data
      item.userName = userName
      item.userAvatar = userAvatar
      console.log(`已获取 id 为 ${item.userId} 的用户信息`)
      // 将结果缓存起来
      userCache[item.userId] = { userName, userAvatar }
    } else {
      item.userAvatar =
        'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
      item.userName = '未命名用户'
    }
  }
}
const popupVisible2 = ref(false)
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

/**
 * 页面加载时，请求数据
 */
// onMounted(() => {
//   loadData();
// });

const columns = [
  {
    title: '题目',
    dataIndex: 'title',
    slotName: 'title',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    },
    width: 185,
    ellipsis: true,
    tooltip: 'title'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'tags',
    width: 300
  },
  {
    title: '通过率',
    dataIndex: 'passRate',
    slotName: 'passRate',
    width: 100,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    slotName: 'difficulty',
    width: 100,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '内容',
    dataIndex: 'content',
    slotName: 'content',
    align: 'center',
    width: 90
  },
  {
    title: '答案',
    dataIndex: 'answer',
    slotName: 'answer',
    align: 'center',
    width: 90
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase',
    align: 'center',
    slotName: 'judgeCase',
    width: 100
  },
  {
    title: '判题配置',
    dataIndex: 'judgeConfig',
    slotName: 'judgeConfig',
    width: 300
  },
  {
    title: '创建者',
    dataIndex: 'userId',
    slotName: 'userId',
    width: 185,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '创建时间',
    slotName: 'createTime',
    dataIndex: 'createTime',
    width: 110,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '更新时间',
    slotName: 'updateTime',
    dataIndex: 'updateTime',
    width: 110,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center',
    width: 150
  }
]

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
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id
  })
  if (res.code === 0) {
    message.success('删除成功！')
    await loadData()
  } else {
    message.error('删除失败：' + res.message)
  }
}
const router = useRouter()
const doUpdate = (question: Question) => {
  router.push({
    path: '/update/question',
    query: {
      id: question.id
    }
  })
}
// 在组件的 methods 中定义一个方法来排除特定字符
</script>

<style scoped>
#menageQuestionView {
  margin: 90px 20px 20px 20px;
}

.demo-basic {
  margin-top: 4px;
  width: 120px;
  background-color: var(--color-bg-popup);
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.transparent-btn {
  width: 124px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.transparent-btn:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
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

.outer-div {
  overflow: auto;
}

.outer-div::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.outer-div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.content-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
}

.button-trigger {
  position: fixed;
  bottom: 100px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 1;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* button left */
.button-trigger:nth-child(1) {
  right: 185px;
  background-color: var(--color-neutral-5);
}

.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}
</style>
