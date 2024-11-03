import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import dayjs from 'dayjs'
import { isArray, isDayJs, isEmpty } from '@deal-ant/utils'
import { daFormProps } from './types'
import * as formFragment from './form-fragment'
import { setDefaultFormData } from './utils/index'

import type { FormInstance } from 'ant-design-vue'
import type { FormExpose } from 'ant-design-vue/lib/form/Form'
import type { DaFormExpose } from './types'
export default defineComponent({
  name: 'DaForm',
  props: daFormProps,
  emits: ['update:value'],
  setup(props, { expose }) {
    const formData = reactive(props.value || {})
    const formRef = ref<FormInstance>()
    setDefaultFormData({
      formGroup: props.formGroup,
      form: formData,
      formProps: props.formProps,
    })
    // 处理参数
    function getFormData(): Record<string, any> {
      const obj = {}
      props.formGroup.forEach((item) => {
        const { key } = item
        const value = formData[key]
        if (
          item.formatter === 'dateString' &&
          item.renderKey === 'renderRangePicker' &&
          isArray(value) &&
          isDayJs(value[0]) &&
          (item.elProps?.picker === 'dateString' || !item.elProps?.picker)
        ) {
          obj[key] = value.map((item) => {
            return isDayJs(item) ? dayjs(item).format('YYYY-MM-DD') : item
          })
          return
        }
        if (
          item.formatter === 'dateString' &&
          item.renderKey === 'renderDatePicker' &&
          isDayJs(value)
        ) {
          return (obj[key] = dayjs(value).format('YYYY-MM-DD'))
        }
        if (!isEmpty(value)) {
          obj[key] = value
        }
      })
      return obj
    }
    // | object
    const formAttrs = reactive<FormExpose | object>({
      resetFields: undefined,
      validateFields: undefined,
      getFieldsValue: undefined,
      validate: undefined,
      scrollToField: undefined,
    })
    watch(
      () => formRef.value,
      (val) => {
        for (const key in val) {
          formAttrs[key] = val[key]
        }
      }
    )
    expose({
      ...(toRefs(formAttrs) as FormExpose),
      getFormData,
      formData,
    } as DaFormExpose)
    return { formData, getFormData, formRef }
  },

  render() {
    const defaultRender = () => (
      <>
        {this.$props.formGroup.map((item) =>
          this.$slots[item.key] ? (
            this.$slots[item.key]!()
          ) : (
            <>{formFragment[item.renderKey](item, this.formData)()}</>
          )
        )}
        {this.$slots.buttons && (
          <a-form-item class="deal-ant-align-center">
            <a-space>{this.$slots.buttons()}</a-space>
          </a-form-item>
        )}
      </>
    )
    const colspan = {
      xs: 24,
      sm: 24,
      md: 8,
      lg: 8,
      xl: 6,
      xxl: 4,
      xxxl: 4,
    }
    const colspanDouble = Object.entries(colspan).reduce((pre, [key, value]) => {
      pre[key] = value === 24 ? value : value * 2
      return pre
    }, {})
    const gridLayoutRender = () => {
      return (
        <>
          <a-row gutter={{ md: 8, lg: 8, xl: 16, xxxl: 24 }} {...this.$props.rowProps}>
            {this.$props.formGroup.map((item) =>
              this.$slots[item.key] ? (
                this.$slots[item.key]!()
              ) : (
                <>
                  <a-col {...(item.colDouble ? colspanDouble : colspan)} {...item.colProps}>
                    {formFragment[item.renderKey](item, this.formData)()}
                  </a-col>
                </>
              )
            )}
            {this.$slots.buttons && (
              <a-col>
                <a-form-item>
                  <a-space>{this.$slots.buttons()}</a-space>
                </a-form-item>
              </a-col>
            )}
          </a-row>
        </>
      )
    }
    return (
      <a-form
        {...this.$props.formProps}
        model={this.formData}
        ref={(ref: any) => (this.formRef = ref)}
      >
        {this.$props.grid ? gridLayoutRender() : defaultRender()}
      </a-form>
    )
  },
})
