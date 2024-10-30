import type { FormGroupItem } from '@deal-ant/components/da-form'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SelectProps } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/lib/select'

export const daSelectProps = {
  value: {
    type: [Array, Object, String, Number] as PropType<SelectValue>,
    default: undefined,
  },
  config: {
    type: Object as PropType<FormGroupItem<SelectProps>>,
    required: true,
  },
} as const
export type DaSelectProps = ExtractPropTypes<typeof daSelectProps>
