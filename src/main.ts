import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/reset.css'
import App from './App.vue'
import router from './router'
import stores from '@/stores'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import '@/plugins/axios'
hljs.registerLanguage('Java', java)
const app = createApp(App)
app.use(stores)
import '@/utils/access'
app.use(router)
app.config.compilerOptions.isCustomElement = (tag) =>
  tag.startsWith('highlightKeyword') || tag === 'span'
app.mount('#app')
app.use(hljsVuePlugin)
