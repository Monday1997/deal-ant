<template>
  <div>
    <a-input v-model:value="formCopy"></a-input>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
const props = defineProps({
  form: {
    type: String,
    default: {},
  },
})
const emits = defineEmits<{
  (e: 'update:form', value): void
}>()
const formCopy = computed({
  get() {
    return props.form
  },
  set(val) {
    emits('update:form', val)
  },
})
</script>

<style scoped></style>
