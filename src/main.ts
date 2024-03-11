import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/reset.css'
import App from './App.vue'
import router from './router'
import stores from '@/stores'
import 'bytemd/dist/index.css'
const app = createApp(App)
app.use(stores)
import '@/utils/access'
app.use(router)
app.mount('#app')
