<template>
  <div>
    <DaForm
      ref="daform"
      v-model:value="formModel"
      :label-col="{ style: { width: '150px' } }"
      style="width: 600px"
      :form-group="formGroup"
    >
      <template #buttons>
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button @click="() => daform?.resetFields()">重置</a-button>
      </template>
    </DaForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DaForm } from '@deal-ant/components'

import dayjs from 'dayjs'
import type { DaFormInstance, FormGroupItem } from '@deal-ant/components'
const formModel = reactive({
  // timeRange: [dayjs('2014-05-05', 'YYYY-MM-DD'), dayjs('2014-06-05', 'YYYY-MM-DD')],
  timeRange: [dayjs(1714838400000), dayjs(1717516800000)],
})

const formGroup: FormGroupItem[] = [
  {
    label: '钟爱颜色',
    key: 'loveColor',
    renderKey: 'renderSelect',
    formProps: {
      required: true,
    },
    elProps: {
      allowClear: false,
      fieldNames: {
        label: 'labelabc',
      },
    },
    options: [
      { labelabc: '红色', value: '1' },
      { labelabc: '蓝色', value: '2' },
    ],
  },
  {
    key: 'name',
    label: '姓名',
    renderKey: 'renderInput',
    formProps: {
      required: true,
    },
  },
  {
    key: 'age',
    label: '年龄',
    renderKey: 'renderInputNumber',
  },
  // {
  //   key: 'timeRange',
  //   label: '时间范围',
  //   renderKey: 'renderRangePicker',
  //   colDouble: true,
  //   elProps: {
  //     allowClear: true,
  //     picker: 'date',
  //   },
  // },
  // {
  //   key: '12',
  //   label: '123',
  //   renderKey: 'renderSwitch',
  //   colDouble: true,
  //   elProps: {
  //     allowClear: true,
  //   },
  // },
]
const daform = ref<DaFormInstance>()
async function submit() {
  console.log(daform.value)
  await daform.value!.validateFields()
  console.log(daform.value!.getFormData())
}
</script>

<style scoped></style>
