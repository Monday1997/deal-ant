<template>
  <div>
    <Da-form ref="daform" :grid="true" :form-group="formGroup" v-model:value="formModel" />
    <a-button @click="btnclick">56565</a-button>
  </div>
</template>

<script setup lang="ts">
import type { FormGroupItem } from '@deal-ant/componenst'
import { reactive, ref } from 'vue'
// const formModel = reactive<{
//   item1?: string[]
//   item2?: string
// }>({
//   // item2: '',
// })
const formModel = reactive({})
const formGroup: FormGroupItem[] = [
  {
    key: 'item1',
    fragmentKey: 'renderSelect',
    originProps: {
      label: '第一个',
      required: true,
    },

    elProps: {
      allowClear: true,
      options: [
        { label: '123', value: '1' },
        { label: '1256', value: '2' },
      ],
    },
  },
  {
    key: 'item2',
    fragmentKey: 'renderInput',
    originProps: {
      label: '第2个',
      required: true,
    },

    elProps: {
      allowClear: true,
    },
  },
]
const daform = ref()
function btnclick() {
  daform.value.getFormRef().validateFields()
}
</script>

<style lang="scss" scoped></style>
