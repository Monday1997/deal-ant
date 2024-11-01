import type { IUseTableOptions } from '@deal-ant/hooks'
import type { Tapi } from './types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { AxiosResponse, ColumnsItem } from 'axios'
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
