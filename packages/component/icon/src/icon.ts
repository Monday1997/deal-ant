import type { ExtractPropTypes } from 'vue'
export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
  },
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
export enum CIconType {
  blue = 'blue',
  red = 'red',
  green = '#bfa',
}
