<script setup lang="ts">
import image from '@/assets/logo.svg'
import { reactive, ref, watch, onBeforeUnmount } from 'vue'
import SlideCode from '@/components/slideCode.vue'
import useUserStore from '@/stores/user/user'
import router from '@/router'
import {
  accountRules,
  Account_Verification,
  Password_Verification
} from '@/utils/userRule/accountConfig'
import { CodeControllerService } from '../../../generated'
import { Notification } from '@arco-design/web-vue'
//表单信息
const form = reactive({
  userAccount: '',
  userPassword: ''
})
const visible = ref(false)
const loginState = useUserStore()
const handleUpdateMsg = async (msg: any) => {
  console.log('从子组件接收到的消息:', msg)
  if (msg.code === 1) {
    visible.value = false
    const { userAccount, userPassword } = form
    await loginState.loginAccountAction({ userAccount, userPassword }).then(() => {
      console.log('登录成功')
    })
  }
}
const handleLoginClick = () => {
  if (Account_Verification.value && Password_Verification.value) {
    console.log('Login button clicked') // 确认点击事件
    if (form.userAccount && form.userPassword) {
      visible.value = true
    } else {
      console.log('账号和密码不能为空')
    }
  }
}
// 注册按钮点击事件
const formRegister = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  email: '',
  code: ''
})
const handleRegisterClick = async () => {
  await loginState.userRegisterAction(formRegister)
}
const defaultValue = ref(1)
const toggleRegisterClick = () => {
  defaultValue.value = 2
}
const handleChoose = () => {
  if (defaultValue.value === 1) {
    defaultValue.value = 2
  } else {
    defaultValue.value = 1
  }
}
//邮箱登录
const formEmail = reactive({
  email: '',
  code: ''
})
const handleEmailClick = () => {
  modalVisible.value = true
}
const handleSendEmail = async () => {
  await CodeControllerService.sendEmailLoginCodeUsingGet(formEmail.email).then((res) => {
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
const modalVisible = ref(false)

const handleOk = async () => {
  modalVisible.value = false
  await loginState.userLoginByEmailAction(formEmail)
  console.log(formEmail)
}
const handleCancel = () => {
  modalVisible.value = false
}
//计时器
const countdown = ref(0)
const isSending = ref(false) // 控制按钮是否可以点击
let timer: NodeJS.Timeout | null = null // 手动声明 timer 变量的类型
const startCountdown = () => {
  countdown.value = 60 // 设置倒计时时间
  isSending.value = true // 开始时禁用按钮
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer!) // 倒计时结束，清除计时器
      timer = null
      isSending.value = false // 计时结束，启用按钮
    }
  }, 1000) // 每隔一秒执行一次倒计时
}

watch(countdown, (newValue) => {
  // 在倒计时结束后清除计时器
  if (newValue === 0 && timer) {
    clearInterval(timer)
    timer = null
  }
})

onBeforeUnmount(() => {
  // 在组件销毁前清除计时器，避免内存泄漏
  if (timer) {
    clearInterval(timer)
  }
})
const handleSendEmailRegister = async () => {
  await CodeControllerService.sendRegisterCodeUsingGet(formRegister.email).then((res) => {
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
const toggleToLogin = () => {
  defaultValue.value = 1
}
</script>
<template>
  <div id="user-login">
    <img class="logo" :src="image" alt="KUN OJ" />
    <a-tabs
      size="large"
      style="width: 100%"
      :active-key="defaultValue"
      :default-active-key="defaultValue"
      @tab-click="handleChoose"
    >
      <a-tab-pane :key="1" title="账号登录">
        <a-form
          style="width: 100%; margin: 0 auto"
          label-align="left"
          auto-label-width
          :model="form"
        >
          <a-form-item field="userAccount" :rules="accountRules.userAccount">
            <a-input
              class="login-input"
              v-model="form.userAccount"
              placeholder="请输入账号"
              allow-clear
            ></a-input>
          </a-form-item>
          <a-form-item field="userPassword" :rules="accountRules.userPassword" ref="formRef">
            <a-input-password
              class="login-input"
              v-model="form.userPassword"
              placeholder="请输入密码"
              allow-clear
            ></a-input-password>
          </a-form-item>
          <a-modal
            v-model:visible="visible"
            title="滑动验证"
            class="modal"
            :cancel-button-props="{ style: { display: 'none' } }"
            :ok-button-props="{ style: { display: 'none' } }"
          >
            <slide-code @update-msg="handleUpdateMsg" class="slide-code"></slide-code>
          </a-modal>
          <a-form-item style="display: flex">
            <a-button
              size="large"
              type="dashed"
              style="width: 168px; border-radius: 10px 0 0 10px"
              @click="toggleRegisterClick"
              class="register-btn"
            >
              注册
            </a-button>
            <a-button
              @click="handleLoginClick"
              size="large"
              type="primary"
              html-type="submit"
              class="login-btn"
            >
              登录
            </a-button>
          </a-form-item>
          <div style="display: flex; justify-content: space-around; margin-bottom: 10px">
            <span class="login-text" style="margin-left: -50px">账号密码登录</span>
            <span class="login-text" style="margin-right: -60px; cursor: pointer">
              <router-link to="forget">忘记密码</router-link>
            </span>
          </div>
          <a-form-item>
            <a-space :size="30">
              <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
                <icon-qq :size="19" style="color: #4a9afd; cursor: pointer" />
              </div>
              <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
                <icon-github :size="19" style="color: #202020; cursor: pointer" />
              </div>
              <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
                <icon-weibo-circle-fill :size="19" style="color: #e90e24; cursor: pointer" />
              </div>
              <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
                <icon-wechat :size="19" style="color: #00ca00; cursor: pointer" />
              </div>
              <a-popover position="rb">
                <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
                  <icon-more :size="19" />
                </div>
                <template #content>
                  <icon-email
                    :size="25"
                    style="color: rgb(254, 224, 130)"
                    @click="handleEmailClick"
                  />
                </template>
              </a-popover>
            </a-space>
          </a-form-item>
          <a-form-item class="user-protocol">
            <div>
              <span style="color: #3c3c4399; display: inline-block">注册或登录即代表您同意</span>
              <span style="color: #262626bf; display: inline-block; cursor: pointer"
                >《用户协议》</span
              >
              <span style="color: #3c3c4399; display: inline-block">和</span>
              <span style="color: #262626bf; display: inline-block; cursor: pointer">
                《隐私协议》</span
              >
            </div>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane :key="2" title="账号注册">
        <a-form label-align="left" :model="formRegister">
          <a-form-item field="userAccount" :rules="accountRules.userAccount">
            <a-input
              style="height: 40px"
              placeholder="请输入账号"
              class="login-input"
              v-model="formRegister.userAccount"
            ></a-input>
          </a-form-item>
          <a-form-item
            field="userPassword"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 8, max: 16, message: '密码长度必须为8-16位' }
            ]"
          >
            <a-input-password
              allow-clear
              style="height: 40px"
              placeholder="请输入密码"
              class="login-input"
              v-model="formRegister.userPassword"
            ></a-input-password>
          </a-form-item>
          <a-form-item
            field="checkPassword"
            :rules="[
              { required: true, message: '请再次输入密码' },
              { min: 8, max: 16, message: '密码长度必须为8-16位' }
            ]"
          >
            <a-input-password
              allow-clear
              style="height: 40px"
              placeholder="请再次输入密码"
              class="login-input"
              v-model="formRegister.checkPassword"
            ></a-input-password>
          </a-form-item>
          <a-form-item
            field="email"
            :rules="[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
            ]"
          >
            <a-input
              allow-clear
              style="height: 40px"
              placeholder="请输入邮箱"
              class="login-input"
              v-model="formRegister.email"
            >
              <template #suffix>
                <span
                  style="cursor: pointer"
                  :class="{ disabled: isSending }"
                  @click="handleSendEmailRegister"
                >
                  {{ countdown > 0 ? countdown + 's 后重新发送' : '发送验证码' }}
                </span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="verificationCode"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <a-input
              allow-clear
              style="height: 40px"
              placeholder="请输入验证码"
              class="login-input"
              v-model="formRegister.code"
            ></a-input>
          </a-form-item>
          <div style="display: flex; justify-content: flex-end">
            <span style="cursor: pointer; color: #262626bf; font-size: 13px" @click="toggleToLogin"
              >已有账号点击登录~</span
            >
          </div>
          <a-form-item style="width: 120%">
            <a-button @click="handleRegisterClick" size="large" class="reg-btn">
              <span>注册</span>
            </a-button>
          </a-form-item>
          <a-form-item
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-left: 10px;
            "
          >
            <div style="white-space: nowrap">
              <span style="color: #3c3c4399; display: inline-block">注册或登录即代表您同意</span>
              <span style="color: #262626bf; display: inline-block; cursor: pointer"
                >《用户协议》</span
              >
              <span style="color: #3c3c4399; display: inline-block">和</span>
              <span style="color: #262626bf; display: inline-block; cursor: pointer">
                《隐私协议》</span
              >
            </div>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model:visible="modalVisible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        <div style="display: flex; justify-content: center; align-items: center">
          <icon-email :size="25" style="color: rgb(254, 224, 130); margin-right: 5px" />
          <h3>邮箱一键登录</h3>
        </div>
      </template>
      <div>
        <a-form
          :model="formEmail"
          style="width: 100%; margin: 0 auto"
          label-align="left"
          auto-label-width
        >
          <a-form-item field="email">
            <a-input
              class="login-input-email"
              placeholder="请输入邮箱"
              allow-clear
              v-model="formEmail.email"
            >
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
          <a-form-item field="code">
            <a-input
              class="login-input-email"
              placeholder="请输入验证码"
              allow-clear
              v-model="formEmail.code"
            >
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<style scoped>
#user-login {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  height: 560px;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;
}
:deep(.arco-tabs-nav-tab) {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
}
#user-login .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  max-width: 35%; /* 图片的最大宽度为父元素的100%，这样可以实现等比缩放 */
  height: auto;
}
#user-login .login-input {
  width: 330px;
  height: 40px;
  text-indent: 10px; /* 将文本和光标向右移动 5px */
  border-radius: 10px;
  border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
  background: rgba(255, 255, 255, 1);
}
.login-input-email {
  height: 40px;
  text-align: center;
  text-indent: 10px; /* 将文本和光标向右移动 5px */
  border-radius: 10px;
  border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
  background: rgba(255, 255, 255, 1);
  width: 90%;
}
:deep(.arco-input-wrapper .arco-input) {
  width: 300px;
}
#user-login .modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.reg-btn {
  border: none;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  opacity: 1;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  padding: 8px 12px;
  margin: 8px 0px 16px;
  background: rgb(36, 37, 40);
  border-radius: 8px;
  line-height: 24px;
  transition: background 0.3s ease 0s;
  font-weight: 500;
}
.reg-btn:hover {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
    rgb(36, 37, 40) !important;
  color: white;
}
#user-login .slide-code {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-verify[data-v-f61c42f2] {
  position: relative;
  left: 18%;
}
:deep(.arco-col-5) {
  width: 30%;
  flex: 0;
}
#user-login .login-text {
  color: #262626bf;
}
#user-login .login-btn {
  width: 168px;
  border-radius: 0 10px 10px 0;
  background-color: rgb(36, 37, 40);
}
#user-login .login-btn:hover {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
    rgb(36, 37, 40) !important;
}
#user-login .register-btn:hover {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), rgb(255, 255, 255) !important;
}
#user-login .user-protocol {
  display: flex;
  justify-content: center;
  align-items: center;
}
.disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
