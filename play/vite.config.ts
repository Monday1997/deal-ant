import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      'deal-ant': path.resolve(__dirname, '../dist/deal-ant/*'),
    },
  },
  plugins: [vue(), vueJsx()],
})
