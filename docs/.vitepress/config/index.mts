import { defineConfig } from 'vitepress'
import { mdPlugin } from '../plugins'
import sidebar from './sidebar'
export default defineConfig({
  title: 'easy-com',
  description: '一个符合业务需求的ant二次开发版',
  rewrites:{
    // 'components/markdown-examples.md':'ddd/index.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/zh-CN/components/daForm' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
