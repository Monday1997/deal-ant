import { defineComponent, onMounted, ref, unref, watch } from 'vue'
import { Empty } from 'ant-design-vue'
import type { FormGroupItem } from './types'
import type { SelectProps } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'

export default defineComponent({
  name: 'StateSelect',
  props: {
    value: {
      type: [Array, Object, String, Number] as PropType<SelectValue>,
      default: undefined,
    },
    config: {
      type: Object as PropType<FormGroupItem<SelectProps>>,
      required: true,
    },
    extra: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const currentValue = ref()
    const loading = ref(false)

    const options = ref<DefaultOptionType[]>([])
    let firstRequest = true

    // url length == 0 触发
    async function onSelectClick() {
      if (
        (!options.value.length || firstRequest || props.config.everyTimeLoad) &&
        props.config.url &&
        !loading.value
      ) {
        try {
          props.config.everyTimeLoad ? (options.value = []) : ''
          loading.value = true
          // const res = await GET(props.config.url, props.extra, { hostType: props.config.hostType })
          // options.value = props.config.optionsFormat
          //   ? props.config.optionsFormat(res, currentValue.value)
          //   : (res.data as DefaultOptionType[])
          firstRequest = false
        } finally {
          loading.value = false
        }
      }
    }

    watch(
      () => props.value,
      (val) => {
        if (currentValue.value !== val && (val || val === 0)) {
          onSelectClick()
        }
        currentValue.value = val
      },
      {
        immediate: true,
      }
    )

    watch(
      () => unref(props.config.options),
      (val) => {
        options.value = val || []
      },
      { immediate: true }
    )

    function onSelectChange(value: SelectValue) {
      emit('update:value', value)
      emit('change', value, options.value)
    }

    onMounted(() => {
      if (props.config.elProps?.mode === 'multiple' && props.value?.[0]) {
        onSelectClick()
      } else if (props.value) {
        onSelectClick()
      }
    })

    return {
      currentValue,
      loading,
      options,
      onSelectClick,
      onSelectChange,
    }
  },
  render() {
    return (
      <a-select
        {...this.$props.config.elProps}
        options={this.options}
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
        onClick={() => this.onSelectClick()}
        onChange={this.onSelectChange}
      />
    )
  },
})
