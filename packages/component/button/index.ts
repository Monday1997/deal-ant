import { withInstall } from '@deal-ant/utils'
import Button from './src/button.vue'
// 此处的name为导出字段 .vue文件中使用哪个标签名由name决定
export const daButton = withInstall(Button)
export default daButton
