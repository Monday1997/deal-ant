import type { ColumnsItem, Tapi } from './types'
import type { IUseTableOptions } from '@deal-ant/hooks'
import type { ExtractPropTypes, PropType } from 'vue'
import type { AxiosResponse } from 'axios'
export const tableProps = {
  api: {
    type: Function as PropType<() => Promise<AxiosResponse<Tapi>>>,
    default: '',
  },
  columns: {
    type: Array as PropType<ColumnsItem[]>,
    default: [],
  },
  hooksConfig: {
    type: Object as PropType<IUseTableOptions<any, any>>,
    default: () => ({}),
  },
} as const
export type TableProps = ExtractPropTypes<typeof tableProps>
