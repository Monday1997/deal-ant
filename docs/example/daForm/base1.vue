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
import type { DaFormInstance } from '@deal-ant/components'
// 只需配置formGroup完成表单渲染
import {formGroup} from './config'

const formModel = reactive({
  loveColor: '',
  name: '',
  age: undefined,
})
const daform = ref<DaFormInstance>()
async function submit() {
  daform.value!.validateFields()
}
</script>

<style scoped></style>
