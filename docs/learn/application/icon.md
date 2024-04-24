---
title: Icon
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,icon
---


# Icon 实战

## 安装 svg-sprite-loader

```js
npm i svg-sprite-loader -D
```

## 修改 webpack 配置文件

```js
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: [resolve('src/icons')],
  options: {
    symbolId: 'icon-[name]'
  }
},
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  exclude: [resolve('src/icons')],
  options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
  }
},
```

## 引入 icons

安装 svgo

```js
npm -g install svgo
```

在 src 目录新建一个 icons 文件夹，里面放三个内容：

1. 存放 .svg 文件的 svg 文件夹
2. 全局注册组件的 index.js 文件
3. svgo.yml 文件。

目录结构如下：

```text
-- src
    |
    -- icons
         |
         -- svg
         |   |
         |   -
         |
         -- index.js
         -- svgo.yml
```

```js
// index.js  文件
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg组件

// register globally
Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);
```

```yml
# replace default config

# multipass: true
# full: true

plugins:
  # - name
  #
  # or:
  # - name: false
  # - name: true
  #
  # or:
  # - name:
  #     param1: 1
  #     param2: 2

  - removeAttrs:
      attrs:
        - "fill"
        - "fill-rule"
```

## 注册组件

在 components 文件夹下创建 SvgIcon 文件夹，放置 index.vue

```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

## 全局引入

```js
import "@/icons"; //  全局注册组件
```

## 组件中使用

```vue
<svg-icon icon-class="icon_set" />
```
