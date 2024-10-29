import { defineComponent, reactive, ref, watch } from 'vue'
import { daFormProps } from './props'
import * as formFragment from './form-fragment'
import { setDefaultFormData } from './utils/index'
export default defineComponent({
  name: 'DaForm',
  props: daFormProps,
  emits: ['update:value'],
  setup(props, { emit }) {
    const formData = reactive(props.value)
    const formRef = ref(null)
    setDefaultFormData(
      { formGroup: props.formGroup, form: formData, originProps: props.originProps },
      emit
    )
    function getFormRef() {
      return formRef.value
    }

    return { formData, formRef, getFormRef }
  },

  render() {
    const defaultRender = () => (
      <>
        {this.$props.formGroup.map((item) =>
          this.$slots[item.key] ? (
            this.$slots[item.key]!()
          ) : (
            <>{formFragment[item.fragmentKey](item, this.formData)()}</>
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
                    {formFragment[item.fragmentKey](item, this.formData)()}
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
        {...this.$props.originProps}
        model={this.formData}
        ref={(ref: any) => (this.formRef = ref)}
      >
        {this.$props.grid ? gridLayoutRender() : defaultRender()}
      </a-form>
    )
  },
})
