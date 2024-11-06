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

import type { DaFormInstance, FormGroupItem } from '@deal-ant/components'
interface IFormModal {
  loveColor: string
  name: string
  age?: number
}
const formModel = reactive<IFormModal>({
  loveColor: '',
  name: '',
  age: undefined,
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
      style: {
        width: '100%',
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
  {
    key: 'job',
    label: '职业',
  },
]
const daform = ref<DaFormInstance>()
async function submit() {
  await daform.value!.validateFields()
  console.log(daform.value!.getFormData())
}
</script>

<style scoped></style>
