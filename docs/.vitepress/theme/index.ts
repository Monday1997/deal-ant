// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from './components/demo.vue'
import Antd from 'ant-design-vue'

import './style.css'
import './index.css'
import 'ant-design-vue/dist/reset.css'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(Antd)
    app.config.globalProperties.$exampleIns = import.meta.glob('../../example/*.vue')
    app.component('Demo', Demo)
    // ...
  },
} satisfies Theme
