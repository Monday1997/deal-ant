import { isUndefined } from '@deal-ant/utils'
import type { FormGroupItem } from '../types'
import type { FormItemProps } from 'ant-design-vue'
export function setDefaultFormData(data: {
  formGroup: FormGroupItem[]
  form: Record<string, any>
  originProps: FormItemProps
}) {
  data.formGroup.map((item) => {
    setPlaceHolderDefault(item)
    setRequiredMessage(item, data.originProps)
    setDefaultWith(item)
  })
}
function setDefaultWith(item) {
  item.elProps = item.elProps || {}
  if (isUndefined(item.elProps.style)) {
    item.elProps.style = 'width:100%'
  }
}
function setRequiredMessage(item: FormGroupItem, originProps: FormItemProps) {
  if (item.originProps?.required && !item.originProps.rules && !originProps.rules?.[item.key]) {
    item.originProps.name = item.key
    item.originProps.rules = {
      required: true,
      message: `${item.originProps.label}不能为空`,
      trigger: ['blur', 'change'],
    }
  }
}
function setPlaceHolderDefault(item: FormGroupItem) {
  if (item.elProps?.placeholder) {
    return
  }
  const fragmentKey = item.fragmentKey.toLowerCase()
  item.elProps = item.elProps || {}
  if (fragmentKey.includes('input')) {
    item.elProps.placeholder = `请输入${item.originProps?.label || ''}`
  } else if (item.fragmentKey === 'renderRangePicker') {
    item.elProps.placeholder = [`开始时间`, '结束时间']
  } else {
    item.elProps.placeholder = `请选择${item.originProps?.label || ''}`
  }
}
