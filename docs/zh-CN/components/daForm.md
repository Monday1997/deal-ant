---
outline: deep
---

# DaForm组件

- 简介：
基于ant-design-vue开发的form组件
表单包含 ``输入框``, ``单选框``, ``下拉选择``, ``多选框`` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。
- 开发缘由：
原始``a-form``开发时需要在template中编写元素，并配置相应属性，开发流程较为繁琐且效率相对较低，而后台用到该组件较为频繁，为提高开发效率，考虑采用配置的方式来实现form开发。并默认了设置必填值时的message,placeholder,clearable，用户可通过elProps进行修改

:::tip
开发过程切勿使用直接修改配置的方式修改元素属性，而应该采用依赖注入并配合setConfig,setProps等方式修改元素属性（开发中）
:::

### 基本使用

``DaForm``的属性依旧如同``a-form``,但加多了``form-group``属性配置form表单

列表配置中``formProps``用于设置form-item属性，``el-props``用于设置表单元素的属性，如el-input,el-select,el-radio等
key,label,renderKey为基本配置

:::demo
 daForm/base1
:::

### 栅格布局

daFom保留antDesign原始布局 及添加layout属性（``horizontal`` | ``vertical`` | ``inline``）即可设置对应布局。

在此基础上添加grip布局,只需为form加入grid属性即可，该属性常用于表格之类的搜索栏使用，使得搜索框可对应页面响应式变化

grid默认相关配置如下：

```js
 const colspan = {
      xs: 24,
      sm: 24,
      md: 8,
      lg: 8,
      xl: 6,
      xxl: 4,
      xxxl: 4,
  }
```

开启grid布局之后,可在每个item中配置colspan属性自定义效果，若配置了colspanDouble属性则会占据两个默认配置位置
:::demo
 daForm/grid
:::
:::tip
colspan相关详细配置可参考[ant文档](https://3x.antdv.com/components/grid-cn)
:::

formatter: numToBool,boolToNum,dateToString,dateToTimes,

### 依赖注入——表单项动态关联

#### setElProps

#### setDisplay

#### setFormProps
