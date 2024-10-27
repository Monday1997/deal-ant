import { defineComponent, ref, watch } from 'vue'
import { isFunction } from '@deal-ant/utils'
import { daFormProps } from './props'
import * as formFragment from './form-fragment'

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

export default defineComponent({
  name: 'DaForm',
  props: daFormProps,
  emits: ['update:value'],
  setup(props) {
    const formData = ref({})
    watch(
      () => props.value,
      (val) => {
        if (val) {
          formData.value = val
        }
      },
      { immediate: true }
    )

    const formRef = ref(null)
    function getFormRef() {
      return formRef.value
    }
    const originData = ref({})
    const elData = ref({})
    for (const key in props.dependency) {
      const stopWatch = watch(props.dependency[key], (val) => {
        // 找到所在的key的watchDeps
        const currentItem = props.formGroup.find((item) => item.key === key)
        if (!currentItem) {
          console.error(`deal-form:监听项${key}在formGroup中不存在`)
          return stopWatch()
        }
        if (!isFunction(currentItem!.watchDeps)) {
          console.error(`deal-form:${key}未正确设置设置watchDeps`)
          return stopWatch()
        }
        function setOrigin<T = any>(originKey: string, value: T) {
          elData.value[key] = originData.value[key] || {}
          elData.value[key][originKey] = value
        }
        function setElProps<T = any>(elKey: string, value: T) {
          elData.value[key] = elData.value[key] || {}
          elData.value[key][elKey] = value
        }
        currentItem.watchDeps && currentItem.watchDeps({ setOrigin, setElProps }, val)
      })
    }
    return { formData, formRef, getFormRef, originData, elData }
  },

  render() {
    const defaultRender = () => (
      <>
        {this.$props.formGroup.map((item) =>
          this.$slots[item.key] ? (
            this.$slots[item.key]!()
          ) : (
            <>
              {formFragment[item.fragmentKey](item, this.formData, this.originData, this.elData)()}
            </>
          )
        )}
        {this.$slots.buttons && <a-form-item>{this.$slots.buttons()}</a-form-item>}
      </>
    )
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
                    {formFragment[item.fragmentKey](
                      item,
                      this.formData,
                      this.originData,
                      this.elData
                    )()}
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
