<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  FollowControllerService,
  PostControllerService,
  PostFavourControllerService,
  PostReplyControllerService,
  type PostReplyQueryRequest,
  PostThumbControllerService,
  ReplyFavourControllerService,
  ReplyThumbControllerService
} from '../../../generated'
import { useRoute } from 'vue-router'
import moment from 'moment/moment'
import useReplyStore, { type IReply } from '@/stores/reply/reply'
import message from '@arco-design/web-vue/es/message'
import { watchEffect } from 'vue'
import router from '@/router'
import useUserStore from '@/stores/user/user'

const resData = ref()
const route = useRoute()
const isFollow = ref(false)
const isShow = ref(false)
const dataList = async () => {
  const id = route.query.id as unknown as number
  await PostControllerService.getPostVoByIdUsingGet(id).then((res) => {
    resData.value = res.data
    console.log(resData)
  })
  const followId = resData.value?.userId
  console.log(resData.value)
  //关注
  await FollowControllerService.getPostFollowStatusUsingGet(followId).then((res) => {
    console.log(res.data)
    if (res.code === 0) {
      // 请求成功，根据返回的数据更新 isFollow 状态
      if (Number(res.data) === -1) {
        isFollow.value = false
        console.log('未关注')
      } else if (Number(res.data) === 1) {
        console.log('已关注')
        isFollow.value = true
      }
    } else {
      message.error('关注信息请求失败' + res.message)
    }
    console.log(isFollow.value)
  })
  const loginUser = useUserStore()
  if (loginUser.id === resData.value.userId) {
    isShow.value = true
  }
}
const onChangeFollow = async () => {
  const followId = resData.value?.userId
  await FollowControllerService.doFollowUsingPost({ followId: followId }).then((res) => {
    if (res.code === 0) {
      isFollow.value = Number(res.data) === 1 ? true : false
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
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
//组件显示隐藏
const show = ref(false)
//回复Btn显示隐藏
const handleReplyClick = () => {
  show.value = true
  const marginBottomValue = show.value ? '50vh' : '0px'
  const postDetailElement = document.getElementById('post-detail')
  if (postDetailElement != null) {
    postDetailElement.style.marginBottom = marginBottomValue
  }
}
//回复状态
const replyList = ref<IReply[]>([])

const replyState = useReplyStore()
const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 10)
const searchParams = ref<PostReplyQueryRequest>({
  postId: route.query.id as unknown as number,
  pageSize: pageSize.value,
  current: current.value,
  sortOrder: 'descend',
  sortField: 'createTime'
})
const loadReplyData = async () => {
  await replyState.loadReplyData(searchParams.value)
  replyList.value = replyState.replies.filter(
    (reply) => reply.parentReplyId === null || reply.parentReplyId === 0
  )

  // 在加载回复数据的方法中添加
  replyList.value.forEach((reply) => {
    reply.showReplies = false // 默认不显示子回复
  })

  console.log('replyList', replyList.value)
}

//处理帖子点赞
const handlePostLikeChange = async (postId: number) => {
  console.log(postId)
  const res = await PostThumbControllerService.doThumbUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    console.log(res)
    const post = resData.value
    if (post.id === postId) {
      post.thumbNum += res.data === 1 ? 1 : -1
      post.hasThumb = res.data !== -1
    }
    if (res.data === 1) {
      message.success('点赞成功')
    } else message.success('取消点赞')
  } else {
    message.error('点赞失败：' + res.message)
  }
}

//处理帖子收藏
const handlePostFavorChange = async (postId: number) => {
  console.log(postId)
  const res = await PostFavourControllerService.doPostFavourUsingPost({
    postId: postId
  })
  if (res.code === 0) {
    console.log(res)
    const post = resData.value
    if (post.id === postId) {
      post.favourNum += res.data === 1 ? 1 : -1
      post.hasFavour = res.data !== -1
    }
    if (res.data === 1) {
      message.success('收藏成功')
    } else message.success('取消收藏')
  } else {
    message.error('收藏失败：' + res.message)
  }
}

//处理收藏
const onLikeReplyChange = async (replyId: number) => {
  const res = await ReplyThumbControllerService.doReplyThumbUsingPost({
    replyId: replyId
  })
  if (res.code === 0) {
    console.log(res)
    const index = replyList.value.findIndex((item) => item.id === replyId)
    console.log(index)
    if (index !== -1) {
      const reply = replyList.value[index]
      reply.thumbNum += res.data === 1 ? 1 : -1
      reply.hasThumb = res.data !== -1
    }
    if (res.data === 1) {
      message.success('点赞成功')
    } else message.success('取消点赞')
  } else {
    message.error('点赞失败：' + res.message)
  }
}
const onFavourChange = async (replyId: number) => {
  const res = await ReplyFavourControllerService.doReplyFavourUsingPost({
    replyId: replyId
  })
  if (res.code === 0) {
    console.log(res)
    const index = replyList.value.findIndex((item) => item.id === replyId)
    console.log(index)
    if (index !== -1) {
      const reply = replyList.value[index]
      reply.favourNum += res.data === 1 ? 1 : -1
      reply.hasFavour = res.data !== -1
    }
    if (res.data === 1) {
      message.success('收藏成功')
    } else message.success('取消收藏')
  } else {
    message.error('收藏失败：' + res.message)
  }
}
const replyId = ref(0)
const replyToReply = ref<IReply[]>([])
const toggleReplies = async (item: IReply) => {
  // 如果当前没有子回复，则此操作不会改变任何东西
  if (item.replyNum > 0) {
    item.showReplies = !item.showReplies
    const newSearchParams = {
      parentReplyId: item.id
    }
    console.log(newSearchParams)
    await PostReplyControllerService.listPostReplyVoByPageUsingPost(newSearchParams).then((res) => {
      if (res.code === 0) {
        replyToReply.value = res.data.records
        console.log(replyToReply.value)
      }
    })
  }
  if (item.replyNum === 0) {
    replyId.value = item.id
    handleReplyClick()
  }
}

const handleReplyToReply = (item: IReply) => {
  replyId.value = item.id
  handleReplyClick()
  console.log(replyId.value)
}
//切换最新回复
const handleNewClick = async () => {
  await replyState.loadReplyData(searchParams.value)
  replyList.value = replyState.replies
}
//处理回复的回复
// 切换当前页码
// 设置每页的页数
const customPageSizeOptions = ref([10, 15, 20])
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  current.value = page
  router.push({
    query: {
      id: route.query.id as unknown as number,
      pageSize: pageSize.value,
      current: current.value
    }
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
    query: {
      id: route.query.id as unknown as number,
      pageSize: pageSize.value,
      current: current.value
    }
  })
}

const handleShow = (value: boolean) => {
  loadReplyData()
  console.log(value)
  show.value = value
}
const goHomePage = async () => {
  await router.push({
    name: '个人主页',
    params: { id: resData.value?.user.id }
  })
  await window.location.reload()
}
const updatePost = async () => {
  await router.push({
    path: '/user/updatePost',
    query: {
      id: resData.value?.id
    }
  })
  await window.location.reload()
}
watch(
  () => route.query.id,
  () => {
    dataList()
  }
)

// 使用 watchEffect 监听 loadReplyData 函数的变化
watchEffect(() => {
  loadReplyData()
})

onMounted(() => {
  loadReplyData()
  dataList()
})
</script>

<template>
  <div id="post-detail">
    <a-row>
      <a-col :span="15">
        <div class="post-detail-total">
          <div class="css-1132auf-Header-Breadcrumb">
            <div class="post-detail-header">
              <span>
                <span class="post-header-item">
                  <a>讨论</a>
                </span>
                <span class="ant-breadcrumb-separator">/</span>
              </span>
              <span>
                <span class="post-header-item">
                  <a>{{ resData?.topic }}</a>
                </span>
                <span class="ant-breadcrumb-separator">/</span>
              </span>
              <span>
                <span class="post-header-item">
                  <a>{{ resData?.title }}</a>
                </span>
              </span>
            </div>
            <a-button type="outline" v-if="isShow" @click="updatePost">更新帖子</a-button>
          </div>
          <div style="padding-top: 8px"></div>
          <div class="css-se33k0-QuestionContent">
            <div class="css-em3qpz-QuestionTitle">
              <a-popover
                position="rb"
                :content-style="{
                  borderRadius: '13px',
                  background: 'rgba(255, 255, 255, 1)',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(38, 38, 38, 1)',
                  boxShadow: '0 10px 32px rgba(0, 0, 0, 0.18)'
                }"
              >
                <a-avatar :image-url="resData?.user?.userAvatar" class="user-avatar"></a-avatar>
                <template #content>
                  <div class="avatar-container">
                    <div class="avatar-top">
                      <a-avatar
                        :image-url="resData?.user?.userAvatar"
                        style="width: 60px; height: 60px; cursor: pointer; margin-right: 12px"
                        @click="goHomePage"
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
                                    >{{ resData?.user?.userName }}</span
                                  >
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
                                <span>{{ resData?.user.address ?? '未知IP' }}</span>
                              </div>
                            </div>
                            <div class="avatar-name-center">
                              <span
                                style="
                                  font-size: 12px;
                                  line-height: 16px;
                                  color: rgba(89, 89, 89, 1);
                                "
                                >全站排名
                                <span style="color: rgba(0, 175, 155, 1)">9999+</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="avatar-profile">
                          {{ resData?.user.userProfile ?? '该用户未设置个人简介' }}
                        </div>
                      </div>
                    </div>
                    <div class="avatar-center">
                      <div
                        class="avatar-center-line"
                        style="flex: 1 1 auto; position: relative; cursor: default"
                      >
                        <div class="avatar-read">被阅读</div>
                        <div class="avatar-num">{{ resData?.readNum }}</div>
                      </div>
                      <div
                        class="avatar-center-line"
                        style="flex: 1 1 auto; position: relative; cursor: default"
                      >
                        <div class="avatar-read">被点赞</div>
                        <div class="avatar-num">{{ resData?.thumbNum }}</div>
                      </div>
                      <div
                        class="avatar-center-line"
                        style="flex: 1 1 auto; position: relative; cursor: default"
                      >
                        <div class="avatar-read">被收藏</div>
                        <div class="avatar-num">{{ resData?.favourNum }}</div>
                      </div>
                      <div
                        class="avatar-center-line"
                        style="flex: 1 1 auto; position: relative; cursor: default"
                      >
                        <div class="avatar-read">被关注</div>
                        <div class="avatar-num">{{ resData?.user.fansNum }}</div>
                      </div>
                    </div>
                    <div class="avatar-bottom">
                      <button
                        :class="{ 'avatar-concern': !isFollow, 'avatar-concerned': isFollow }"
                        @click="onChangeFollow"
                      >
                        <div v-if="!isFollow" style="display: flex; align-items: center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            class="css-1x797ae-Svg ea8ky5j0"
                            style="font-size: 16px; margin-right: 8px"
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
                      </button>
                    </div>
                  </div>
                </template>
              </a-popover>
              <span style="margin-right: 12px">{{ resData?.title }}</span>
              <button
                :key="isFollow"
                :class="{
                  'css-yf7o-BaseButtonComponent-ThemedButton': !isFollow,
                  'concern-btn': isFollow
                }"
                @click="onChangeFollow"
              >
                <div v-if="!isFollow">
                  <icon-plus />
                  <span>关注TA</span>
                </div>
                <span v-else>已关注</span>
              </button>
            </div>
            <div class="css-5d7bnq-QuestionInfoContainer">
              <div class="css-xwj2ip-UsernameContainer">
                <span class="css-17369th-NameWrap">{{ resData?.user?.userName }}</span>
              </div>
              <span style="color: rgba(191, 191, 191, 1); margin-right: 10px; white-space: nowrap"
                >发起于 {{ moment(resData?.createTime).format('YYYY年MM月DD日') }}</span
              >
              <div
                style="
                  margin-right: 10px;
                  width: 4px;
                  height: 4px;
                  border-radius: 100%;
                  background: rgba(229, 229, 229, 1);
                "
              ></div>
              <span style="color: rgba(191, 191, 191, 1)"
                >来自{{ resData?.user.address ?? '外星球' }}</span
              >
            </div>
          </div>
          <div style="position: relative">
            <div class="css-1j8tn6">
              <ai-editor-view :value="resData?.content"></ai-editor-view>
            </div>
          </div>
          <div style="margin-top: 12px"></div>
          <div class="css-jgmohy-QuestionActionsContainer">
            <div class="css-1ukmnx3-ReactionWraper">
              <div style="display: flex">
                <div
                  class="css-4t1g65-ReactionUpvoteBtnWrapper"
                  @click="handlePostLikeChange(resData.id)"
                >
                  <icon-thumb-up
                    v-if="!resData?.hasThumb"
                    style="
                      padding: 2px;
                      height: 24px;
                      width: 24px;
                      border-radius: 100%;
                      color: rgba(60, 60, 67, 0.6);
                    "
                  />
                  <icon-thumb-up-fill
                    style="
                      padding: 2px;
                      height: 24px;
                      width: 24px;
                      border-radius: 100%;
                      color: rgba(45, 181, 93, 1);
                    "
                    v-else
                  />
                  <span class="thumbNum-text">{{ resData?.thumbNum }}</span>
                </div>
              </div>
            </div>
            <div
              style="
                margin-right: 8px;
                height: 12px;
                border-left-width: 1px;
                border-left-style: solid;
                border-color: rgba(0, 10, 32, 0.11);
              "
            ></div>
            <button
              class="css-1c66zjl-BaseButtonComponent-OperationButton-CompactOperationButton-CompactOperationOrangeButton"
              @click="handlePostFavorChange(resData.id)"
            >
              <div v-if="!resData?.hasFavour" style="display: flex; align-items: center">
                <icon-star style="width: 20px; height: 20px" />
                <span>收藏</span>
              </div>
              <div v-else style="color: rgba(255, 161, 22, 1); display: flex; align-items: center">
                <icon-star-fill style="width: 20px; height: 20px" />
                <span>已收藏</span>
              </div>
            </button>
            <button class="css-1kpbure-BaseButtonComponent-OperationButton">
              <icon-launch style="width: 20px; height: 20px" />
              <span>分享</span>
            </button>
            <div style="margin-left: auto">
              <button class="reply-btn" @click="handleReplyClick">
                <icon-edit style="height: 16px; width: 16px" />
                <span style="margin-left: 4px">回复讨论</span>
              </button>
            </div>
          </div>
        </div>
        <div class="reply-total">
          <!--TODO-->
          <div class="total-text">共 {{ replyState.total }} 个回复</div>
          <button class="sort-btn" @click="handleNewClick">
            <span>最新</span>
            <icon-sort style="height: 16px; width: 16px; margin-left: 2px" />
          </button>
        </div>
        <div class="reply-detail-total">
          <!--TODO-->
          <div
            class="reply-detail"
            v-for="(item, index) in replyList"
            :key="index"
            style="margin-top: 20px"
          >
            <div class="reply-detail-top">
              <div class="reply-detail-top-left">
                <a-avatar
                  class="reply-detail-avatar"
                  :image-url="item?.userVO?.userAvatar"
                ></a-avatar>
                <div class="reply-detail-nick">
                  <span>{{ item?.userVO?.userName }}</span>
                </div>
              </div>
              <div class="reply-detail-top-right">
                <div class="reply-detail-time">
                  <span style="margin: 0px 8px">来自{{ item.userVO.address }}</span>
                  <div
                    style="
                      width: 4px;
                      height: 4px;
                      border-radius: 100%;
                      background: rgba(229, 229, 229, 1);
                    "
                  ></div>
                  <span style="margin: 0px 8px">{{
                    moment(item.createTime).format('YYYY-MM-DD')
                  }}</span>
                </div>
              </div>
            </div>
            <div class="reply-detail-middle">
              <md-view
                style="
                  min-height: 50px;
                  margin-bottom: 10px;
                  line-height: 50px;
                  align-items: center;
                "
                :value="item.content"
              ></md-view>
            </div>
            <div class="reply-detail-bottom">
              <div class="reply-detail-bottom-left">
                <div style="margin-left: 10px">
                  <div class="css-1ukmnx3-ReactionWraper">
                    <div style="display: flex">
                      <div
                        class="css-4t1g65-ReactionUpvoteBtnWrapper"
                        @click="onLikeReplyChange(item.id)"
                      >
                        <icon-thumb-up
                          v-if="!item.hasThumb"
                          style="
                            padding: 2px;
                            height: 24px;
                            width: 24px;
                            border-radius: 100%;
                            color: rgba(60, 60, 67, 0.6);
                          "
                        />
                        <icon-thumb-up-fill
                          style="
                            padding: 2px;
                            height: 24px;
                            width: 24px;
                            border-radius: 100%;
                            color: rgba(45, 181, 93, 1);
                          "
                          v-else
                        />
                        <span class="thumbNum-text">{{ item.thumbNum }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style="
                    margin-right: 8px;
                    height: 12px;
                    border-left-width: 1px;
                    border-left-style: solid;
                    border-color: rgba(0, 10, 32, 0.11);
                  "
                ></div>
                <button class="reply" @click="toggleReplies(item)">
                  <div v-if="!item.showReplies" style="display: flex; align-items: center">
                    <icon-message style="width: 20px; height: 20px" />
                    <span style="margin-left: 4px">回复</span>
                  </div>
                  <div v-else style="display: flex; align-items: center">
                    <icon-double-down style="width: 20px; height: 20px" />
                    <span style="margin-left: 4px">共 {{ item.replyNum }} 条回复</span>
                  </div>
                </button>
                <button
                  class="css-1c66zjl-BaseButtonComponent-OperationButton-CompactOperationButton-CompactOperationOrangeButton"
                  @click="onFavourChange(item.id)"
                >
                  <div v-if="!item.hasFavour" style="display: flex; align-items: center">
                    <icon-star style="width: 20px; height: 20px" />
                    <span>收藏</span>
                  </div>
                  <div
                    v-else
                    style="color: rgba(255, 161, 22, 1); display: flex; align-items: center"
                  >
                    <icon-star-fill style="width: 20px; height: 20px" />
                    <span>已收藏</span>
                  </div>
                </button>
                <button class="css-1kpbure-BaseButtonComponent-OperationButton">
                  <icon-launch style="width: 20px; height: 20px" />
                  <span>分享</span>
                </button>
              </div>
              <button class="reply-detail-bottom-right" @click="handleReplyToReply(item)">
                <icon-edit style="height: 18px; width: 18px"></icon-edit>
                <span style="margin-left: 4px">添加回复</span>
              </button>
            </div>
            <div v-if="item.showReplies">
              <div style="padding-bottom: 16px" v-for="(reply, index) in replyToReply" :key="index">
                <div
                  style="
                    margin-bottom: 12px;
                    padding: 8px 16px 0px;
                    background: rgba(247, 247, 247, 1);
                    border-radius: 7px;
                  "
                >
                  <div class="reply-detail-top">
                    <div class="reply-detail-top-left">
                      <a-avatar
                        class="reply-detail-avatar"
                        :image-url="reply?.userVO?.userAvatar"
                      ></a-avatar>
                      <div class="reply-detail-nick">
                        <span>{{ reply?.userVO?.userName }}</span>
                      </div>
                    </div>
                    <div class="reply-detail-top-right">
                      <div class="reply-detail-time">
                        <span style="margin: 0px 8px">来自{{ reply.userVO.address }}</span>
                        <div
                          style="
                            width: 4px;
                            height: 4px;
                            border-radius: 100%;
                            background: rgba(229, 229, 229, 1);
                          "
                        ></div>
                        <span style="margin: 0px 8px">{{
                          moment(reply.createTime).format('YYYY-MM-DD')
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="reply-detail-middle">
                    <md-view
                      style="
                        min-height: 50px;
                        margin-bottom: 10px;
                        line-height: 50px;
                        align-items: center;
                      "
                      :value="reply.content"
                    ></md-view>
                  </div>
                  <div class="reply-detail-bottom">
                    <div class="reply-detail-bottom-left">
                      <div style="margin-left: 10px">
                        <div class="css-1ukmnx3-ReactionWraper">
                          <div style="display: flex">
                            <div
                              class="css-4t1g65-ReactionUpvoteBtnWrapper"
                              @click="onLikeReplyChange(reply.id)"
                            >
                              <icon-thumb-up
                                v-if="!reply.hasThumb"
                                style="
                                  padding: 2px;
                                  height: 24px;
                                  width: 24px;
                                  border-radius: 100%;
                                  color: rgba(60, 60, 67, 0.6);
                                "
                              />
                              <icon-thumb-up-fill
                                style="
                                  padding: 2px;
                                  height: 24px;
                                  width: 24px;
                                  border-radius: 100%;
                                  color: rgba(45, 181, 93, 1);
                                "
                                v-else
                              />
                              <span class="thumbNum-text">{{ reply.thumbNum }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          margin-right: 8px;
                          height: 12px;
                          border-left-width: 1px;
                          border-left-style: solid;
                          border-color: rgba(0, 10, 32, 0.11);
                        "
                      ></div>
                      <button class="reply" @click="toggleReplies(reply)">
                        <div v-if="!reply.showReplies" style="display: flex; align-items: center">
                          <icon-message style="width: 20px; height: 20px" />
                          <span style="margin-left: 4px">回复</span>
                        </div>
                        <div v-else style="display: flex; align-items: center">
                          <icon-double-down style="width: 20px; height: 20px" />
                          <span style="margin-left: 4px">共 {{ reply.replyNum }} 条回复</span>
                        </div>
                      </button>
                      <button
                        class="css-1c66zjl-BaseButtonComponent-OperationButton-CompactOperationButton-CompactOperationOrangeButton"
                        @click="onFavourChange(reply.id)"
                      >
                        <div v-if="!reply.hasFavour" style="display: flex; align-items: center">
                          <icon-star style="width: 20px; height: 20px" />
                          <span>收藏</span>
                        </div>
                        <div
                          v-else
                          style="color: rgba(255, 161, 22, 1); display: flex; align-items: center"
                        >
                          <icon-star-fill style="width: 20px; height: 20px" />
                          <span>已收藏</span>
                        </div>
                      </button>
                      <button class="css-1kpbure-BaseButtonComponent-OperationButton">
                        <icon-launch style="width: 20px; height: 20px" />
                        <span>分享</span>
                      </button>
                    </div>
                    <button class="reply-detail-bottom-right" @click="handleReplyToReply(reply)">
                      <icon-edit style="height: 18px; width: 18px"></icon-edit>
                      <span style="margin-left: 4px">添加回复</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 100px; margin-top: 20px" v-if="replyState.total != 0">
            <a-pagination
              :total="replyState.total"
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
          <reply-editor-modal
            style="position: fixed; bottom: 0; width: 100%"
            v-show="show"
            :show="show"
            :postId="route.query.id as unknown as number"
            :parentReplyId="replyId"
            @update-show="handleShow"
          ></reply-editor-modal>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="post-tag">
          <div style="width: 100%">
            <div class="post-tag-top-detail">
              <div class="post-tag-top-title">收藏次数</div>
              <span>{{ resData?.favourNum }}</span>
            </div>
            <div class="post-tag-top-detail">
              <div class="post-tag-top-title">点赞次数</div>
              <span>{{ resData?.thumbNum }}</span>
            </div>
            <div class="post-tag-top-detail">
              <div class="post-tag-top-title">浏览次数</div>
              <span>{{ resData?.readNum }}</span>
            </div>
          </div>
          <div
            style="width: 100%; height: 1px; background: rgba(240, 240, 240, 1); margin: 15px 0px"
          ></div>
          <div class="relative-tag">相关标签</div>
          <div class="post-tag-detail">
            <a-tag
              v-for="(tag, index) of resData?.tagList"
              :key="index"
              :color="getRandomColor()"
              style="border-radius: 10px; margin-right: 5px"
            >
              {{ tag }}
            </a-tag>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
#post-detail {
  margin: 90px 10px 30px 100px;
}
.post-detail-total {
  background: rgba(255, 255, 255, 1);
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 0px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.post-detail-header {
  font-size: 14px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  color: rgba(0, 0, 0, 0.45);
}
.post-detail-header > span {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.post-header-item {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ant-breadcrumb-separator {
  color: rgba(191, 191, 191, 1);
  display: inline-block;
  margin: 0 8px;
}
.css-1132auf-Header-Breadcrumb {
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 0px;
}
.css-se33k0-QuestionContent {
  padding-top: 8px;
  position: relative;
}
.css-em3qpz-QuestionTitle {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  color: rgba(0, 0, 0, 1);
  word-break: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.user-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  vertical-align: unset;
  background-color: rgba(191, 191, 191, 1);
  cursor: pointer;
}
.css-yf7o-BaseButtonComponent-ThemedButton {
  margin-left: auto;
  flex-shrink: 0;
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  box-shadow: inset 0px 0px 0px 1px rgba(45, 181, 93, 1);
  background-color: transparent;
  color: rgba(45, 181, 93, 1);
  font-size: 14px;
  padding: 6px 12px;
}
.concern-btn {
  margin-left: auto;
  flex-shrink: 0;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  box-shadow: inset 0px 0px 0px 1px rgba(0, 10, 32, 0.11);
  background-color: transparent;
  color: rgba(60, 60, 67, 0.6);
  font-size: 14px;
  padding: 6px 12px;
}
.css-5d7bnq-QuestionInfoContainer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
}
.avatar-container {
  width: 312px;
  padding: 16px;
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
.css-xwj2ip-UsernameContainer {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
}
.css-17369th-NameWrap {
  color: rgba(191, 191, 191, 1);
  font-size: 12px;
  margin-right: 10px;
}
.css-1j8tn6 {
  position: relative;
  width: 100%;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  color: rgb(26, 26, 26);
}
.css-jgmohy-QuestionActionsContainer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  border-top: 1px solid rgba(0, 10, 32, 0.11);
  position: sticky;
  margin: 0px -16px;
  padding: 14px 16px;
  border-radius: 0px 0px 8px 8px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 1);
}
.css-1ukmnx3-ReactionWraper {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 16px;
}
.css-4t1g65-ReactionUpvoteBtnWrapper {
  display: inline-flex;
  height: 24px;
  border-radius: 14px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  color: rgba(60, 60, 67, 0.6);
  font-weight: 500;
}
.css-4t1g65-ReactionUpvoteBtnWrapper :hover {
  background-color: rgba(45, 181, 93, 0.08);
  color: rgba(45, 181, 93, 1);
}
.thumbNum-text {
  color: rgba(60, 60, 67, 0.6);
  margin-left: 4px;
  font-size: 14px;
}
.css-1c66zjl-BaseButtonComponent-OperationButton-CompactOperationButton-CompactOperationOrangeButton {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  padding: 0px;
  font-size: 14px;
  vertical-align: text-bottom;
  margin: 0px 8px;
  transition: none 0s ease 0s;
  color: rgba(60, 60, 67, 0.6);
}
.css-1c66zjl-BaseButtonComponent-OperationButton-CompactOperationButton-CompactOperationOrangeButton:hover {
  color: rgba(255, 161, 22, 1);
}
.css-1kpbure-BaseButtonComponent-OperationButton {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  padding: 0px;
  margin: 0px 8px;
  color: rgba(140, 140, 140, 1);
  font-size: 14px;
  vertical-align: text-bottom;
}
.css-1kpbure-BaseButtonComponent-OperationButton:hover {
  color: rgba(10, 132, 255, 1);
}
.reply-btn {
  border: none;
  border-radius: 8px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: rgba(45, 181, 93, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  margin-left: auto;
  margin-right: 16px;
  line-height: 22px;
  padding: 5px 16px !important;
  font-weight: 500;
}
.reply-btn:hover {
  background-color: rgba(38.25, 153.85, 79.05, 1);
}
.reply-total {
  background: rgba(255, 255, 255, 1);
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 10px;
  padding: 10px 15px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-radius: 8px;
  width: 100%;
}
.reply-total .total-text {
  font-size: 12px;
  color: rgba(191, 191, 191, 1);
}
.reply-total .sort-btn {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  font-size: 12px;
  padding: 0px;
  color: rgba(140, 140, 140, 1);
}
.reply-detail-total {
  width: 100%;
  margin-bottom: 10px;
}
.reply-detail-total .reply-detail {
  background: rgba(255, 255, 255, 1);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px 16px 0px;
  width: 100%;
}
.reply-detail-top {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 24px;
}
.reply-detail-top-left {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.reply-detail-avatar {
  flex-shrink: 0;
  -webkit-box-flex: 0;
  flex-grow: 0;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 0px;
  background: rgba(240, 240, 240, 1);
  margin-right: 10px;
  cursor: pointer;
}
.reply-detail-nick {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
}
.reply-detail-nick > span {
  color: rgba(140, 140, 140, 1);
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.reply-detail-top-right {
  margin-left: auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.reply-detail-time {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px;
  margin-left: 12px;
  color: rgba(191, 191, 191, 1);
}
.reply-detail-middle {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 12px;
}
.reply-detail-bottom {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 12px 0px 16px;
  border-top: 1px solid rgba(240, 240, 240, 1);
}
.reply-detail-bottom-left {
  margin-left: -9px;
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: sticky;
  bottom: 0px;
  z-index: 1000;
}
.reply-detail-bottom-right {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  font-size: 14px;
  padding: 0px;
  color: rgba(140, 140, 140, 1);
}
.reply {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  padding: 0px;
  margin: 0px 8px;
  color: rgba(140, 140, 140, 1);
  font-size: 14px;
  vertical-align: text-bottom;
}
.reply:hover {
  color: rgba(10, 132, 255, 1);
}
.reply-detail-bottom-right:hover {
  color: rgba(10, 132, 255, 1);
}
.post-tag {
  margin-left: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 20px 15px;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 8px;
}
.post-tag-top-detail {
  margin-bottom: 15px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  line-height: 22px;
}
.post-tag-top-title {
  line-height: 18px;
  color: rgba(140, 140, 140, 1);
}
.post-tag-top-detail > span {
  font-family: FetteMittelschrift;
  background: rgba(247, 247, 247, 1);
  color: rgba(38, 38, 38, 1);
  border-radius: 3px;
  padding: 0px 8px;
  line-height: 22px;
}
.relative-tag {
  line-height: 18px;
  color: rgba(140, 140, 140, 1);
}
.post-tag-detail {
  margin-top: 10px;
}
</style>
