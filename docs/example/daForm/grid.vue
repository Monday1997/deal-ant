<template>
  <div>
    <DaForm
      ref="daform"
      v-model:value="formModel"
      grid
      style="min-width: 400px"
      :form-group="formGroup"
    >
      <template #buttons>
        <a-button type="primary" @click="submit">搜索</a-button>
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
    key: 'id',
    label: 'id',
    renderKey: 'renderInput',
  },
  {
    key: 'name',
    label: '姓名',
    renderKey: 'renderInput',
  },
  {
    key: 'age',
    label: '年龄',
    renderKey: 'renderInputNumber',
  },
  {
    label: '国家',
    key: 'country',
    renderKey: 'renderSelect',
    options: [
      { label: '中国', value: '1' },
      { label: '俄罗斯', value: '2' },
    ],
    formProps: {
      required: true,
    },
  },
  {
    key: 'timeRange',
    label: '时间范围',
    renderKey: 'renderRangePicker',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
]
const daform = ref<DaFormInstance>()
async function submit() {
  daform.value!.validateFields().then(()=>{
    console.log(daform.value!.getFormData())
  })

}
</script>

<style scoped></style>
