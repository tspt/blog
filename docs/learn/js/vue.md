---
title: Vue
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vue
---

# Vue

## 模板语法

### 动态参数

`:[attributeName]`  
`@[eventName]`

## Class 和 Style

### Class

```js
// 对象语法
<div :class="{ active: isActive, show: isShow }"></div>
// 数组语法
<div :class="[visible, radius]"></div>
data () {
  return {
    isActive: true,
    isShow: true,
    visible: 'el-visible',
    radius: 'el-radius'
  }
}
// output
<div class="active show"></div>
<div class="el-visible el-radius"></div>
```

### Style

```js
<div :style="currentStyle"></div>
<div :style="[baseStyle, currentStyle]"></div>
data () {
  return {
    baseStyle: {
      width: '14px',
      height: '14px'
    },
    currentStyle: {
      color: '#ffa500',
      background: '#fff'
    }
  }
}
// output
<div style="color: rgb(255, 165, 0); background: rgb(255, 255, 255);"></div>
<div style="width: 14px; height: 14px; color: rgb(255, 165, 0); background: rgb(255, 255, 255);"></div>
```

### 多重值

```js
// 渲染数组中最后一个被浏览器支持的值
// 2.3.0+
<div :style="visible"></div>
data () {
  return {
    visible: {
      display: ['-webkit-box', '-ms-flexbox', 'flex']
    }
  }
}
// output
<div style="display: flex;"></div>
```

## 事件修饰符

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

## 插槽

### 具名插槽

```js
// 组件
<div class="el-item">
  <slot></slot>
  <div class="el-item-foot">
    <slot name="foot"></slot>
  </div>
</div>
// 使用组件时
<el-item>
  <p>This is the content.</p>
  <template v-slot:foot>
    <p>This is a paragraph.</p>
  </template>
</el-item>
// output
<div class="el-item">
  <p>This is the content.</p>
  <div class="el-item-foot">
    <p>This is a paragraph.</p>
  </div>
</div>
```

### 作用域插槽

```js
// 组件
<div class="el-item">
  <slot :skin="skin">
    {{ skin.background }}
  </slot>
  <slot name="foot" :skin="skin">
    {{ skin.height }}
  </slot>
  </div>
</div>
// 使用组件时
<el-item>
  <template v-slot:default="someProp">
    {{ someProp.skin.color }}
  </template>
  <template v-slot:foot="someProp">
    {{ someProp.size.width }}
  </template>
</el-item>

data () {
  return {
    skin: {
      color: '#ffa500',
      background: '#fff',
    },
    size: {
      width: 77,
      height: 77
    }
  }
}
```

### 动态插槽名

```js
<el-item>
  <template v-slot:[dynamicSlotName]>
    <p>This is a paragraph.</p>
  </template>
</el-item>

data () {
  return {
    dynamicSlotName: 'dynamicSlotName'
  }
}
```

### 语法简写

```js
v-slot 等价于 #
// 使用时
<el-item>
  <p>This is the content.</p>
  <template #foot>
    <p>This is a paragraph.</p>
  </template>
</el-item>

// 使用时
<el-item>
  <template #default="someProp">
    {{ someProp.skin.color }}
  </template>
  <template #foot="someProp">
    {{ someProp.size.width }}
  </template>
</el-item>
```
