<template>
  <DaForm ref="refDaForm" v-model:value="tableFormValue" :grid="true" :form-group="tableForm">
    <template #buttons>
      <a-button type="primary" @click="search">搜索</a-button>
      <a-button type="primary" @click="reset">重置</a-button>
      <slot name="buttons" />
    </template>
  </DaForm>
  <Table
    :sticky="true"
    :columns="tableColumns"
    :data-source="list"
    :loading="listLoading"
    :pagination="page"
    row-key="id"
    :scroll="{ x: '100%' }"
    table-layout="fixed"
    @change="tableChange"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { Table } from 'ant-design-vue'
import { useTable } from '@deal-ant/hooks'
import { debounce } from '@deal-ant/utils'
import { DaForm } from '@deal-ant/components'
import { tableProps } from './table'
const props = defineProps(tableProps)
defineOptions({
  name: 'DaTable',
})
const refDaForm = ref<InstanceType<typeof DaForm>>()
const tableFormValue = reactive({})
const tableForm = computed(() => {
  return props.columns
    .filter((item) => !item.hideInForm)
    .map((item) => {
      if (item.value) {
        tableFormValue[item.key] = item.value
      }
      return {
        label: item.title,
        renderKey: item.renderKey || 'renderInput',
        ...item,
      }
    })
})

const { list, listLoading, page, getTableList, tableChange } = useTable({
  // ...hooksConfig,
  api: props.api,
})
const tableColumns = computed(() => {
  return props.columns
    .filter((item) => !item.hideInTable)
    .map((item) => {
      return {
        dataIndex: item.dataIndex,
        ...item,
      }
    })
})
function reset() {
  refDaForm.value!.resetFields()
  console.log(refDaForm.value)
}
const search = debounce(() => {
  getTableList('search')
})

onMounted(() => {
  getTableList()
})
</script>

<style scoped></style>
