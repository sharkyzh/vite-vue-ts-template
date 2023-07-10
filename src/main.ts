import { createApp } from 'vue'
import './style.css'
import '@/styles/index.css'
import App from './App.vue'
import router from '@/router'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'

const store = createPinia()
store.use(piniaPluginPersist)

createApp(App).use(store).use(router).mount('#app')
