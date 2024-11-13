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
import {
  CheckboxGroup,
  DatePicker,
  FormItem,
  Input,
  InputNumber,
  MonthPicker,
  Radio,
  RadioButton,
  RadioGroup,
  RangePicker,
  Switch,
  Textarea,
} from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue/lib/vc-select'
import type { FormGroupItem } from './types'
export const renderInput = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <div>{{...config.formProps}}</div>
      <Input {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderInputNumber = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <InputNumber {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}
export const renderTextarea = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <Textarea {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderSelect = <T,>(config: FormGroupItem<SelectProps>, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <DaSelect config={config} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderMonthPicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <MonthPicker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderDatePicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <DatePicker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderRangePicker = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <RangePicker {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderCheckbox = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <CheckboxGroup {...config.elProps} vModel={[modelData[config.key], 'value']} />
    </FormItem>
  )
}

export const renderRadio = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <RadioGroup {...config.elProps} vModel={[modelData[config.key], 'value']}>
        {unref(config.options)?.map((item) =>
          config.elProps && config.elProps.optionType === 'button' ? (
            <RadioButton {...item}>{item.label}</RadioButton>
          ) : (
            <Radio {...item}>{item.label}</Radio>
          )
        )}
      </RadioGroup>
    </FormItem>
  )
}

export const renderSwitch = <T,>(config: FormGroupItem, modelData: T) => {
  return () => (
    <FormItem {...config.formProps}>
      <Switch {...config.elProps} vModel={[modelData[config.key], 'checked']} />
    </FormItem>
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
