/**
 * 各种属性的表单项
 * renderInput -> input
 * renderSelect -> select
 * renderDatePicker -> DataPicker
 * renderMonthPicker -> MonthPicker
 * renderRangePicker -> RangePicker
 *
 * renderCheckbox -> checkbox
 * renderRadio -> radio
 */

import { h, unref } from 'vue'
import { DaSelect } from '@deal-ant/components'
import type { SelectProps } from 'ant-design-vue/lib/vc-select'
import type { FormGroupItem } from './types'
export const renderInput = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-input {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderInputNumber = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-input-number {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}
export const renderTextarea = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-textarea {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderSelect = <T,>(config: FormGroupItem<SelectProps>, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <DaSelect config={config} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderMonthPicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-month-picker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderDatePicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-date-picker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderRangePicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-range-picker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderCheckbox = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-checkbox-group {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
}

export const renderRadio = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-radio-group {...config.elProps} vModel={[modelData[config.key], 'value']}>
        {unref(config.options)?.map((item) =>
          config.elProps && config.elProps.optionType === 'normal' ? (
            <a-radio {...item}>{item.label}</a-radio>
          ) : (
            <a-radio-button {...item}>{item.label}</a-radio-button>
          )
        )}
      </a-radio-group>
    </a-form-item>
  )
}

export const renderSwitch = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <a-switch {...config.elProps} vModel={[modelData[config.key], 'checked']} />
    </a-form-item>
  )
}

/* export const renderCascader = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <state-cascader config={config} vModel={[modelData[config.key], 'value']} />
    </a-form-item>
  )
} */

/* export const renderSelectAndInput = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <a-form-item {...config.formProps}>
      <div class="flex-wrap key-word-item">
        <state-select
          config={config['selectConfig']}
          vModel={[modelData[config.key['select']], 'value']}
        />
        <a-form-item name={config.key['input']} style="flex:1; padding: 0;margin-bottom: 0">
          <a-input {...config.elProps} vModel={[modelData[config.key['input']], 'value']} />
        </a-form-item>
      </div>
    </a-form-item>
  )
}
 */
/** 自定义组件，通过component属性渲染组件 */
/* export const renderCustom = <T,>(config: FormGroupItem, modelData: T) => {
  const customCom = config.component
  if (!customCom) {
    console.warn(`${config.key}:renderCustom类型需要配置component`)
    return
  }
  return () => (
    <a-form-item {...config.formProps}>
      {h(customCom, {
        value: modelData[config.key],
        ['onUpdate:value']: (value: any) => (modelData[config.key] = value),
        ...config.elProps,
      })}
    </a-form-item>
  )
}
 */
