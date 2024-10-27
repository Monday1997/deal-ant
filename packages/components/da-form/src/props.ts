import type { ExtractPropTypes, PropType } from 'vue'
import type { FormGroupItem } from './types'
import type { FormProps, RowProps } from 'ant-design-vue'
export const daFormProps = {
  // 初始化数据
  value: { type: Object, default: () => ({}) },

  // 表单项配置
  formGroup: { type: Array as PropType<Array<FormGroupItem>>, required: true },

  // 开启栅格布局
  grid: { type: Boolean, default: false },
  // 栅格布局中按钮和输入框是否位于同一行
  gripInlineBtn: { type: Boolean, default: false },

  // 用于 v-bind 绑定antdv表单组件props
  originProps: { type: Object as PropType<FormProps>, default: () => ({}) },

  // row 相关配置
  rowProps: { type: Object as PropType<RowProps>, default: () => ({}) },
} as const
export type DaFormProps = ExtractPropTypes<typeof daFormProps>
