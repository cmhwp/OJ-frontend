<script setup lang="ts">
import image from '@/assets/image/我家哥哥的蛋.png'
import { reactive, ref } from 'vue'
import SlideCode from '@/components/slideCode.vue'
import useUserStore from '@/stores/user/user'
import router from '@/router'
import {
  accountRules,
  Account_Verification,
  Password_Verification
} from '@/utils/userRule/accountConfig'
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

const handleRegisterClick = () => {
  router.push({
    path: '/user/userInfo'
  })
  console.log('Register button clicked')
}
</script>
<template>
  <div id="user-login">
    <div class="user-login-item">
      <icon-qr-code class="icon-qr-code"></icon-qr-code>
    </div>
    <img class="logo" :src="image" alt="KUN OJ" />
    <a-form style="width: 100%; margin: 0 auto" label-align="left" auto-label-width :model="form">
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
          @click="handleRegisterClick"
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
      <a-form-item>
        <span class="login-text">账号密码登录</span>
      </a-form-item>
      <a-form-item>
        <a-space :size="33">
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
          <div style="border: 1px solid #e5e5e5; padding: 10px; border-radius: 50%">
            <icon-more :size="19" />
          </div>
        </a-space>
      </a-form-item>
      <a-form-item class="user-protocol">
        <div>
          <span style="color: #3c3c4399; display: inline-block">注册或登录即代表您同意</span>
          <span style="color: #262626bf; display: inline-block; cursor: pointer">《用户协议》</span>
          <span style="color: #3c3c4399; display: inline-block">和</span>
          <span style="color: #262626bf; display: inline-block; cursor: pointer">
            《隐私协议》</span
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
#user-login {
  width: 370px;
  height: 560px;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;
}
#user-login .user-login-item {
  display: flex;
  justify-content: flex-end;
}
#user-login .icon-qr-code {
  transform: scale(1.2);
  color: #4d535d;
  cursor: pointer;
}
#user-login .icon-qr-code:hover {
  transform: scale(1.2);
  color: #c7ccd7;
  cursor: pointer;
}
#user-login .logo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 24px;
  max-width: 55%; /* 图片的最大宽度为父元素的100%，这样可以实现等比缩放 */
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
#user-login .modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
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
#user-login .login-text {
  display: flex;
  align-items: flex-start;
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
}
</style>
