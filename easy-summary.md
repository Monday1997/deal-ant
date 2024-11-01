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
pnpm link --dir=dist/deal-ant

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
- autoprefixer添加一些兼容前缀如 webkit-
- cssnano   用于压缩和优化 CSS ,可以删除不必要的空格、注释，合并规则等，以减小 CSS 文件的大小。 项目中的配置避免了对颜色和字体进行转化
- postcss用于处理css  允许你使用各种插件来转换、优化和分析 CSS 代码
- .

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
    // 解决斜杠反斜杠问题
    const rootDirData =process.platform === 'win32'?rootDir.replace(/\\/g, '\/'): rootDir
    const position = path.startsWith(rootDirData) ? rootDir.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}
```

### VueCompiler

## 打包

### 清除命令

实质运行："clean": "rimraf dist/deal-ant"
thTaskName('cleanDist',async()=>run('pnpm run clean'))

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

### theme-chalk打包

- font转移至dist下

- 转化为css并压缩

- 将dist转到根目录dist/theme-chalk下

- 将原始资源打包只dist/theme-chalk/src下

### typescript打包

[可参考链接](https://gitcode.csdn.net/66ca0d7baa1c2020b359b0b9.html)

```js
import { Project } from 'ts-morph'
const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,//只输出类型文件
    allowJs: true,
    declaration: true,
    outDir: path.resolve(dealAntDistDir, 'types'),
    baseUrl: rootDir,
    preserveSymlinks: true,//
    skipLibCheck: true,
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: path.resolve(rootDir, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,//
  })
```

**备注**：后续整理project.createSourceFile和 project.addSourceFileAtPath以及VueCompiler

```js
// 获取要转义的sourcefiles
  const soruceFiles = await addSourceFiles(project)
  const tasks = soruceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput() //
    const emitFiles = emitOutput.getOutputFiles()
    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true,
      })
      await writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf-8')
    })
    await Promise.all(subTasks)
  })
  await Promise.all(tasks)
```

```js
 const emitOutput = sourceFile.getEmitOutput() // 获取编译器的发射输出。
    const emitFiles = emitOutput.getOutputFiles() //获取实际生成的发射文件（应为 .d.ts 文件）
```

play中正常执行vite就好

bundle.write中preserveModulesRoot是维持原始文件夹结构的

## 文档

vitepress
:::demo操作

### demo

#### 组件

将demo作为全局组件在 .docs/vitepress/theme/index.ts中导入并使用
明确模块使用如下
:::demo 说点东西
button //example下的.vue文件路径
:::

接收三个参数
source:渲染的vue文件
path:文件路径
raw-source:文件文字内容

实现展示/隐藏代码
查看渲染结果

#### 插件-plugin

在.vitepress/config.mts中配置使用

```js
{
  {
    (md) => mdPlugin(md)
  }
}
```

plugin内容如下

```js
import mdContainer from 'markdown-it-container'
import createDemoContainer from './demo.ts'
export const mdPlugin = (md) => {
  // :::demo的效果
  md.use(mdContainer, 'demo', createDemoContainer(md))
}

```

写下demo插件

```ts
import path from 'path'
import fs from 'fs'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string
}

function createDemoContainer(md: MarkdownIt): ContainerOpts {
  return {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        // 拿到描述信息
        const description = m && m.length > 1 ? m[1] : ''
        // idx+2的那个信息中包含文件内容 可以children[0].content拿到
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // 写下的文件名
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(__dirname, `../../example/${sourceFile}.vue`),
            'utf-8'
          )
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<Demo source="${encodeURIComponent(
          md.render(`\`\`\` vue\n${source}\`\`\``)
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(md.render(description))}">`
      } else {
        return '</Demo>\n'
      }
    },
  }
}

export default createDemoContainer

```

#### example配置.vue文件

docs目录下配置对应要展示的文件
如 button

#### 在文件中使用

:::demo
button
:::

ts中关于给对象属性赋值函数
```ts
type objGo = <T>(value: string, a: T) => T
const obj: {
  go?: boolean | objGo
} = {}

obj.go = ((value: string, list: string[]) => {
  list.push(value)
  return list
}) as objGo

// 或者
obj.go = function (value: string, list: string[]){
  list.push(value)
  return list
} as objGo

```

默认添加了搜索
若不需要搜索需要设置 showSearch=false
不需要担心fieldNames问题
默认添加时间转换功能
后续添加下拉框的分页搜索 远程搜索


form加上依赖注入，form加个setDisplay setDisabled功能

### ts中的this可以这样拿
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  如下使用torefs会出不来 在from暴露对象那块会用到

  ```js
  <template>
  <div>
  {{attr1}}
    {{ggg}}
  </div>
</template>

<script>

import {reactive,toRefs} from 'vue';

export default {
  setup() {
    let obj = reactive({attr1:'ss'})
  setTimeout(()=>
  {
    obj.ggg = 'bbbbb'
  },3000)
    return {...toRefs(obj)};
  },
};
</script>

<style lang="scss" scoped>

</style>

  ```

### expose
暴露公共属性