import { dest, parallel, series, src } from 'gulp'
import { dealAntDistDir, dealAntUiDir, dealAntUiPackage, run, withTaskName } from './build-utils'
import buildModules from './modules'
import buildFull from './full-component'
function copyFiles() {
  const copyPackage = () => src(dealAntUiPackage).pipe(dest(dealAntDistDir))
  const copyReadme = () => src(`${dealAntUiDir}/README.md`).pipe(dest(dealAntDistDir))
  return Promise.all([copyPackage(), copyReadme()])
}
export default series(
  withTaskName('cleanDist', async () => run('pnpm run clean')),
  parallel(buildModules, buildFull),
  copyFiles
)
