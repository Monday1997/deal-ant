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
import type { DaFormInstance, FormGroupItem } from '@deal-ant/components'

const formModel = reactive({})
const formGroup: FormGroupItem[] = [
  {
    label: 'numToString',
    key: 'numToString',
    renderKey: 'renderInput',
  },
  {
    label: 'stringToNum',
    key: 'stringToNum',
    renderKey: 'renderInput',
  },
]
const daform = ref<DaFormInstance>()
async function submit() {
  await daform.value!.validateFields()
  console.log(daform.value!.getFormData())
}
</script>

<style scoped></style>
