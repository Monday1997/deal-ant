<template>
  <div>
    <DaForm :grid="true" :formGroup="formGroup" :value="formValue">
      <template #buttons>
        <a-button type="primary">搜索</a-button>
        <a-button type="primary">导出</a-button>
        <a-button type="primary">其他</a-button>
        <a-button type="primary">来了1</a-button>
        <a-button type="primary">来了2</a-button>
        <a-button type="primary">来了3</a-button>
      </template>
    </DaForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const formGroup = [
  {
    key: 'item1',
    fragmentKey: 'renderInput',
    colDouble: true,
    originProps: {
      label: '一个名字',
    },
  },
  {
    key: 'item2',
    fragmentKey: 'renderInput',
    originProps: {
      label: '另一个扇地方',
    },
  },
  {
    key: 'item3',
    fragmentKey: 'renderInput',
    originProps: {
      label: '一个名字',
    },
  },
  {
    key: 'item4',
    fragmentKey: 'renderInput',
    originProps: {
      label: '一个名字',
    },
  },
  {
    key: 'item5',
    fragmentKey: 'renderInput',
    originProps: {
      label: '一个名字',
    },
  },
  {
    key: 'item6',
    fragmentKey: 'renderInput',
    originProps: {
      label: '一个名字',
    },
  },
  {
    key: 'item7',
    fragmentKey: 'renderInput',
    originProps: {
      label: '一个名字',
    },
  },
]
const formValue = reactive({
  item1: '',
})
</script>

<style lang="scss" scoped></style>
