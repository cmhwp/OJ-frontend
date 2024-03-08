<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FileItem } from '@arco-design/web-vue'
const visible = ref(false)
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
const props = defineProps({
  modalVisible: Boolean
})
watch(
  () => props.modalVisible,
  (newValue) => {
    visible.value = newValue
    console.log('我收到变化了', visible.value)
  }
)
const emit = defineEmits(['update-modalVisible', 'update-avatar'])
const handleOk = () => {
  console.log(file.value)
  emit('update-modalVisible', false)
  emit('update-avatar', file.value)
}

const handleCancel = () => {
  emit('update-modalVisible', false)
}
</script>

<template>
  <div class="avatar-modal">
    <a-modal
      v-model:visible="visible"
      title="头像上传"
      :width="250"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-upload
        action="http://localhost:5173"
        :fileList="file ? [file] : []"
        :show-file-list="false"
        @change="onChange"
        @progress="onProgress"
        class="avatar-upload"
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
    </a-modal>
  </div>
</template>

<style scoped>
.avatar-upload {
  display: flex;
  justify-content: center;
}
</style>
