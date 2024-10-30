import { defineComponent, reactive, ref, watch } from 'vue'
import { isArray, isDayJs, isEmpty } from '@deal-ant/utils'
import dayjs from 'dayjs'
import { daFormProps } from './props'
import * as formFragment from './form-fragment'
import { setDefaultFormData } from './utils/index'
import type { Form } from 'ant-design-vue'
export default defineComponent({
  name: 'DaForm',
  props: daFormProps,
  emits: ['update:value'],
  setup(props) {
    const formData = reactive(props.value || {})
    const formRef = ref<InstanceType<typeof Form>>()
    setDefaultFormData({
      formGroup: props.formGroup,
      form: formData,
      formProps: props.formProps,
    })
    // 处理参数
    function getFormData() {
      const obj = {}
      props.formGroup.forEach((item) => {
        const { key } = item
        const value = formData[key]
        if (
          item.renderKey === 'renderRangePicker' &&
          isArray(value) &&
          isDayJs(value[0]) &&
          (item.elProps?.picker === 'date' || !item.elProps?.picker)
        ) {
          obj[key] = value.map((item) => {
            return isDayJs(item) ? dayjs(item).format('YYYY-MM-DD') : item
          })
          return
        }
        if (item.renderKey === 'renderDatePicker' && isDayJs(value)) {
          return (obj[key] = dayjs(value).format('YYYY-MM-DD'))
        }
        if (!isEmpty(value)) {
          obj[key] = value
        }
      })
      return obj
    }
    return { formData, getFormData, formRef, ...formRef.value }
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
        {this.$slots.buttons && <a-form-item>{this.$slots.buttons()}</a-form-item>}
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
