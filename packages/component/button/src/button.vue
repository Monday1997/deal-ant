<template>
  <Button :type="props.type || 'primary'">64</Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { buttonProps } from './button'
defineOptions({
  name: 'DbBtn',
})
const props = defineProps(buttonProps)
</script>

<style scoped></style>
