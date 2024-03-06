<script setup lang="ts">
// import useUserStore from '@/stores/user/user'
//
// const loginState = useUserStore()
// const doClick = () => {
//   const userAccount = 'cmh01'
//   const userPassword = '12345678cmh'
//   loginState.loginAccountAction({ userAccount, userPassword }).then(() => {
//     console.log('登录成功')
//   })
// }
import image from '@/assets/image/我家哥哥的蛋.png'
import { reactive, ref } from 'vue'
import SlideCode from '@/components/slideCode.vue'
import useUserStore from '@/stores/user/user'
//表单信息
const form = reactive({
  userAccount: '',
  userPassword: ''
})
const visible = ref(false)
const loginState = useUserStore()
const handleUpdateMsg = (msg: any) => {
  console.log('从子组件接收到的消息:', msg)
  if (msg.code === 1) {
    visible.value = false
    const userAccount = 'cmh01'
    const userPassword = '12345678cmh'
    loginState.loginAccountAction({ userAccount, userPassword }).then(() => {
      console.log('登录成功')
    })
  }
}
const handleLoginClick = () => {
  console.log('Login button clicked') // 确认点击事件
  if (form.userAccount && form.userPassword) {
    visible.value = true
  } else {
    console.log('账号和密码不能为空')
  }
}

const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}
</script>
<template>
  <div id="user-login">
    <div class="user-login-item">
      <icon-qr-code class="icon-qr-code"></icon-qr-code>
    </div>
    <img class="logo" :src="image" alt="KUN OJ" />
    <a-form style="width: 100%; margin: 0 auto" label-align="left" auto-label-width :model="form">
      <a-form-item field="userAccount">
        <a-input
          class="login-input"
          v-model="form.userAccount"
          placeholder="请输入账号"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item>
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
        @ok="handleOk"
        @cancel="handleCancel"
        class="modal"
      >
        <slide-code @update-msg="handleUpdateMsg" class="slide-code"></slide-code>
      </a-modal>
      <a-form-item>
        <a-button type="primary" @click="handleLoginClick">立即登录</a-button>
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
  left: 15%;
}
</style>
