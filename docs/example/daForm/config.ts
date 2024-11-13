
import type {  FormGroupItem } from '@deal-ant/components'

export const formGroup: FormGroupItem[] = [
  {
    label: '钟爱颜色',
    key: 'loveColor',
    renderKey: 'renderSelect',
    formProps: {
      required: true,
    },
    elProps: {
      allowClear: false,
      fieldNames: {
        label: 'labelabc',
      },
      style: {
        width: '100%',
      },
    },
    options: [
      { labelabc: '红色', value: '1' },
      { labelabc: '蓝色', value: '2' },
    ],
  },
  {
    key: 'name',
    label: '姓名',
    renderKey: 'renderInput',
    formProps: {
      required: true,
    },
  },
  {
    key: 'age',
    label: '年龄',
    renderKey: 'renderInputNumber',
  },
  {
    key: 'job',
    label: '职业',
  },
]
