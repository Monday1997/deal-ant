import { parallel, series } from 'gulp'
import { run, withTaskName } from './build-utils'

import buildModules from './modules'
export default series(
  withTaskName('cleanDist', async () => run('pnpm run clean')),
  parallel(buildModules)
)
