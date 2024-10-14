import path from 'path'
import { dealAntDistDir } from './build-utils'
export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(dealAntDistDir, 'es'),
    },
    bundle: {
      path: 'deal-ant/es',
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(dealAntDistDir, 'lib'),
    },
    bundle: {
      path: 'deal-ant/lib',
    },
  },
}
export type BuildConfig = typeof buildConfig
export enum PKG {
  PKG_PREFIX = '@deal-ant',
  PKG_NAME = 'deal-ant',
}
