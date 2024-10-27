import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    children: [
      {
        path: 'main-com',
        name: 'mainCom',
        meta: {
          name: '基础组件',
        },
        children: [
          {
            path: '/main-com/da-form',
            name: 'dafrom',
            meta: {
              name: 'da-form',
            },
            component: () => import('@/pages/da-form.vue'),
          },
        ],
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
