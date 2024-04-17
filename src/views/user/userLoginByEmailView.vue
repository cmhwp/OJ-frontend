<script setup lang="ts"></script>

<template>
  <div class="user-info-view">
    <div class="user-email">
      <div class="email-title">
        <h3
          style="margin-top: 0; margin-bottom: 0.5em; color: rgba(0, 0, 0, 0.85); font-weight: 500"
        >
          邮箱一键登录
        </h3>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<style scoped>
.user-info-view {
  position: absolute;
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
</style>
