<script setup lang="ts">
import { ref, nextTick } from 'vue'
import router from '@/router'
import { FileControllerService, PostControllerService } from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import type { FileItem } from '@arco-design/web-vue'
const mdValue = ref('')
const handleOnChange = (v: string) => {
  mdValue.value = v
}
const handleCancelClick = () => {
  router.back()
}
// Define an interface for the tag object
interface Tag {
  text: string
  color: string
}

const tags = ref<Tag[]>([])
const inputRef = ref(null)
const showInput = ref(false)
const inputVal = ref('')

const handleEdit = () => {
  showInput.value = true

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
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
const handleAdd = () => {
  if (inputVal.value) {
    const randomColor =
      Math.random() > 0.5
        ? colors[Math.floor(Math.random() * colors.length)]
        : custom[Math.floor(Math.random() * custom.length)]
    tags.value.push({ text: inputVal.value.trim(), color: randomColor })
    inputVal.value = ''
  }
  showInput.value = false
}

const handleRemove = (key: any) => {
  tags.value = tags.value.filter((tag) => tag !== key)
  console.log(tags.value)
}
const formRef = ref({
  title: '',
  tags: [] as string[],
  content: '',
  cover: '',
  summary: ''
})
//帖子图片
const file = ref()
const onChange = (fileList: FileItem[], fileItem: FileItem) => {
  if (fileItem.file) {
    file.value = {
      ...fileItem,
      url: URL.createObjectURL(fileItem.file)
    }
  }
}
const onProgress = (currentFile: FileItem) => {
  file.value = currentFile
}
const handleSubmit = async () => {
  formRef.value.tags = tags.value.map((tag) => tag.text)
  formRef.value.content = mdValue.value
  if (file.value && file.value.file) {
    await FileControllerService.uploadFileUsingPost(file.value.file, 'user_avatar').then((res) => {
      if (res.code === 0) {
        formRef.value.cover = res.data
        console.log(formRef.value)
      } else {
        message.error(res.msg)
      }
    })
  }
  await PostControllerService.addPostUsingPost(formRef.value).then(async (res) => {
    if (res.code === 0) {
      message.success('发布成功')
      await router.back()
    } else {
      message.error(res.msg)
    }
  })
}
</script>

<template>
  <div id="add-post-view">
    <div class="top">
      <div class="title">
        <a-input
          class="title-input"
          placeholder="请在此处输入标题···"
          v-model="formRef.title"
        ></a-input>
        <a-button class="cancel-btn" @click="handleCancelClick"><span>取消</span></a-button>
        <button class="submit-btn" @click="handleSubmit"><span>发起讨论</span></button>
      </div>
      <div class="tag">
        <div style="with: 1px; margin-right: 10px"></div>
        <div class="tag-div" v-for="tag of tags" :key="tag.text" style="padding: 0 10px">
          <a-tag @close="handleRemove(tag)" closable :color="tag.color">
            {{ tag.text }}
          </a-tag>
        </div>
        <a-input
          v-if="showInput"
          ref="inputRef"
          :style="{ width: '90px' }"
          size="mini"
          v-model.trim="inputVal"
          @keyup.enter="handleAdd"
          @blur="handleAdd"
        />
        <a-tag
          v-else
          :style="{
            width: '90px',
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer'
          }"
          @click="handleEdit"
        >
          <template #icon>
            <icon-plus
              style="background-color: rgba(0, 122, 255, 1); color: #ffffff; border-radius: 50%"
            />
          </template>
          Add Tag
        </a-tag>
      </div>
    </div>
    <div class="title">
      <a-input
        class="title-input"
        placeholder="请在此处输入文章摘要···"
        v-model="formRef.summary"
      ></a-input>
    </div>
    <div class="cover">
      <span class="cover-span">点击上传文章封面</span>
      <a-upload
        class="cover-upload"
        action="/"
        :fileList="file ? [file] : []"
        :show-file-list="false"
        @change="onChange"
        @progress="onProgress"
      >
        <template #upload-button>
          <div
            :class="`arco-upload-list-item${
              file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
            }`"
          >
            <div class="arco-upload-list-picture custom-upload-avatar" v-if="file && file.url">
              <img :src="file.url" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
              <a-progress
                v-if="file.status === 'uploading' && file.percent < 100"
                :percent="file.percent"
                type="circle"
                size="mini"
                :style="{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)'
                }"
              />
            </div>
            <div class="arco-upload-picture-card" v-else>
              <div class="arco-upload-picture-card-text">
                <IconPlus />
                <div style="margin-top: 10px; font-weight: 600">Upload</div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
    </div>
    <div class="content">
      <ai-editor
        :value="mdValue"
        :handleChange="handleOnChange"
        style="max-height: 600px"
      ></ai-editor>
    </div>
  </div>
</template>

<style scoped>
#add-post-view {
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: auto;
  position: fixed;
  inset: 0px;
  box-sizing: border-box;
}
.top {
  margin-bottom: 10px;
  pointer-events: auto;
}
.title {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 60px;
}
.title .title-input {
  flex: 1 1 0px;
  font-size: 16px;
  padding: 10px 0px;
  font-weight: bold;
  border: none;
  outline: none;
  background: transparent;
  overflow: visible;
  margin-right: 15px;
}
.cancel-btn {
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
  box-shadow: inset 0px 0px 0px 1px rgba(223, 223, 223, 1);
  background-color: transparent;
  color: rgba(38, 38, 38, 1);
  font-size: 12px;
  padding: 4px 8px;
  margin-right: 15px;
}
.cancel-btn > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.submit-btn {
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
  background-color: rgba(25, 181, 93, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  padding: 4px 8px;
}
.submit-btn :hover {
  background-color: rgba(38.25, 153.85, 79.05, 1);
  box-sizing: border-box;
}
.submit-btn > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tag {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 6px 4px;
  white-space: nowrap;
  flex-wrap: wrap;
}
.cover {
  display: flex;
  -webkit-box-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 100px;
}
.cover .cover-span {
  color: rgba(63, 60, 60, 0.73);
}
.content {
  display: flex;
  flex-direction: row;
  flex: 1 1 0px;
  pointer-events: auto;
  justify-content: center;
}
</style>
