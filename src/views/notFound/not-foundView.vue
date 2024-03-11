<script setup lang="ts">
import MdEditor from '@/components/mdEditor.vue'
import { ref } from 'vue'

const mdValue = ref('')
const codeValue = ref('')
const handleOnChange = (v: string) => {
  mdValue.value = v
}
const handleOnChangeCode = (v: string) => {
  codeValue.value = v
}
</script>

<template>
  <div>
    <md-editor :value="mdValue" :handleChange="handleOnChange"></md-editor>
    <code-editor :value="codeValue" :handleChange="handleOnChangeCode"></code-editor>
  </div>
</template>

<style scoped></style>
