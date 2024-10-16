import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [vue(), vueJsx()],
})
