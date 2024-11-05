<template>
  <DaForm
    ref="daform"
    v-model:value="formModel"
    :label-col="{ style: { width: '120px' } }"
    :form-group="formGroup"
  >
    <template #buttons>
      <a-button type="primary" @click="submit">搜索</a-button>
      <a-button @click="() => daform?.resetFields()">重置</a-button>
    </template>
  </DaForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DaForm } from '@deal-ant/components'
import dayjs from 'dayjs'
import type { DaFormInstance, FormGroupItem } from '@deal-ant/components'

const formModel = reactive({
  numToString: 123,
  stringToNum: '1',
  dateToString: [dayjs(1714838400000), dayjs(1717516800000)],
  // dateToTime: [dayjs('2014-05-05', 'YYYY-MM-DD'), dayjs('2014-06-05', 'YYYY-MM-DD')],
  dateToTime: [dayjs(1714838400000), dayjs(1717516800000)],
  dateToString1: dayjs(1714838400000),
  dateToTime1: dayjs(1714838400000),
})
const formGroup: FormGroupItem[] = [
  {
    label: 'numToString',
    key: 'numToString',
    renderKey: 'renderInputNumber',
    formatter: 'numToString',
  },
  {
    label: 'stringToNum',
    key: 'stringToNum',
    renderKey: 'renderSelect',
    formatter: 'stringToNum',
    options: [
      { label: '中国', value: '1' },
      { label: '俄罗斯', value: '2' },
    ],
  },
  {
    label: 'dateToString',
    key: 'dateToString',
    renderKey: 'renderRangePicker',
    formatter: 'dateToString',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
  {
    label: 'dateToTime',
    key: 'dateToTime',
    renderKey: 'renderRangePicker',
    formatter: 'dateToTime',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
  {
    label: 'dateToString1',
    key: 'dateToString1',
    renderKey: 'renderDatePicker',
    formatter: 'dateToString',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
  {
    label: 'dateToTime1',
    key: 'dateToTime1',
    renderKey: 'renderDatePicker',
    formatter: 'dateToTime',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
  {
    label: 'null1',
    key: 'null1',
    renderKey: 'renderInputNumber',
    formatter: 'numToString',
  },
  {
    label: 'null2',
    key: 'null2',
    renderKey: 'renderSelect',
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
    ],
  },
]
const daform = ref<DaFormInstance>()
async function submit() {
  await daform.value!.validateFields()
  console.log(daform.value!.getFormData())
}
</script>

<style scoped></style>
