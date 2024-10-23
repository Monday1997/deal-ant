import type { ExtractPropTypes } from 'vue'
export const buttonProps = {
  type: {
    type: String,
  },
} as const

export type IbuttonProps = ExtractPropTypes<typeof buttonProps>
