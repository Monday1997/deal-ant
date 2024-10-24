import type * as formFragment from './form-fragment'
import type { CSSProperties, Component } from 'vue'
import type { ColProps, FormItemProps } from 'ant-design-vue'
export type fragmentKey = keyof typeof formFragment
type TObject = Record<string, any>
export interface FormGroupItem<T = any> {
  key: string
  fragmentKey: fragmentKey
  originProps?: FormItemProps
  options?: TObject[]
  // optionsFormat?: (res: IAxiosResponse<TObject>, value: string[]) => Option[]
  // url?: string
  style?: CSSProperties
  component?: string | Component
  elProps?: T
  changeHandler?: (params: any) => void
  params?: Record<string, unknown>
  colProps?: ColProps
  colDouble?: boolean
  // 每次点击都请求url
  everyTimeLoad?: boolean
  // 组合查询时，下拉框的配置项
  selectConfig?: FormGroupItem
}
