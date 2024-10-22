import { defineConfig } from 'vitepress'
// import markDownDemo from './plugins/demo.ts'
// https://vitepress.dev/reference/site-config
import { mdPlugin } from './plugins'
export default defineConfig({
  title: 'easy-com',
  description: '一个符合业务需求的ant二次开发版',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
