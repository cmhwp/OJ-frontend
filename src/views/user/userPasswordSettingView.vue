<script setup lang="ts">
import { reactive } from 'vue'
import router from '@/router'
import { UserControllerService } from '../../../generated'
import { Notification } from '@arco-design/web-vue'

const formReset = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const handleCancel = () => {
  router.back()
}
const handleResetPassword = async () => {
  await UserControllerService.updatePasswordUsingPost(formReset).then(async (res) => {
    if (res.code === 0) {
      Notification.success({
        title: '重置成功',
        content: '密码重置成功，请使用新密码登录。',
        duration: 3000
      })
      await UserControllerService.userLogoutUsingPost()
      // 刷新页面
      await router.go(0)
      await router.push({
        name: '/user/login'
      })
    } else {
      Notification.error({
        title: '重置失败',
        content: '密码重置失败，请稍后重试或联系管理员。' + '错误信息' + res.message,
        duration: 3000
      })
    }
  })
}
</script>

<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div class="user-info-view">
      <div class="user-email">
        <div class="email-title">
          <icon-lock :size="20" style="margin-bottom: 6px; margin-right: 10px" />
          <h3
            style="
              margin-top: 0;
              margin-bottom: 0.5em;
              color: rgba(0, 0, 0, 0.85);
              font-weight: 500;
            "
          >
            更换密码
          </h3>
        </div>
        <hr
          style="
            box-sizing: content-box;
            overflow: visible;
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #eee;
            width: 100%;
            height: 60px;
          "
        />
      </div>
      <div class="email-form">
        <a-form :model="formReset" :style="{ width: '100%' }">
          <a-form-item label="当前密码" name="oldPassword">
            <a-input
              class="email-input"
              placeholder="请输入当前密码"
              v-model="formReset.oldPassword"
              type="password"
            ></a-input>
          </a-form-item>
          <a-form-item label="新密码" name="oldPassword">
            <a-input
              class="email-input"
              placeholder="请输入新密码"
              v-model="formReset.newPassword"
              type="password"
            ></a-input>
          </a-form-item>
          <a-form-item label="新密码(重复)" name="oldPassword">
            <a-input
              class="email-input"
              placeholder="请输入新密码"
              v-model="formReset.confirmPassword"
              type="password"
            ></a-input>
          </a-form-item>
        </a-form>
        <div class="email-btn">
          <a-button style="margin-right: 20px" @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleResetPassword">更换密码</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info-view {
  position: absolute;
  top: 20%;
  width: 35%;
  height: 50%;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;
}
.user-email {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.email-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.email-input {
  height: 40px;
  text-indent: 10px; /* 将文本和光标向右移动 5px */
  border-radius: 10px;
  border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
  background: rgba(255, 255, 255, 1);
}
.disabled {
  color: #ccc;
  cursor: not-allowed;
}
.email-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
