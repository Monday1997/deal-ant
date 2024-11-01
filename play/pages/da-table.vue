<template>
  <div>
    <DaTable :api="api" :columns="columns">
      <template #buttons>
        <a-button>555</a-button>
      </template>
    </DaTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const columns = [
  {
    title: '违规主题',
    key: 'title1',
    width: 160,
    hideInForm: true,
  },
  {
    title: '第三个',
    key: 'item3',
    renderKey: 'renderRangePicker',
    colDouble: true,
    elProps: {
      allowClear: true,
      picker: 'date',
    },
  },
  {
    title: '找找',
    key: 'title2',
    renderKey: 'renderSelect',
    options: [
      {
        label: 'sd',
        value: 1,
      },
      {
        label: 'sd2',
        value: 2,
      },
      {
        label: 'sd3',
        value: 3,
      },
    ],
    value: 1,
  },
  {
    title: '违规主题',
    key: 'title3',
    width: 160,
    hideInForm: true,
  },
  {
    title: 'id',
    key: 'id',
    width: 74,
    dataIndex: 'id',
  },

  {
    title: '违规状态',
    key: 'name',
    width: 96,
  },
]
</script>

<style scoped></style>
