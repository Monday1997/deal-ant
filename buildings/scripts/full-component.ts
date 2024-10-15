import path from 'path'
import { parallel } from 'gulp'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import nodeResolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'

import {
  dealAntDistDir,
  dealAntUiDir,
  generateExternal,
  withTaskName,
  writeBundles,
} from './build-utils'
import type { Plugin } from 'rollup'
async function buildFullEntry() {
  const plugins: Plugin<any>[] = [
    vue({ isProduction: true }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    esbuild({
      sourceMap: true,
      target: 'es2018',
      loaders: {
        '.vue': 'ts',
      },
    }),
    commonjs(),
  ]
  const bundle = await rollup({
    input: path.resolve(dealAntUiDir, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
  })
  await writeBundles(bundle, [
    {
      format: 'cjs',
      file: path.resolve(dealAntDistDir, 'index.full.js'),
      exports: 'named',
      name: 'deal-ant',
      sourcemap: false,
    },
    {
      format: 'esm',
      file: path.resolve(dealAntDistDir, 'index.full.mjs'),
      sourcemap: false,
    },
  ])
}
export default parallel(withTaskName('buildFullComponent', () => Promise.all([buildFullEntry()])))
