import type { FormGroupItem } from '../types'
import type { FormItemProps } from 'ant-design-vue'
export function setDefaultFormData(
  data: { formGroup: FormGroupItem[]; form: Record<string, any>; originProps: FormItemProps },
  emit
) {
  data.formGroup.map((item) => {
    setPlaceHolderDefault(item)
    setRequiredMessage(item, data.originProps)
  })
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
  if (item.fragmentKey.toLowerCase().includes('input')) {
    item.elProps = item.elProps || {}
    item.elProps.placeholder = `请输入${item.originProps?.label || ''}`
  } else {
    item.elProps = item.elProps || {}
    item.elProps.placeholder = `请选择${item.originProps?.label || ''}`
  }
}
