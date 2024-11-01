<template>
  <a-layout style="height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu :key="subMenu" v-for="subMenu in menuList">
          <template #title>
            {{ subMenu.meta.name }}
          </template>
          <a-menu-item :key="menu.path" v-for="menu in subMenu.children">
            {{ menu.meta.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ overflowY: 'auto' }">
      <div class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </div>

      <a-layout-content :style="contentStyle">
        <div class="main">
          <router-view />
        </div>

        <!-- <keep-alive>
        </keep-alive> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { routes } from '@/router'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const menuList = routes[0].children
const contentStyle = {
  margin: '24px 16px',
  padding: '24px',
  paddingTop: '0',
  background: '#fff',
  minHeight: '280px',
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
}
</script>
<style>
.header {
  padding: 12px 16px;
  background-color: #fff;
  position: sticky;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.main {
  margin-top: 24px;
}
</style>
