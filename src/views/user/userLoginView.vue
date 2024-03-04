<script setup lang="ts">
import useUserStore from '@/stores/user/user'

const loginState = useUserStore()
const doClick = () => {
  const userAccount = 'cmh01'
  const userPassword = '12345678cmh'
  loginState.loginAccountAction({ userAccount, userPassword }).then(() => {
    console.log('登录成功')
  })
}
</script>
<template>
  <div class="user-login">
    <button @click="doClick">立即登录</button>
  </div>
</template>
<style scoped></style>
