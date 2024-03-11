<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 100px"/>
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from 'vue'

/**
 * 定义组件属性类型
 */
interface Props {
  value: string
  language?: string
  handleChange: (v: string) => void
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  language: () => 'java',
  handleChange: (v: string) => {
    console.log(v)
  }
})

const codeEditorRef = ref()
const codeEditor = ref()

// const fillValue = () => {
//   if (!codeEditor.value) {
//     return;
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue("新的值");
// };

onMounted(() => {
  if (!codeEditorRef.value) {
    return
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false
    },
    readOnly: false,
    theme: 'vs'
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  })

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue())
  })
})

watch(
  () => [props.value, props.language],
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(), props.language)
      if (codeEditor.value && toRaw(codeEditor.value).getValue() !== props.value)
        toRaw(codeEditor.value).setValue(props.value)
    }
  }
)
</script>

<style scoped>
:deep(.monaco-editor .scroll-decoration) {
  position: fixed;
  background-color: transparent !important;
}
</style>
