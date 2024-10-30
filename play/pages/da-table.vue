<template>
  <div>
    <!-- <DaTable :api="api" /> -->
    <!-- <a-input v-model:value="form1" /> -->
    <!-- <div>{{ form1 }}</div> -->
    <ttt v-model:form="form1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ttt from './test.vue'
const form1 = ref('小米')
// <DaTable  /> api=""
// list other{page}
const lista = Array.from(Array(22), (_, _index) => ({ id: _index, name: `66${_index}` }))
const api = () => {
  return Promise.resolve({
    data: {
      list: lista,
      otherData: {
        total: 22,
      },
    },
  })
}
const tableForm = [
  {
    label: '名字',
    type: 'input',
    value: '一个默认',
    key: 'name',
  },
]
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 74,
  },
  {
    title: '违规状态',
    dataIndex: 'name',
    width: 96,
  },
  {
    title: '违规主题',
    dataIndex: 'title',
    width: 160,
  },
]
</script>

<style scoped></style>
