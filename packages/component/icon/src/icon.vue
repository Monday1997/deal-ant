<template>
  <div :style="comStyle" :class="`deal-ant-${type}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconProps } from './icon'
defineOptions({
  name: 'DIcon',
})
const props = defineProps(iconProps)
const comStyle = computed(() => {
  return {
    ...(props.color ? { color: props.color } : {}),
    ...(props.size ? { fontSize: `${props.size}px` } : {}),
  }
})
</script>

<style scoped></style>
