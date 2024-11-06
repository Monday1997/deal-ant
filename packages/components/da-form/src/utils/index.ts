import { isUndefined } from '@deal-ant/utils'
import type { FormGroupItem } from '../types'
import type { FormItemProps } from 'ant-design-vue'
export function setDefaultFormData(data: {
  formGroup: FormGroupItem[]
  form: Record<string, any>
  formProps: FormItemProps
}) {
  data.formGroup.map((item) => {
    setDefaultRenderKeys(item)
    setElProps(item)
    setDefaultOrigin(item, data.formProps)
  })
}
function setDefaultRenderKeys(item: FormGroupItem) {
  item.renderKey = item.renderKey || 'renderInput'
}
function setDefaultOrigin(item: FormGroupItem, formProps: FormItemProps) {
  setRequiredMessage(item, formProps)
  item.formProps = item.formProps || {}
  if (item.label) {
    item.formProps!.label = item.label
  }
  item.formProps.name = item.key
}
function setRequiredMessage(item: FormGroupItem, formProps: FormItemProps) {
  if (item.formProps?.required && !item.formProps.rules && !formProps.rules?.[item.key]) {
    item.formProps.rules = {
      required: true,
      message: `${item.label || item.formProps.label || '该项'}不能为空`,
      trigger: ['blur', 'change'],
    }
  }
}

function setElProps(item: FormGroupItem) {
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
  if (isUndefined(item.elProps.allowClear)) {
    item.elProps.allowClear = true
  }
  setDefaultStyle(item)
}
function setDefaultStyle(item) {
  item.elProps = item.elProps || {}
  if (isUndefined(item.elProps.style) && item.renderKey !== 'renderSwitch') {
    item.elProps.style = 'width:100%'
  }
}
