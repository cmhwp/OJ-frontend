<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import {
  FollowControllerService,
  PostControllerService,
  type PostVO,
  UserControllerService,
  type UserVO
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import useUserStore from '@/stores/user/user'
import moment from 'moment'
import router from '@/router'
// 手动设置中文格式
moment.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    ss: '%d 秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  }
})
const route = useRoute()
const id = route.params.id as unknown as number
console.log(id)
const followType = ref('primary')
const isShow = ref(true)
const userInfo = ref<UserVO>()
const isFollow = ref(false)
const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]
const custom = [
  '#f53f3f',
  '#7816ff',
  '#00b42a',
  '#165dff',
  '#ff7d00',
  '#eb0aa4',
  '#7bc616',
  '#86909c',
  '#b71de8',
  '#0fc6c2',
  '#ffb400',
  '#168cff',
  '#ff5722'
]

const allColors = [...colors, ...custom]

const randomColor = (index: number) => {
  // Create a random seed based on index and array length to ensure color consistency for each tag
  const seed = (index * 113) % allColors.length
  return allColors[seed]
}
const handleFollowClick = async () => {
  await FollowControllerService.doFollowUsingPost({ followId: id }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      isFollow.value = Number(res.data) === 1 ? true : false
      followType.value = Number(res.data) === 1 ? 'outline' : 'primary'
      if (Number(res.data) === -1) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
      }
    } else {
      message.error('关注失败' + res.message)
    }
  })
}
const tagList = ref()
const postList = ref<PostVO[]>([])
const showList = ref(false)
const followList = ref<UserVO[]>([])

const handleToUser = async (id: number) => {
  await router.push({ path: `/personal/homepage/${id}` })
  window.location.reload()
}

onMounted(async () => {
  await UserControllerService.getUserVoByIdUsingGet(id).then((res) => {
    if (res.code === 0) {
      message.success('数据加载成功')
      userInfo.value = res.data
      tagList.value = res.data?.tags
    } else {
      message.error('数据加载失败' + res.message)
    }
  })
  const loginUser = useUserStore()
  if (loginUser.id === id) {
    isShow.value = false
  }
  await FollowControllerService.getPostFollowStatusUsingGet(id).then((res) => {
    console.log(res)
    if (res.code === 0) {
      // 请求成功，根据返回的数据更新 isFollow 状态
      if (Number(res.data) === -1) {
        isFollow.value = false
        followType.value = 'primary'
        console.log('未关注')
      } else if (Number(res.data) === 1) {
        console.log('已关注')
        isFollow.value = true
        followType.value = 'outline'
      }
    } else {
      message.error('关注信息请求失败' + res.message)
    }
    console.log(isFollow.value)
  })
  await PostControllerService.getPostsByUserIdUsingGet(id).then((res) => {
    if (res.code === 0) {
      if (res.data) {
        // Assign the array of posts directly to postList.value
        postList.value = res.data
        if (postList.value.length > 0) {
          showList.value = true
        }
        console.log(postList.value)
      } else {
        // Handle the case where res.data is undefined
        // For example, you might want to show a message or handle it differently
        console.error('Post data is undefined')
      }
    } else {
      message.error('帖子加载失败' + res.message)
    }
  })
  await FollowControllerService.listFollowByPageUsingPost({ userId: id }).then((res) => {
    if (res.code === 0) {
      if (res.data && res.data.records) {
        // Iterate over each record and push it into followList
        res.data.records.forEach((record: UserVO) => {
          // Assuming UserVO and the structure of the record are compatible
          followList.value.push(record)
          console.log(followList.value)
        })
      }
    } else {
      message.error('关注加载失败' + res.message)
    }
  })
})
</script>

<template>
  <div id="user-center-view">
    <a-row class="grid-demo" :gutter="24">
      <a-col :span="8">
        <div class="user-center-left">
          <a-avatar shape="square" class="user-avatar" :image-url="userInfo?.userAvatar"></a-avatar>
          <hr />
          <div class="user-nick">
            <div
              style="font-size: 1.25rem; line-height: 1.75rem; margin: 0 0 10px; font-weight: 700"
            >
              {{ userInfo?.userName ?? '该用户暂未命名' }}
            </div>
            <p class="user-profile-detail">{{ userInfo?.userProfile }}</p>
          </div>
          <hr />
          <div class="user-follow">
            <div
              style="
                display: flex;
                align-items: center;
                flex-direction: column;
                cursor: pointer;
                margin-right: 1.75rem;
              "
            >
              <a-popover title="关注列表">
                <div style="color: #262626bf">关注了</div>
                <div style="--tw-text-opacity: 1; color: rgb(38 38 38 / var(--tw-text-opacity))">
                  {{ userInfo?.concernNum }}
                </div>
                <template #content>
                  <a-list>
                    <a-list-item
                      v-for="(item, index) in followList"
                      :key="index"
                      style="width: 200px"
                      @click="handleToUser(<number>item.id)"
                    >
                      <a-list-item-meta :title="item.userName" :description="item.userProfile">
                        <template #avatar>
                          <a-avatar shape="square" :image-url="item.userAvatar"></a-avatar>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                </template>
              </a-popover>
            </div>
            <div style="display: flex; align-items: center">
              <div
                style="
                  --tw-bg-opacity: 1;
                  background-color: rgb(229 229 229 / var(--tw-bg-opacity));
                  --tw-border-opacity: 1;
                  border-color: rgb(255 255 255 / var(--tw-border-opacity));
                  border-style: solid;
                  border-width: 2px;
                  border-radius: 9999px;
                  width: 2px;
                  height: 2rem;
                "
              ></div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                flex-direction: column;
                cursor: pointer;
                margin-left: 1.75rem;
              "
            >
              <div style="color: #262626bf">粉丝数</div>
              <div style="--tw-text-opacity: 1; color: rgb(38 38 38 / var(--tw-text-opacity))">
                {{ userInfo?.fansNum }}
              </div>
            </div>
          </div>
          <div class="user-follow-btn" v-if="isShow">
            <div style="display: flex; width: 100%">
              <a-button
                :type="followType"
                class="follow-btn"
                status="success"
                @click="handleFollowClick"
              >
                <div v-if="followType === 'primary'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    class="mr-2"
                    style="margin-right: 2px"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13 11h7a1 1 0 110 2h-7v7a1 1 0 11-2 0v-7H4a1 1 0 110-2h7V4a1 1 0 112 0v7z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  关注
                </div>
                <div v-else>已关注</div>
              </a-button>
            </div>
          </div>
          <div style="color: #262626bf">
            <div class="user-address">
              <div class="address-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="w-[15px] h-[15px] text-label-2 dark:text-dark-label-2"
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
              </div>
              <div class="address-detail">{{ userInfo?.address ?? '未知星球' }}</div>
            </div>
            <div class="user-gender">
              <div class="gender-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="w-full h-full text-label-2 dark:text-dark-label-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.008 12.124A1.017 1.017 0 0116 12V7.586l-1.121 1.121a1 1 0 11-1.415-1.414l2.829-2.829a1 1 0 011.414 0l2.828 2.829a1 1 0 11-1.414 1.414L18 7.586V12c0 .042-.003.083-.008.124A4.002 4.002 0 0117 20a4 4 0 01-.992-7.876zm-8.016-.248c.005.04.008.082.008.124v1h2a1 1 0 110 2H8v4a1 1 0 11-2 0v-4H4a1 1 0 110-2h2v-1c0-.042.003-.083.008-.124A4.002 4.002 0 017 4a4 4 0 01.992 7.876zM7 10a2 2 0 100-4 2 2 0 000 4zm10 4a2 2 0 100 4 2 2 0 000-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="gender-detail">{{ userInfo?.gender === 0 ? '男' : '女' }}</div>
            </div>
          </div>
          <div style="display: flex">
            <a-space wrap>
              <a-tag
                v-for="(tag, index) of tagList ? JSON.parse(tagList) : ['未设置']"
                :key="index"
                :color="randomColor(index)"
                style="margin-left: 5px"
              >
                {{ tag }}</a-tag
              >
            </a-space>
          </div>
        </div>
      </a-col>
      <a-col :span="16">
        <div class="user-center-right">
          <div class="user-article">
            <div style="cursor: pointer">
              <div class="article">
                <span
                  style="display: flex; align-items: center; font-size: 1.5rem; line-height: 2rem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4zm5.718 9.304a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 14.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 15a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 16h2l.117-.007A1 1 0 0017 15zm-5.282-7.696a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 8.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 9a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 10h2l.117-.007A1 1 0 0017 9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span class="article-title">最近通过</span>
              </div>
            </div>
            <div style="cursor: pointer">
              <div class="article">
                <span
                  style="display: flex; align-items: center; font-size: 1.5rem; line-height: 2rem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M10.763 12.827l-1.06-1.06a1 1 0 00-1.415 1.414l1.415 1.414a1.5 1.5 0 002.12 0l3.889-3.888a1 1 0 00-1.415-1.414l-3.534 3.534z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span class="article-title">题解</span>
              </div>
            </div>
            <div style="cursor: pointer">
              <div class="article" style="background-color: #000a200d">
                <span
                  style="display: flex; align-items: center; font-size: 1.5rem; line-height: 2rem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span class="article-title">讨论发布</span>
              </div>
            </div>
          </div>
          <div
            style="width: 100%; display: flex; flex-direction: column; align-items: center"
            v-if="showList"
          >
            <div class="user-article-detail" v-for="(item, index) in postList" :key="index">
              <router-link
                class="user-article-detail-item"
                :to="{ path: '/post/detail', query: { id: item.id } }"
              >
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    flex: 1 1 0%;
                    margin-right: 1.125rem;
                  "
                >
                  <span class="user-article-detail-title">{{ item?.title }}</span>
                </div>
                <div class="article-icon">
                  <div
                    style="width: 44px; align-items: center; display: flex; justify-content: center"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.04 9.11l3.297-7.419a1 1 0 01.914-.594 3.67 3.67 0 013.67 3.671V7.33h4.028a2.78 2.78 0 012.78 3.2l-1.228 8.01a2.778 2.778 0 01-2.769 2.363H5.019a2.78 2.78 0 01-2.78-2.78V11.89a2.78 2.78 0 012.78-2.78H7.04zm-2.02 2a.78.78 0 00-.781.78v6.232c0 .431.35.78.78.78H6.69V11.11H5.02zm12.723 7.793a.781.781 0 00.781-.666l1.228-8.01a.78.78 0 00-.791-.898h-5.04a1 1 0 01-1-1V4.77c0-.712-.444-1.32-1.07-1.56L8.69 10.322v8.58h9.053z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      style="
                        --tw-space-x-reverse: 0;
                        margin-left: calc(0.25rem * (1 - var(--tw-space-x-reverse)));
                        margin-right: calc(0.25rem * var(--tw-space-x-reverse));
                      "
                      >{{ item?.thumbNum }}</span
                    >
                  </div>
                  <div
                    style="
                      width: 64px;
                      --tw-space-x-reverse: 0;
                      margin-left: calc(1.125rem * (1 - var(--tw-space-x-reverse)));
                      margin-right: calc(1.125rem * var(--tw-space-x-reverse));
                      display: flex;
                      align-items: center;
                    "
                  >
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.104 12.444a1 1 0 010-.888c.13-.26.37-.693.722-1.241A18.85 18.85 0 013.88 7.652C6.184 5.176 8.896 3.667 12 3.667s5.816 1.509 8.119 3.985c.79.85 1.475 1.756 2.055 2.663.352.548.593.98.722 1.24a1 1 0 010 .89c-.13.26-.37.692-.722 1.24a18.848 18.848 0 01-2.055 2.663c-2.303 2.476-5.015 3.985-8.119 3.985s-5.816-1.509-8.119-3.985a18.846 18.846 0 01-2.055-2.663c-.352-.548-.593-.98-.722-1.24zm2.406.162a16.87 16.87 0 001.836 2.38c1.959 2.106 4.19 3.347 6.654 3.347 2.465 0 4.695-1.24 6.654-3.347A16.87 16.87 0 0020.86 12a16.871 16.871 0 00-2.206-2.986C16.695 6.908 14.464 5.667 12 5.667c-2.465 0-4.695 1.24-6.654 3.347A16.87 16.87 0 003.14 12c.108.188.232.391.37.607zM12 15.75c-2.06 0-3.727-1.68-3.727-3.75 0-2.07 1.667-3.75 3.727-3.75 2.06 0 3.727 1.68 3.727 3.75 0 2.07-1.667 3.75-3.727 3.75zm0-2c.952 0 1.727-.782 1.727-1.75s-.775-1.75-1.727-1.75c-.952 0-1.727.782-1.727 1.75s.775 1.75 1.727 1.75z"
                          clip-rule="evenodd"
                        ></path></svg
                    ></span>
                    <span
                      style="
                        --tw-space-x-reverse: 0;
                        margin-left: calc(0.25rem * (1 - var(--tw-space-x-reverse)));
                        margin-right: calc(0.25rem * var(--tw-space-x-reverse));
                      "
                      >{{ item?.readNum }}</span
                    >
                  </div>
                  <span
                    style="
                      --tw-space-x-reverse: 0;
                      margin-left: calc(1.125rem * (1 - var(--tw-space-x-reverse)));
                      margin-right: calc(1.125rem * var(--tw-space-x-reverse));
                      min-width: 56px;
                      color: #3c3c4399;
                    "
                    >{{ moment(item.createTime).fromNow() }}</span
                  >
                </div>
              </router-link>
            </div>
          </div>
          <a-empty v-else></a-empty>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
#user-center-view {
  margin-top: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-center-left {
  width: 300px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.user-avatar {
  margin: 20px;
  width: 80%;
  vertical-align: middle;
  height: auto;
}
.user-nick {
  text-align: center;
}
.user-follow {
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.875rem;
}
.user-follow-btn {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.follow-btn {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  margin-bottom: 8px;
}
.user-profile-detail {
  line-height: 1.625;
  color: #262626bf;
  font-size: 14px;
  text-align: justify;
  word-break: break-all;
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: -110px;
}
hr {
  background: none !important;
  height: 1px !important;
  border: 0 !important;
  border-top: 1px solid #eee !important;
  width: 90%;
}
.user-address {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  left: -100px;
}
.address-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.address-detail {
  line-height: 17px;
  word-break: break-all;
  width: calc(100% - 26px);
  margin-left: 8px;
}
.user-gender {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  left: -100px;
}
.gender-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.gender-detail {
  line-height: 17px;
  word-break: break-all;
  width: calc(100% - 26px);
  margin-left: 8px;
}
.user-center-right {
  width: 700px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.user-article {
  display: flex;
  color: #262626bf;
  align-items: center;
  width: 100%;
}
.article {
  font-weight: 500;
  padding: 10px 1.25rem;
  border-radius: 5px;
  align-items: center;
  display: flex;
}
.article:hover {
  --tw-text-opacity: 1;
  color: rgb(38 38 38 / var(--tw-text-opacity));
}
.article-title {
  --tw-space-x-reverse: 0;
  margin-left: calc(0.5rem * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
}
.user-article-detail {
  --tw-space-y-reverse: 0;
  margin-bottom: calc(18px * var(--tw-space-y-reverse));
  margin-top: calc(18px * (1 - var(--tw-space-y-reverse)));
  width: 90%;
}
.user-article-detail-item {
  padding-right: 1.25rem;
  padding-left: 1rem;
  background-color: #000a2008;
  border-radius: 5px;
  align-items: center;
  display: flex;
  outline: none;
  height: 56px;
  margin-bottom: 10px;
}
.user-article-detail-title {
  --tw-text-opacity: 1;
  color: rgb(38 38 38 / var(--tw-text-opacity));
  font-weight: 500;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
}
.article-icon {
  display: flex;
  color: #3c3c4399;
  align-items: center;
}
</style>
