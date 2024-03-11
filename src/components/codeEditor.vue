<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/**
 * 定义组件属性类型
 */
interface Props {
  val: string
  language?: string
  handleChange: (v: string) => void
  line: (v: string) => void
  column: (v: string) => void
  initialise: boolean
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  val: () => 'hello,word',
  language: () => 'java',
  handleChange: (v: string) => {
    console.log(v)
  },
  line: (v: string) => {
    console.log(v)
  },
  column: (v: string) => {
    console.log(v)
  },
  initialise: false
})
const codeEditorRef = ref()
const codeEditor = ref()

const isInitialise = ref(props.initialise)

// 将代码保存到本地
const saveToLocalStorage = (value: string) => {
  const newId = route.params.id as string
  localStorage.setItem(newId, value)
}

// 获取当前题目Id的代码缓存
const getFromLocalStorage = () => {
  const newId = route.params.id as string
  return localStorage.getItem(newId)
}

// const fillValue = () => {
//   // 改变值
//   toRaw(codeEditor.value).setValue(props.value);
// };

onMounted(() => {
  if (!codeEditorRef.value) {
    return
  }

  monaco.languages.register({ id: props.language })
  monaco.languages.setMonarchTokensProvider('java', {
    ignoreCase: false, // 忽略大小写
    // 关键词
    defaultToken: '',
    keywords: [
      'abstract',
      'continue',
      'switch',
      'assert',
      'goto',
      'private',
      'this',
      'protected',
      'public',
      'enum',
      'interface',
      'static',
      'class',
      'finally',
      'const',
      'super',
      'true',
      'false',
      'null'
    ],
    // 类型关键词
    typeKeywords: ['boolean', 'double', 'byte', 'int', 'short', 'char', 'void', 'long', 'float'],

    operators: [
      '=',
      '>',
      '<',
      '!',
      '~',
      '?',
      ':',
      '==',
      '<=',
      '>=',
      '!=',
      '&&',
      '||',
      '++',
      '--',
      '+',
      '-',
      '*',
      '/',
      '&',
      '|',
      '^',
      '%',
      '<<',
      '>>',
      '>>>',
      '+=',
      '-=',
      '*=',
      '/=',
      '&=',
      '|=',
      '^=',
      '%=',
      '<<=',
      '>>=',
      '>>>='
    ],

    Stings: [
      'return',
      'new',
      'if',
      'else',
      'while',
      'for',
      'try',
      'break',
      'catch',
      'do',
      'break',
      'throw'
    ],

    // 符号
    symbols: /[=><!~?:&|+\-*/^%]+/,

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
      root: [
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              '@typeKeywords': 'keyword.escape',
              '@keywords': 'keyword',
              '@Stings': 'Stings',
              '@default': 'identifier'
            }
          }
        ],
        [/[A-Z][\w$]*/, 'type.identifier'],
        [/@\s*[a-zA-Z_$][\w$]*/, { token: 'annotation', log: 'annotation token: $0' }],
        // numbers
        [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // whitespace
        { include: '@whitespace' },

        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
        [/'/, 'string.invalid'],

        // delimiters and operators
        [/[{}()[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [
          /@symbols/,
          {
            cases: {
              '@operators': 'operator',
              '@default': ''
            }
          }
        ],
        [/[;,.]/, 'delimiter']
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],
      comment: [
        [/[^/*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'], // nested comment
        ['\\*/', 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],
      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment']
      ]
    }
  })

  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.val,
    language: props.language, //指定编辑器的语言模式
    automaticLayout: true, //编辑器会自动调整布局以适应内容的大小。
    colorDecorators: true, //编辑器会为代码提供语法高亮和颜色标记。
    minimap: {
      enabled: false //用于控制是否启用小地图以及其相关设置。
    },
    fontSize: 14, // 设置编辑器字体的大小。
    //readOnly: true, // 只读
    quickSuggestions: true, // 打开快速代码提示
    formatOnType: true, //自动格式化
    lineNumbers: 'on', // 打开行号显示
    wordWrap: 'off', // 打开自动换行功能
    contextmenu: false, // 禁用右键菜单
    scrollbar: {
      verticalScrollbarSize: 8, // 垂直滚动条宽度，默认px
      horizontalScrollbarSize: 8 // 水平滚动条高度
    },
    // renderWhitespace: "boundary", // 显示边界空白字符
    folding: true // 开启代码折叠功能
    // foldingStrategy: "indentation", // 使用缩进进行代码折叠
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  })
  monaco.editor.defineTheme('my-theme', {
    base: 'vs',
    inherit: true, // 是否继承默认主题的样式
    rules: [
      { token: 'comment', foreground: '#098658', fontStyle: 'italic' }, // 注解颜色
      { token: 'keyword', foreground: '#0000FF' }, // 关键字颜色
      { token: 'Stings', foreground: '#af00d8' }, // 字符串
      { token: 'type.identifier', foreground: '#267f99' },
      { token: 'keyword.escape', foreground: '#267f99' }, // 自定义
      { token: 'brackets', foreground: '#FFFFFF' }, // annotation
      { token: 'annotation', foreground: '#1EBA40' }, // 注解
      { token: 'number.float', foreground: '#098658' }, // 浮点数
      { token: 'number.hex', foreground: '#098658' }, // 十六进制数
      { token: 'number', foreground: '#098658' }, // 十六进制数
      { token: 'delimiter', foreground: '#000000' }, // 分隔符
      { token: 'operator', foreground: '#000000' }, // 符号
      { token: 'string.invalid', foreground: '#a31515' }, // 无效字符
      { token: 'string.quote', foreground: '#a31515' }, // 字符串的引号字符
      { token: 'type', foreground: '#a31515' },
      { token: 'identifier', foreground: '#000000' }
    ],
    colors: {
      'editor.background': '#FFFFFF', // 背景颜色
      'editor.foreground': '#262626', // 字体颜色
      'editorCursor.foreground': '#262626', // 光标颜色
      // "editor.lineHighlightBackground": "#transparent", //  当前行背景颜色
      'editorLineNumber.foreground': '#02B128', // 行号颜色
      'editor.selectionBackground': '#ADD6FF' // 选中的内容颜色
    }
  })
  monaco.editor.setTheme('my-theme')

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    const value = toRaw(codeEditor.value).getValue()
    props.handleChange(value)
    saveToLocalStorage(value)
  })

  // 监听光标位置变化事件
  codeEditor.value.onDidChangeCursorPosition(() => {
    const position = codeEditor.value.getPosition()
    props.line(position.lineNumber)
    props.column(position.column)
  })
})

watch(
  () => [props.val, props.language, props.initialise],
  () => {
    monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(), props.language)
    if (codeEditor.value && toRaw(codeEditor.value).getValue() !== props.val) {
      if (!getFromLocalStorage()) {
        toRaw(codeEditor.value).setValue(props.val)
      } else {
        toRaw(codeEditor.value).setValue(getFromLocalStorage())
      }
    }
    if (isInitialise.value) {
      toRaw(codeEditor.value).setValue(props.val)
      isInitialise.value = !isInitialise.value
    }
  }
)
</script>

<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<style scoped>
#code-editor {
  height: 100%;
}

:deep(.monaco-editor .scroll-decoration) {
  position: fixed;
}
</style>
