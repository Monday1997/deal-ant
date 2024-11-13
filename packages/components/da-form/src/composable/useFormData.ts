import { computed, reactive, watch,ref, watchEffect,isRef,isReactive } from 'vue'
import { isArray, isDayJs, isEmpty, isNumber, isString } from '@deal-ant/utils'
import { setDefaultFormData } from '../utils/index'
import type { DaFormProps, FormGroupItem } from '../types'
function  useFormData(props: DaFormProps) {
  const formData = reactive(props.value || {})
  setDefaultFormData({
    formGroup: props.formGroup,
    formProps: props.formProps,
  })
  const dataFormatList = ['dateToString', 'dateToTime']

  const formGroup = ref(props.formGroup)
  watchEffect(()=>{
    formGroup.value.forEach(item=>{
      if(item.depend && props.depend?.[item.key]){
        item.depend({
          setElProp:(originKey,value)=>{setElProp(item,originKey,value)},
          setElProps:(fn)=>setElProps(item,fn),
          setFormProp:(originKey,value)=>{setFormProp(item,originKey,value)},
          setFormProps:(fn)=>setFormProps(item,fn),
          toogle:(isShow)=>{toogle(item,isShow)},
        },
        getDepValue(item.key))
      }
    })
  })

  function getDepValue(key){
    return props.depend[key]!.map(depValue=>{
      if(isRef(depValue)){
        return depValue.value
      }else{
        throw new Error(`depend props ${key} is not typeof ref`)
      }
    })
  }
  // 处理参数
  function getFormData(): Record<string, any> {
    const obj = {}
    props.formGroup.forEach((item) => {
      const { key } = item
      const value = formData[key]
      if (isEmpty(value)) {
        return
      }
      if (isString(item.formatter)) {
        if (dataFormatList.includes(item.formatter) && isRangePickerList(item, value)) {
          obj[key] = value.map((valueItem) => {
            return formaterEven[item.formatter](valueItem)
          })
          return
        }
        if (dataFormatList.includes(item.formatter) && isRangePicker(item, value)) {
          return (obj[key] = formaterEven[item.formatter](value))
        }
        return (obj[key] = formaterEven[item.formatter](value))
      }
      obj[key] = value
    })
    return obj
  }
  return {
    formData,
    getFormData,
    formGroup
  }
}
function setFormProp(item,key,value){
  if(key === 'required' && value===false){
    if(isArray(item.formProps?.rules)){
      item.formProps.rules = item.formProps.rules.filter(item=>!item.required)
    }else if(item.formProps.rules){
      item.formProps.rules=null
    }

  }else if(key === 'required'&&value===true){
    if(item.formProps?.required || (isArray(item.formProps?.rules) && item.formProps?.rules.some(item=>item.required))){
      return
    }
    const requrestItem = {
      required:true,
      message:`请输入${item.label}`
    }
    if(isArray(item.formProps.rules)){
      item.formProps.rules.push(requrestItem)
    }else{
      let rules = item.formProps?.rules?[item.formProps.rules]:[]
      item.formProps.rules = rules
      item.formProps.rules.push(requrestItem)
    }
  }
  item.formProps[key] = value
  console.log(item);

}
function setFormProps(item,fn){
  item.formProps = fn(item.formProps)
}
function setElProp(item,originKey,value){
  item.elProps[originKey] = value
}
function setElProps(item,fn){
  item.elProps = fn(item.elProps)
}
function toogle(item,value:boolean){
  const style = {
    display:value?'':'none'
  }
  item.formProps = Object.assign(item.formProps,{style})
}
const formaterEven = {
  dateToString(value) {
    if (!isDayJs(value)) {
      throw new Error('value in dateToString is not Dayjs type')
    }
    return value.format('YYYY-MM-DD')
  },
  dateToTime(value) {
    if (!isDayJs(value)) {
      throw new Error('value in dateToString is not Dayjs type')
    }
    return value.unix()
  },
  numToString(value) {
    if (!isNumber(value)) {
      throw new Error('value in dateToString is not number type')
    }
    return String(value)
  },
  stringToNum(value) {
    const result = Number(value)
    if (isNaN(result)) {
      throw new Error('value use formatter is NaN')
    }
    return result
  },
}
function isRangePickerList(item: FormGroupItem, value: unknown) {
  return (
    item.renderKey === 'renderRangePicker' &&
    isArray(value) &&
    isDayJs(value[0]) &&
    item.elProps?.picker === 'date'
  )
}
function isRangePicker(item: FormGroupItem, value: unknown) {
  return item.renderKey === 'renderDatePicker' && isDayJs(value)
}
export default useFormData
