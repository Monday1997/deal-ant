import type * as formFragment from './form-fragment'
import type { Component } from 'vue'
import type { ColProps, FormItemProps } from 'ant-design-vue'
export type renderKey = keyof typeof formFragment
type TObject = Record<string, any>
export interface FormGroupItem<T = any> {
  key: string
  renderKey: renderKey
  label: string
  formProps?: FormItemProps
  options?: TObject[]
  component?: string | Component
  elProps?: T
  changeHandler?: (params: any) => void
  colProps?: ColProps
  colDouble?: boolean
  // 每次点击都请求url
  // everyTimeLoad?: boolean
  // // 组合查询时，下拉框的配置项
  // selectConfig?: FormGroupItem
}
