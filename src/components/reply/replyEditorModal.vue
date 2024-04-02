<script setup lang="ts">
import { watch, ref, defineEmits } from 'vue'
import { type PostReplyAddRequest, PostReplyControllerService } from '../../../generated'
import { useRoute } from 'vue-router'
import message from '@arco-design/web-vue/es/message'

const props = defineProps({
  show: {
    type: Boolean
  },
  postId: {
    type: Number
  }
})
const visible = ref(false)
const replyPostId = ref(0)
watch([() => props.show, () => props.postId], ([show, postId]) => {
  visible.value = show
  replyPostId.value = postId as number
  console.log('show 变化了:', show)
  console.log('postId 变化了:', postId)
})
const emit = defineEmits(['update-show'])
const handleCancelClick = () => {
  visible.value = false
  emit('update-show', visible.value)
}
//添加回复
const route = useRoute()
const mdValue = ref('')
const handleOnChange = (v: string) => {
  mdValue.value = v
}
let formReply = ref<PostReplyAddRequest>({
  content: '',
  postId: 0,
  parentReplyId: undefined
})
const handleSubmitClick = async () => {
  console.log(replyPostId.value)
  formReply.value.content = mdValue.value
  formReply.value.postId = replyPostId.value
  const res = await PostReplyControllerService.addPostReplyUsingPost(formReply.value)
  if (res.code === 0) {
    message.success('回复成功')
    console.log('回复成功', res)
    emit('update-show', false)
    mdValue.value = ''
  }
  // 处理提交逻辑
  console.log('回复内容：', formReply.value)
}
</script>

<template>
  <div class="reply-editor-modal">
    <div class="reply-editor-modal-header">
      <button class="reply-cancel-btn" @click="handleCancelClick">
        <span>取消</span>
      </button>
      <div style="flex: 1 1 0px"></div>
      <button class="reply-btn" @click="handleSubmitClick">
        <icon-send
          style="
            display: inline-block; /* 确保可以应用转换 */
            transform: rotate(315deg); /* 右旋转45度 */
            height: 16px;
            width: 16px;
          "
        />
        <span>回复评论</span>
      </button>
    </div>
    <a-form style="display: flex; flex-direction: column; width: 100%">
      <ai-post-editor
        style="width: 100%; padding-top: 30px"
        :value="mdValue"
        :handle-change="handleOnChange"
      ></ai-post-editor>
    </a-form>
  </div>
</template>

<style scoped>
.reply-editor-modal {
  background: rgba(255, 255, 255, 1);
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  transition-property: transform, opacity, height;
  transition-duration: 0.3s;
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0%);
  height: 50vh;
  cursor: auto;
}
.reply-editor-modal-header {
  pointer-events: auto;
  display: flex;
  -webkit-box-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 60px;
}
.reply-cancel-btn {
  margin-right: 15px;
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
  box-shadow: inset 0px 0 0px 1px rgba(223, 223, 223, 1);
  background-color: transparent;
  color: rgba(38, 38, 38, 1);
  font-size: 12px;
  padding: 4px 8px;
}
.reply-cancel-btn:hover {
  box-shadow: inset 0px 0px 0px 1px rgba(10, 132, 255, 1);
  background-color: rgba(242.75, 248.85, 255, 1);
  color: rgba(10, 132, 255, 1);
}
.reply-btn {
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
  background-color: rgba(45, 181, 93, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  padding: 4px 8px;
}
.reply-btn:hover {
  background-color: rgba(38.25, 153.85, 79.05, 1);
  color: rgba(255, 255, 255, 1);
}
.reply-btn > span {
  margin-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
