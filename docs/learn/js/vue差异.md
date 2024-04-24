---
title: Vue
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vue
---

### v-if 和 v-for 优先级

2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。  
3.x 版本中 v-if 总是优先于 v-for 生效。

### v-bind 合并行为

2.x 语法  
独立的 Attribute 覆盖对象里面的

```js
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="red"></div>
```

3.x 语法  
按照顺序，后面的覆盖前面的

```js
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="blue"></div>

<!-- 模板 -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- 结果 -->
<div id="red"></div>
```

### VNode 生命周期事件

2.x 语法  
`hook:`

```js
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

3.x 语法
`hook-` 或者驼峰写法

```js
<template>
  <child-component @vnode-updated="onUpdated">
</template>


<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```
