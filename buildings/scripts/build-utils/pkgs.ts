import { dealAntUiPackage, rootDir } from './index'
// import type { ProjectManifest } from '@pmpm/typs'

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => {
    const position = path.startsWith(rootDir) ? rootDir.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}

// 排除其中的一些依赖部用于打包
export function generateExternal(options: { full: boolean }) {
  const { dependencies, peerDependencies } = getPackageDependencies(dealAntUiPackage)
  return (id: string) => {
    const packages: string[] = [
      'vue',
      'gulpfile',
      '@vue',
      'node_modules',
      'ant-design-vue',
      'dayjs',
      'vue-router',
      'lodash-unified',
      '@ant-design/icons-vue',
    ].concat(peerDependencies)
    if (!options.full) {
      packages.push(...dependencies)
    }
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}
export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}
export const getPackageManifest = (pkgPath: string) => {
  // as ProjectManifest
  return require(pkgPath)
}
