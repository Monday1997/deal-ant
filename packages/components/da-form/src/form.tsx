import { defineComponent, reactive, ref, toRefs, watch } from 'vue'

import { Col, Form, FormItem, Row, Space } from 'ant-design-vue'
import { daFormProps } from './types'
import * as formFragment from './form-fragment'
import useFormData from './composable/useFormData'
import type { FormInstance } from 'ant-design-vue'
import type { FormExpose } from 'ant-design-vue/lib/form/Form'
import type { DaFormExpose } from './types'
export default defineComponent({
  name: 'DaForm',
  props: daFormProps,
  emits: ['update:value'],
  setup(props, { expose }) {
    const { formData, getFormData,formGroup } = useFormData(props)
    const formRef = ref<FormInstance>()
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


    return { formData, getFormData, formRef ,formGroup}
  },

  render() {
    const defaultRender = () => (
      <>
        {this.formGroup.map((item) =>
          this.$slots[item.key] ? (
            this.$slots[item.key]!()
          ) : (
            <>{formFragment[item.renderKey](item, this.formData)()}</>
          )
        )}
        {this.$slots.buttons && (
          <FormItem class="deal-ant-align-center">
            <Space>{this.$slots.buttons()}</Space>
          </FormItem>
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
          <Row gutter={{ md: 8, lg: 8, xl: 16, xxxl: 24 }} {...this.$props.rowProps}>
            {this.formGroup.map((item) =>
              this.$slots[item.key] ? (
                this.$slots[item.key]!()
              ) : (
                <>
                  <Col {...(item.colDouble ? colspanDouble : colspan)} {...item.colProps}>
                    {formFragment[item.renderKey](item, this.formData)()}
                  </Col>
                </>
              )
            )}
            {this.$slots.buttons && (
              <Col>
                <FormItem>
                  <Space>{this.$slots.buttons()}</Space>
                </FormItem>
              </Col>
            )}
          </Row>
        </>
      )
    }
    return (
      <Form
        {...this.$props.formProps}
        model={this.formData}
        ref={(ref: any) => (this.formRef = ref)}
      >
        {this.$props.grid ? gridLayoutRender() : defaultRender()}
      </Form>
    )
  },
})
