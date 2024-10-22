import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import {
  buildConfig,
  dealAntUiDir,
  excludeFiles,
  generateExternal,
  pkgRoot,
  writeBundles,
} from './build-utils'
import type { ModuleFormat, OutputOptions } from 'rollup'
export default async function buildModules() {
  // packages下所有ts,js,vue文件
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      vue({ isProduction: true }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'], // 修正@文件引入
      }),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
      commonjs(),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  })
  await writeBundles(
    bundle,
    Object.entries(buildConfig).map(([module, config]): OutputOptions => {
      return {
        format: config.format as ModuleFormat,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        entryFileNames: `[name].${config.ext}`,
        preserveModules: true,
        preserveModulesRoot: dealAntUiDir,
      }
    })
  )
}
