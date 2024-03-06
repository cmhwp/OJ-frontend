<script setup lang="ts">
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
import { reactive, ref } from 'vue'

const msg = reactive({
  value: '',
  code: -1 //0,1,2,3表示不同状态
})
const block = ref<SlideVerifyInstance>()

// 定义可以发出的事件
const emit = defineEmits(['updateMsg'])

const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again'
  msg.code = 0
  // 发出事件和当前msg值给父组件
  emit('updateMsg', msg)
  // 刷新
  block.value?.refresh()
}

const onSuccess = (times: number) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`
  msg.code = 1
  // 发出事件和当前msg值给父组件
  emit('updateMsg', msg)
}

const onFail = () => {
  msg.value = '验证不通过'
  msg.code = 2
  // 发出事件和当前msg值给父组件
  emit('updateMsg', msg)
}
const onRefresh = () => {
  msg.value = '点击了刷新小图标'
  msg.code = 3
  // 发出事件和当前msg值给父组件
  emit('updateMsg', msg)
}
const text = '向右滑动->'
const accuracy = 2
</script>

<template>
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
</template>

<style scoped></style>
