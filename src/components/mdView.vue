<template>
  <Viewer :value="props.value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
//@ts-ignore
import { Viewer } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import { withDefaults, defineProps } from 'vue'

const plugins = [
  highlight(),
  gfm()
  // Add more plugins here
]

interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: () => ''
})
</script>

<style></style>
