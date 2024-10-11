import type { App, Plugin } from 'vue'
export type SFCWithInstall<T extends { name: string }> = T & Plugin
export function withInstall<T extends { name: string }>(comp: T): SFCWithInstall<T> {
  const withInstallComp = comp as SFCWithInstall<T>
  withInstallComp.install = function (app: App) {
    if (!comp.name) {
      throw new Error('Component must have a name property.')
    }
    app.component(comp.name, comp)
  }
  return withInstallComp
}
