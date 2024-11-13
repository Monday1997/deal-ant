<template>
  <div>
    <DaForm
      ref="daform"
      v-model:value="formModel"
      :label-col="{ style: { width: '150px' } }"
      style="width: 600px"
      :form-group="formGroup"
      :depend="depend"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect,watch,computed,toRefs } from 'vue'
import { DaForm } from '@deal-ant/components'

import type {  FormGroupItem } from '@deal-ant/components'
const formModel = reactive({
  province: 'gd',
  city:undefined,
  isStaff:true,
})
const {province,isStaff}=toRefs(formModel)
const name = ref('')
// depend必须传入ref对象
const depend = {
  city: [province],
  idNumber:[isStaff]
}
const formGroup: FormGroupItem[] = [
  {
    key: 'province',
    label: '省',
    renderKey: 'renderSelect',
    options:[
      {label:'北京',value:'bj'},
      {label:'广东',value:'gd'}
    ],
    formProps: {
      required: true,
    },
    depend(){
      console.log(123)
    }
  },
  {
    key: 'city',
    label: '市',
    renderKey: 'renderSelect',
    options:[
      {label:'广州',value:1},
      {label:'深圳',value:2}
    ],
    depend({toogle},[province]){
      toogle(province==='bj')
    }
  },
  {
    key:'isStaff',
    label:'是否员工',
    renderKey:'renderRadio',
    options:[
      {label:'是',value:true},
      {label:'否',value:false},
    ]
  },
  {
    key:'idNumber',
    label:'证件号',
    formProps:{
      required:true
    },
    depend({setFormProp},[province]){
      console.log('province',province);
      setFormProp('required',province)
    },
    // 或者
    // depend({setFormProps},[province]){
    //   setFormProps((formProps)=>{
    //     // console.log(formProps);
    //     // debugger
    //      const result = {
    //       ...formProps,
    //       required:province
    //     }
    //     console.log(result);
    //     return result
    //   })
    // }
  }
]

</script>

<style scoped></style>
