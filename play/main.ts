import { createApp } from 'vue'
import App from './app.vue'
import ant from 'ant-design-vue'
// import dealAnt from '../dist/deal-ant'
import { router } from './router/index'
import { daForm } from '@deal-ant/components'

import 'ant-design-vue/dist/antd.css'
import '@deal-ant/theme-chalk/src/index.scss'
import './style/index.scss'
const app = createApp(App)

app.use(daForm).use(ant).use(router)
app.mount('#app')
