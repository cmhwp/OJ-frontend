<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
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
import reply from '@/stores/reply/reply'
const resData = ref()
const route = useRoute()
const dataList = async () => {
  const id = route.query.id as unknown as number
  await PostControllerService.getPostVoByIdUsingGet(id).then((res) => {
    resData.value = res.data
    console.log(resData)
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
      ...searchParams.value,
      parentReplyId: item.id
    }
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

const handleShow = (value: boolean) => {
  loadReplyData()
  console.log(value)
  show.value = value
}
watch(
  () => route.query.id,
  () => {
    dataList()
  }
)
import { watchEffect } from 'vue'

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
          </div>
          <div style="padding-top: 8px"></div>
          <div class="css-se33k0-QuestionContent">
            <div class="css-em3qpz-QuestionTitle">
              <a-avatar :image-url="resData?.user?.userAvatar" class="user-avatar"></a-avatar>
              <span style="margin-right: 12px">{{ resData?.title }}</span>
              <button
                style="margin-left: auto; flex-shrink: 0"
                class="css-yf7o-BaseButtonComponent-ThemedButton"
              >
                <icon-plus />
                <span>关注TA</span>
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
              <span style="color: rgba(191, 191, 191, 1)">来自{{ resData?.user?.address }}</span>
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
.css-5d7bnq-QuestionInfoContainer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
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
