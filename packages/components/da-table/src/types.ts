import type { FormGroupItem } from '@deal-ant/components'
import type { TableColumnsType } from 'ant-design-vue'
// export daTableColumns
export type Tapi = {
  list: any[]
  other: {
    total: number
  }
}
export type ColumnsItem = TableColumnsType &
  FormGroupItem & {
    hideInForm?: boolean
    hideInTable?: boolean
  }
