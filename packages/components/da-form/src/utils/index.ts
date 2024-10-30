import { isUndefined } from '@deal-ant/utils'
import type { FormGroupItem } from '../types'
import type { FormItemProps } from 'ant-design-vue'
export function setDefaultFormData(data: {
  formGroup: FormGroupItem[]
  form: Record<string, any>
  formProps: FormItemProps
}) {
  data.formGroup.map((item) => {
    setPlaceHolderDefault(item)
    setRequiredMessage(item, data.formProps)
    setDefaultWith(item)
  })
}
function setDefaultWith(item) {
  item.elProps = item.elProps || {}
  if (isUndefined(item.elProps.style)) {
    item.elProps.style = 'width:100%'
  }
}
function setRequiredMessage(item: FormGroupItem, formProps: FormItemProps) {
  if (item.formProps?.required && !item.formProps.rules && !formProps.rules?.[item.key]) {
    item.formProps.name = item.key
    item.formProps.rules = {
      required: true,
      message: `${item.formProps.label}不能为空`,
      trigger: ['blur', 'change'],
    }
  }
}
function setPlaceHolderDefault(item: FormGroupItem) {
  if (item.elProps?.placeholder) {
    return
  }
  const renderKey = item.renderKey.toLowerCase()
  item.elProps = item.elProps || {}
  if (renderKey.includes('input')) {
    item.elProps.placeholder = `请输入${item.formProps?.label || ''}`
  } else if (item.renderKey === 'renderRangePicker') {
    item.elProps.placeholder = [`开始时间`, '结束时间']
  } else {
    item.elProps.placeholder = `请选择${item.formProps?.label || ''}`
  }
}
