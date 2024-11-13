import type * as formFragment from './form-fragment'
import type { Component, ComponentPublicInstance, ExtractPropTypes, PropType ,Ref} from 'vue'
import type { ColProps, FormItemProps, FormProps, RowProps } from 'ant-design-vue'
import type { FormExpose } from 'ant-design-vue/lib/form/Form'

export type renderKey = keyof typeof formFragment
type TObject = Record<string, any>
export interface FormGroupItem<T = any> {
  key: string
  renderKey?: renderKey
  formatter?:
    | 'dateToString'
    | 'dateToTime'
    | 'dateToString'
    | 'dateToTime'
    | 'numToString'
    | 'stringToNum'
  label?: string
  formProps?: FormItemProps
  options?: Object[]
  component?: string | Component
  elProps?: T
  changeHandler?: (params: any) => void
  colProps?: ColProps
  colDouble?: boolean
  depend?:(FormGroupItemDepend:TFormGroupItemDepend<T>,deps:(Ref<any>|any)[])=>void
  // 每次点击都请求url
  // everyTimeLoad?: boolean
  // // 组合查询时，下拉框的配置项
  // selectConfig?: FormGroupItem
}
type TFormGroupItemDepend<T> = {
  setElProp:<E=any>(key:string,value:E)=>void,
  setElProps:(fn:(T)=>T)=>void,
  setFormProp:<E=any>(key:string,value:E)=>void,
  setFormProps:(fn:(FormItemProps)=>FormItemProps)=>void,
  toogle:(isShow:boolean)=>void
}
export type DaFormExpose = {
  getFormData: () => Record<string, any>
  formData: Record<string, any>
} & FormExpose

export const daFormProps = {
  // 初始化数据
  value: { type: Object as PropType<Record<string, any>>, default: () => ({}) },

  // 表单项配置
  formGroup: { type: Array as PropType<Array<FormGroupItem>>, required: true },

  // 开启栅格布局
  grid: { type: Boolean, default: false },
  // 栅格布局中按钮和输入框是否位于同一行
  gripInlineBtn: { type: Boolean, default: false },

  // 用于 v-bind 绑定antDForm表单组件props
  formProps: { type: Object as PropType<FormProps>, default: () => ({}) },

  // row 相关配置
  rowProps: { type: Object as PropType<RowProps>, default: () => ({}) },
  depend:{type:Object as PropType<Record<string,(Ref<any>|any)[]>>,default:() => ({})}
} as const
export type DaFormProps = ExtractPropTypes<typeof daFormProps>

export type DaFormInstance = ComponentPublicInstance<DaFormProps & DaFormExpose>
