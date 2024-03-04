import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
function registerStore(app: App<Element>) {
  app.use(pinia)
}
export default registerStore
