import path from 'path'

export const rootDir = path.resolve(__dirname, '../../../')
export const distDir = path.resolve(rootDir, 'dist')
export const dealAntDistDir = path.resolve(distDir, 'deal-ant')

export const pkgRoot = path.resolve(rootDir, 'packages')
export const dealAntUiDir = path.resolve(pkgRoot, 'deal-ant-ui')
export const dealAntUiPackage = path.resolve(dealAntUiDir, 'package.json')

export const docRoot = path.resolve(rootDir, 'docs')
