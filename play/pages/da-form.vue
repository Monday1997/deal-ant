<template>
  <div><Da-form :grid="true" :form-group="formGroup" v-model:value="formModal"/></div>
</template>

<script setup lang="ts">
import type {FormGroupItem} from '@deal-ant/componenst'
import {reactive} from 'vue'
const formModel = reactive({item1:''})
const formGroup:FormGroupItem[] = [
  {
    key:'item1',
    fragmentKey:'renderInput',
    originProps:{
      label:'第一个'
    },
    elProps:{
      allowClear:true
    }
  }
]

</script>

<style lang="scss" scoped></style>
