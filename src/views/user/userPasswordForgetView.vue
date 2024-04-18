<script setup lang="ts">
import { reactive, ref, watch, onBeforeUnmount } from 'vue'
import { CodeControllerService, UserControllerService } from '../../../generated'
import { Notification } from '@arco-design/web-vue'
import router from '@/router'

const formReset = reactive({
  userPassword: '',
  email: '',
  code: ''
})

const countdown = ref(0)
const isSending = ref(false) // 控制按钮是否可以点击
let timer: NodeJS.Timeout | null = null

const startCountdown = () => {
  countdown.value = 60
  isSending.value = true // 开始时禁用按钮
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer!)
      timer = null
      isSending.value = false // 计时结束，启用按钮
    }
  }, 1000)
}

watch(countdown, (newValue) => {
  if (newValue === 0 && timer) {
    clearInterval(timer)
    timer = null
  }
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const handleSendEmail = async () => {
  await CodeControllerService.sendResetPasswordCodeUsingGet(formReset.email).then((res) => {
    if (res.code === 0) {
      if (!isSending.value) {
        startCountdown()
      }
      Notification.success({
        title: '发送成功',
        content: '验证码已发送至您的邮箱，请注意查收。',
        duration: 3000
      })
    } else {
      Notification.error({
        title: '发送失败',
        content: '验证码发送失败，请稍后重试或联系管理员。' + '错误信息' + res.message,
        duration: 3000
      })
    }
  })
}
const handleCancel = () => {
  router.back()
}
const handleResetPassword = async () => {
  await UserControllerService.resetPasswordUsingPost(formReset).then((res) => {
    if (res.code === 0) {
      Notification.success({
        title: '重置成功',
        content: '密码重置成功，请使用新密码登录。',
        duration: 3000
      })
      router.push({ name: '/user/login' })
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
            忘记密码
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
          <a-form-item label="新密码" name="userPassword">
            <a-input class="email-input" placeholder="请输入密码" v-model="formReset.userPassword">
              <template #suffix>
                <a-popover>
                  <icon-question-circle />
                  <template #content>
                    <span>重置密码成功后，默认用户账号为邮箱！</span>
                  </template>
                </a-popover>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="邮箱" name="userPassword">
            <a-input class="email-input" placeholder="请输入邮箱" v-model="formReset.email">
              <template #suffix>
                <span
                  style="cursor: pointer"
                  :class="{ disabled: isSending }"
                  @click="handleSendEmail"
                >
                  {{ countdown > 0 ? countdown + 's 后重新发送' : '发送验证码' }}
                </span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="验证码" name="userPassword">
            <a-input
              class="email-input"
              placeholder="请输入验证码"
              v-model="formReset.code"
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
  width: 30%;
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
