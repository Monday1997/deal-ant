import path from 'path'
import { dest, parallel, series, src } from 'gulp'
import { copy } from 'fs-extra'
import {
  buildConfig,
  dealAntDistDir,
  dealAntUiDir,
  dealAntUiPackage,
  run,
  withTaskName,
} from './build-utils'
import buildModules from './modules'
import buildFull from './full-component'
import generateTypes from './generate-types'
import type { TaskFunction } from 'gulp'

function copyFiles() {
  const copyPackage = () => src(dealAntUiPackage).pipe(dest(dealAntDistDir))
  const copyReadme = () => src(`${dealAntUiDir}/README.md`).pipe(dest(dealAntDistDir))
  return Promise.all([copyPackage(), copyReadme()])
}

// 为es和lib中加入type
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(dealAntDistDir, 'types')
  const copyTypes = (module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}
export default series(
  withTaskName('cleanDist', async () => run('pnpm run clean')),
  parallel(
    buildModules,
    buildFull,
    generateTypes, //ts文件类型打包
    series(withTaskName('buildThemeChalk', () => run('pnpm run build:theme')))
  ),
  parallel(copyFiles, copyTypesDefinitions)
)
