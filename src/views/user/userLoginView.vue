<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
import { reactive } from 'vue'
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
//表单信息
const form = reactive({
  userAccount: '',
  userPassword: ''
})
const msg = ref('')
const block = ref<SlideVerifyInstance>()

const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again'
  // 刷新
  block.value?.refresh()
}

const onSuccess = (times: number) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`
}

const onFail = () => {
  msg.value = '验证不通过'
}
const onRefresh = () => {
  msg.value = '点击了刷新小图标'
}
const text = '向右滑动->'
const accuracy = 2
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
          :model="form.userAccount"
          placeholder="请输入账号"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          class="login-input"
          :model="form.userPassword"
          placeholder="请输入密码"
          allow-clear
        ></a-input-password>
      </a-form-item>
      <a-form-item>
        <slide-verify
          ref="block"
          class="login-input"
          :slider-text="text"
          :accuracy="accuracy"
          @again="onAgain"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
        ></slide-verify>
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
</style>
