import { defineComponent } from 'vue'
import { formProps } from './index'
export default defineComponent({
  name: 'EasyForm',
  props: formProps,
  setup() {
    return () => <div>this is div</div>
  },
})
