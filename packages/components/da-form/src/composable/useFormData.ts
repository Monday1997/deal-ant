import { reactive } from 'vue'
import { isArray, isDayJs, isEmpty, isNumber, isString } from '@deal-ant/utils'
import { setDefaultFormData } from '../utils/index'
import type { DaFormProps, FormGroupItem } from '../types'
function useFormData(props: DaFormProps) {
  const formData = reactive(props.value || {})
  setDefaultFormData({
    formGroup: props.formGroup,
    form: formData,
    formProps: props.formProps,
  })
  const dataFormatList = ['dateToString', 'dateToTime']
  // 处理参数
  function getFormData(): Record<string, any> {
    const obj = {}
    props.formGroup.forEach((item) => {
      const { key } = item
      const value = formData[key]
      if (isEmpty(value)) {
        return
      }
      if (isString(item.formatter)) {
        if (dataFormatList.includes(item.formatter) && isRangePickerList(item, value)) {
          obj[key] = value.map((valueItem) => {
            return formaterEven[item.formatter](valueItem)
          })
          return
        }
        if (dataFormatList.includes(item.formatter) && isRangePicker(item, value)) {
          return (obj[key] = formaterEven[item.formatter](value))
        }
        return (obj[key] = formaterEven[item.formatter](value))
      }
      obj[key] = value
    })
    return obj
  }
  return {
    formData,
    getFormData,
  }
}
const formaterEven = {
  dateToString(value) {
    if (!isDayJs(value)) {
      throw new Error('value in dateToString is not Dayjs type')
    }
    return value.format('YYYY-MM-DD')
  },
  dateToTime(value) {
    if (!isDayJs(value)) {
      throw new Error('value in dateToString is not Dayjs type')
    }
    return value.unix()
  },
  numToString(value) {
    if (!isNumber(value)) {
      throw new Error('value in dateToString is not number type')
    }
    return String(value)
  },
  stringToNum(value) {
    const result = Number(value)
    if (isNaN(result)) {
      throw new Error('value use formatter is NaN')
    }
    return result
  },
}
function isRangePickerList(item: FormGroupItem, value: unknown) {
  return (
    item.renderKey === 'renderRangePicker' &&
    isArray(value) &&
    isDayJs(value[0]) &&
    item.elProps?.picker === 'date'
  )
}
function isRangePicker(item: FormGroupItem, value: unknown) {
  return item.renderKey === 'renderDatePicker' && isDayJs(value)
}
export default useFormData
