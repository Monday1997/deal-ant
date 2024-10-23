import type { ExtractPropTypes } from 'vue'
export const formProps = {
  elProps: String,
}
export type FormProps = ExtractPropTypes<typeof formProps>
