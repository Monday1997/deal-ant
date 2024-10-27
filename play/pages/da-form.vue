<template>
  <div>
    <DaForm :grid="true" :formGroup="formGroup" v-model:value="formValue" :dependency="dependency">
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
import { reactive, ref } from 'vue'
const formGroup = [
  {
    key: 'item1',
    fragmentKey: 'renderInput',
    colDouble: true,
    originProps: {
      label: '一个名字',
    },
    watchDeps({ setOrigin, setElProps }, deps) {
      setElProps('disabled', true)
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
const aa = ref(1)
const dependency = {
  item1: [aa],
}
const formValue = reactive({
  item1: '123',
  item2: '888',
  $disabled: { item1: true },
})
setTimeout(() => {
  // formValue.$disabled.item1 = false
  aa.value = 2
}, 2000)
</script>

<style lang="scss" scoped></style>
