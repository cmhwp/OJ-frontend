<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FileItem } from '@arco-design/web-vue'
import { UserControllerService } from '../../../generated'
const uploadFile = ref<FileItem>()
const userInfoForm = reactive({
  userName: '',
  userProfile: ''
})
const current = ref(1)
const disabled = ref(false)
const showEditIcon = ref(true)
const onPrev = () => {
  current.value = Math.max(1, current.value - 1)
  if (current.value === 1) {
    disabled.value = false
    showEditIcon.value = true // 显示头像编辑图标
  }
}
let userAvatar =
  'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
const onNext = async () => {
  current.value = Math.max(2, current.value + 1)
  disabled.value = true
  showEditIcon.value = false // 隐藏头像编辑图标
  if (current.value === 3) {
    const { userName, userProfile } = userInfoForm
    userAvatar = uploadFile.value?.url ?? userAvatar
    await UserControllerService.updateMyUserUsingPost({ userAvatar, userName, userProfile }).then(
      (res) => {
        console.log(res)
      }
    )
  }
}
const setCurrent = (currentStep: number) => {
  current.value = currentStep
}

const modalVisible = ref(false)
const handleAvatarClick = () => {
  console.log('头像被点击')
  modalVisible.value = true
}
const handleUpdateModalVisible = (flag: boolean) => {
  modalVisible.value = flag
}
const handleUpdateAvatar = (value: any) => {
  uploadFile.value = value
  console.log('上传头像成功', uploadFile.value)
}
</script>

<template>
  <div class="user-info-view">
    <div class="user-inform">
      <span>请按照提示完善个人信息</span>
    </div>
    <div class="user-pending">
      <a-steps changeable :current="current" @change="setCurrent">
        <!--todo
        步骤条点击
        -->
        <a-step class="step" description="This is a description" disabled>Succeeded</a-step>
        <a-step description="This is a description" disabled>Processing</a-step>
      </a-steps>
    </div>
    <div>
      <div style="line-height: 100px" class="user-input-content">
        <div class="user-avatar">
          <div class="avatar-inform">
            <span>修改头像</span>
          </div>
          <div class="avatar-img">
            <a-avatar
              trigger-type="mask"
              :size="64"
              :aria-disabled="disabled"
              @click="handleAvatarClick"
            >
              <img alt="avatar" :src="userAvatar" />
              <template #trigger-icon v-if="showEditIcon">
                <IconEdit />
              </template>
            </a-avatar>
            <avatar-upload-modal
              v-show="modalVisible"
              :modalVisible="modalVisible"
              @update-modalVisible="handleUpdateModalVisible"
              @update-avatar="handleUpdateAvatar"
            ></avatar-upload-modal>
          </div>
        </div>
        <a-form
          style="width: 40%; margin: 0 auto"
          label-align="left"
          auto-label-width
          :model="userInfoForm"
        >
          <a-form-item>
            <a-input
              class="user-input"
              v-model="userInfoForm.userName"
              placeholder="请输入昵称"
              allow-clear
              :disabled="disabled"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-textarea
              class="user-input"
              placeholder="请输入个人简介"
              auto-size
              allow-clear
              show-word-limit
              :max-length="100"
              style="height: 100px"
              v-model="userInfoForm.userProfile"
              :disabled="disabled"
            ></a-textarea>
          </a-form-item>
          <a-form-item>
            <div class="btn-bottom">
              <a-space size="large">
                <a-button
                  type="secondary"
                  :disabled="current <= 1"
                  @click="onPrev"
                  class="back-btn"
                >
                  <IconLeft /> Back
                </a-button>
                <a-button type="primary" :disabled="current >= 3" @click="onNext" class="next-btn">
                  Next <IconRight />
                </a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info-view {
  position: absolute;
  width: 60%;
  height: 50%;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;
}
.user-info-view .user-inform {
  position: relative;
  width: 100%;
  bottom: 100px;
}
.user-info-view .avatar-inform > span {
  color: #86909c;
}
.user-info-view .user-pending {
  position: relative;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  top: -10px;
}
.user-info-view .user-input-content .user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 175px;
}
.user-info-view .user-input {
  text-indent: 10px; /* 将文本和光标向右移动 5px */
  border-radius: 10px;
  border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
  background: rgba(255, 255, 255, 1);
}
.user-info-view .btn-bottom {
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: var(--color-bg-2);
}
.user-info-view .btn-bottom .next-btn {
  border-radius: 15px;
  background-color: rgb(36, 37, 40);
}
.user-info-view .btn-bottom .next-btn:hover {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
    rgb(36, 37, 40) !important;
}
.user-info-view .btn-bottom .back-btn {
  border-radius: 15px;
}
.user-info-view .btn-bottom .back-btn:hover {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), rgb(255, 255, 255) !important;
}
</style>
