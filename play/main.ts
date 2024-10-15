import { createApp } from 'vue'
import App from './app.vue'
// import { daButton } from '@deal-ant/components';
import dealAnt from '../dist/deal-ant'
const app = createApp(App)
console.log(dealAnt)

app.use(dealAnt)

app.mount('#app')
