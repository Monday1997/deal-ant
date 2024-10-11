命令

目录如下

```js
- package.json
- packages
 - a
  - index.js
  - package.json
 - b
  - index.js
  - package.json
- pnpm-lock.yaml
- pnpm-workspace.yaml
```

查看editorConfig配置使用

将工作区的包作为依赖添加

pnpm add @deal-ant/utils @workspace:* -w

#### .vscode中extensions.json

作为拓展推荐

extensions.json中的唯一标识符填写

![image-20241009220747973](D:\blog and github\自写框架\组件库打包.assets\image-20241009220747973.png)

#### tsconfig.json

compilerOptions.path作用： 别名

- 比如设置 `"@components": ["src/components"]`，之后在代码中就可以使用 `import Button from '@components/Button';` 而不是 `import Button from 'src/components/Button';`。

### gulpfile

使用sucrase后可以在gulpfile.ts中以esmodule方式运行

### 引入.vue文件报错时

引入typing并设置vue.shim.d.ts文件

### play下vite.config.ts引入时报错

找不到@vitejs/plugin-vue

解决：重启vscode就解决了 妈的！！！

## 导入component和play

分析后

以下插件安装于根目录：@vitejs/plugin-vue、@vitejs/plugin-vue-jsx、ant-design-vue、vite(打错)、vue

play中添加 sass

### button组件

注意：页面导入时名字取决于button/index.ts的导出命名，标签使用取决于.vue文件中的name

button/index.ts

```js
import { withInstall } from '@deal-ant/utils'
import Button from './src/button.vue'
// 此处的name为导出字段 .vue文件中使用哪个标签名由name决定
export const daButton = withInstall(Button)
export default daButton

```

button/src/button.ts

```js
import type { ExtractPropTypes } from 'vue'
export const buttonProps = {
  type: {
    type: String,
  },
} as const

export type IbuttonProps = ExtractPropTypes<typeof buttonProps>

```

button/src/button.vue

```html
<template>
  <Button :type="props.type || 'primary'">64</Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { buttonProps } from './button'
defineOptions({
  name: 'DbBtn',
})
const props = defineProps(buttonProps)
</script>

<style scoped></style>

```

设置好with-install.ts

play中正常执行vite就好
