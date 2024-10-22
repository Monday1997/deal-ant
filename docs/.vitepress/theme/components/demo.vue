<template>
  <div v-html="decoedDescription"></div>
  <div class="border-box">
    <div class="com-box">
      <component :is="exampleIns" />
    </div>
    <a-divider></a-divider>
    <div class="tool-box flex-wrap flex-x-center flex-y-center">
      <a-space>
        <a-tooltip placement="top" :title="sourceShow ? '隐藏代码' : '展示代码'">
          <EllipsisOutlined class="cursor" @click="toogleSource" />
        </a-tooltip>
        <a-tooltip placement="top" title="复制">
          <CopyOutlined class="cursor" @click="copyCode" />
        </a-tooltip>
      </a-space>
    </div>
    <div class="source-box">
      <div v-show="sourceShow" v-html="decoded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onBeforeMount, getCurrentInstance, computed, ref } from 'vue'
import { isClient, useClipboard } from '@vueuse/core'

import { EllipsisOutlined, CopyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
interface IDemoProps {
  path: string
  source?: string
  rawSource?: string
  description: string
}
const props = defineProps<IDemoProps>()

const { proxy } = getCurrentInstance()
const exampleIns = shallowRef()
const decoded = computed(() => decodeURIComponent(props.source!))
const decoedDescription = computed(() => decodeURIComponent(props.description))
function loadCom() {
  console.log('props', props)
  const loader = proxy.$exampleIns['../../example/' + props.path + '.vue'] //赋值时加入了这个../../
  if (loader) {
    loader().then((module) => {
      exampleIns.value = module.default
    })
  }
}

const sourceShow = ref(false)
function toogleSource() {
  sourceShow.value = !sourceShow.value
}
const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})
async function copyCode() {
  if (!isSupported) {
    message.error('复制失败')
  }
  try {
    await copy()
    message.success('复制成功')
  } catch (e: any) {
    message.error(e.message)
  }
}
onBeforeMount(() => {
  loadCom()
})
// demo path title sourceData
</script>

<style lang="scss" scoped>
.border-box {
  border: 1px solid #ccc;
}
.com-box {
  padding: 16px 16px 0;
}
.source-box {
  padding: 0 16px 0;
}
.tool-box {
  margin-top: -20px;
}
</style>
