<script setup lang="ts">
//@ts-ignore
import { Editor } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import { withDefaults, defineProps } from 'vue'
import math from '@bytemd/plugin-math'
import gfm from '@bytemd/plugin-gfm'

const plugins = [
  highlight(),
  gfm(),
  math()

  // Add more plugins here
]
interface Props {
  mode?: string
  value: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  mode: () => 'split', // 默认模式
  handleChange: (v: string) => {
    console.log(v)
  }
})
</script>

<template>
  <div class="md-editor">
    <Editor :value="value" :mode="mode" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<style scoped>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
