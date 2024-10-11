import { createApp } from 'vue';
import App from './app.vue';
import { daButton } from '@deal-ant/components';
console.log(daButton)
const app = createApp(App)
app.use(daButton)

app.mount('#app')
