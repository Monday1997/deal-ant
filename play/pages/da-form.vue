<template>
  <div>
    <Da-form ref="daform" :grid="true" :form-group="formGroup" v-model:value="formModel" />
    <a-button @click="btnclick">56565</a-button>
  </div>
</template>

<script setup lang="ts">
import type { FormGroupItem } from '@deal-ant/componenst'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
// const formModel = reactive<{
//   item1?: string[]
//   item2?: string
// }>({
//   // item2: '',
// })
const formModel = reactive({
  item3: [dayjs('2014-05-05', 'YYYY-MM-DD'), dayjs('2014-06-05', 'YYYY-MM-DD')],
})
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
  {
    key: 'item3',
    fragmentKey: 'renderRangePicker',
    colDouble: true,
    originProps: {
      label: '第3个',
    },
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
]
const daform = ref()
function btnclick() {
  // daform.value.getFormRef().validateFields()
  console.log(daform.value.getFormData())
}
</script>

<style lang="scss" scoped></style>
