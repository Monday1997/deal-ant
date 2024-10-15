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
#### package.json中的换行问题
[参考一下这里](https://blog.csdn.net/betterAndBetter_/article/details/139451386)

### gulpfile

使用sucrase后可以在gulpfile.ts中以esmodule方式运行

### 引入.vue文件报错时

引入typing并设置vue.shim.d.ts文件

### play下vite.config.ts引入时报错

找不到@vitejs/plugin-vue

解决：重启vscode就解决了 妈的！！！

### gulp引入错误提示
import { series } from 'gulp'明明安装了gulp ts还提示找不到模块“gulp”或其相应的类型声明。
解决安装 gulp-typescript（还是不行就把node_modules删了再装一次）

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

## 一些依赖说明
- gulp-typescript 用于在构建流程中编译 TypeScript 文件
- @types/gulp：解决gulp引入错误提示

## 工具
### withTaskName
本质：为fn添加添加displayName属性
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name })
### run
调用子进程的spawn
```js
import { spawn } from 'child_process'
import { rootDir } from './path'
export const run = async (command: string) => {
  return new Promise<void>((resolve) => {
    // 将命令分割 如rm -rf
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd!, args, {
      cwd: rootDir,
      stdio: 'inherit',// 直接使用父进程的输入输出流
      shell: process.platform === 'win32', // 默认情况下 linux才支持 rm -rf  windows安装git bash
    })
    app.on('close', resolve)
  })
}
```
### excludeFIles
```js
// 本质就是利用some筛选包含的路径再取反
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => {
    const position = path.startsWith(rootDir) ? rootDir.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}
```
## 打包
### 清除命令
实质运行："clean": "rimraf dist/deal-ant"
代码中 withTaskName('cleanDist',async()=>run('pnpm run clean'))
### 打包除ui页外packages下所有js,ts,vue

```js
// 获取所有packages资源
 import glob from 'fast-glob'
 // 除去定义中的资源 ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
 const input = excludeFiles(await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }))
  // 打包为一个bundle
const bundle = await rollup({
    input,
    plugins: [
      vue({ isProduction: true }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'], // 修正@文件引入
      }),
      esbuild({
        sourceMap: true,
        target: 'es2018',
      }),
      commonjs(),
    ],
    // 将文件中一些引入依赖排除在外 如vue开头 @开头等
    // full用于判断是否处理的是deal-ant-ui
    external: await generateExternal({ full: false }),
    treeshake: false,
  })
```
### 整体打包


```js
const bundle = await rollup({
    input: path.resolve(dealAntUiDir, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }), // 排除package.json中的依赖
  })
  // 打包为cjs和esm版本
  await writeBundles(bundle, [
    {
      format: 'cjs',
      file: path.resolve(dealAntDistDir, 'index.full.js'),
      exports: 'named',
      name: 'deal-ant',
      sourcemap: false,
    },
    {
      format: 'esm',
      file: path.resolve(dealAntDistDir, 'index.full.mjs'),
      sourcemap: false,
    },
  ])
```
复制json和readme文件到对应的dist目录下
```js
function copyFiles() {
  const copyPackage = () => src(dealAntUiPackage).pipe(dest(dealAntDistDir))
  const copyReadme = () => src(`${dealAntUiDir}/README.md`).pipe(dest(dealAntDistDir))
  return Promise.all([copyPackage(), copyReadme()])
}
```

play中正常执行vite就好

bundle.write中preserveModulesRoot是维持原始文件夹结构的
