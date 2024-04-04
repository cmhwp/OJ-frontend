import { defineStore } from 'pinia'
import { PostReplyControllerService, type PostReplyQueryRequest } from '../../../generated'

interface IUserVO {
  userAvatar: string
  userName: string
  address: string
}

interface IReply {
  id: number
  content: string
  userId: number
  hasThumb: boolean
  favourNum: number
  hasFavour: boolean
  thumbNum: number
  replyNum: number
  parentReplyId: number
  showReplies: boolean
  createTime: Date
  userVO: IUserVO
}

interface IReplyState {
  replies: IReply[]
  total: number
}

const useReplyStore = defineStore('reply', {
  state: (): IReplyState => ({
    replies: [],
    total: 0
  }),
  getters: {
    // Example getter for formatted content
    formattedContents: (state) => state.replies.map((reply) => reply.content),
    userInfo: (state) =>
      state.replies.map((reply) => `${reply.userVO.userName}, ${reply.userVO.address}`)
  },
  actions: {
    //load回复数据
    async loadReplyData(payload: PostReplyQueryRequest) {
      const res = await PostReplyControllerService.listPostReplyVoByPageUsingPost(payload)
      console.log('API返回的数据:', res.data)
      this.replies = res.data.records
      this.total = res.data.total
    }
  }
})
export { type IReplyState, type IReply }
export default useReplyStore
