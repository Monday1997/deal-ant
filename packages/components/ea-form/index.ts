import Form from './src/easy-form'
import type { SFCWithInstall } from '@deal-ant/utils'
const _Form = Form as SFCWithInstall<typeof Form>
_Form.install = function (app) {
  app.component(_Form.name!, _Form)
}
export const EaForm = _Form
export default _Form
