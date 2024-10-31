import { computed, defineComponent, onMounted, ref, unref } from 'vue'
import { Empty } from 'ant-design-vue'
import { daSelectProps } from './props'
import type { DefaultOptionType, FilterFunc } from 'ant-design-vue/lib/vc-select/Select'
import type { SelectValue } from 'ant-design-vue/lib/select'

export default defineComponent({
  name: 'StateSelect',
  props: daSelectProps,
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const currentValue = computed({
      get() {
        return props.value
      },
      set(val) {
        emit('update:value', val)
      },
    })

    const loading = ref(false)
    const elProps = computed(setDefaultSearch)
    function setDefaultSearch() {
      const elProps = props.config.elProps || {}
      const { showSearch, filterOption } = elProps
      if (!filterOption && (showSearch || showSearch === undefined)) {
        elProps.showSearch = true
        const key = elProps?.fieldNames?.label || 'label'
        elProps.filterOption = ((val: string, options: DefaultOptionType) => {
          return options[key].toLowerCase().indexOf(val.toLowerCase()) > -1
        }) as FilterFunc<DefaultOptionType>
      }
      return elProps
    }
    function onSelectChange(value: SelectValue) {
      emit('update:value', value)
      emit('change', value, props.config.options)
    }

    return {
      currentValue,
      loading,
      elProps,
      onSelectChange,
    }
  },
  render() {
    return (
      <a-select
        {...this.elProps}
        options={this.$props.config.options}
        vModel={[this.currentValue, 'value']}
        loading={this.loading}
        vSlots={{
          notFoundContent: () =>
            this.loading ? (
              <a-spin size="small" />
            ) : (
              <a-empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ),
        }}
        onChange={this.onSelectChange}
      />
    )
  },
})
