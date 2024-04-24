---
title: Pinia
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,pinia
---

## 初始化

```js
// article.js
import {defineStore} from 'pinia';
exports const articleStore = defineStore({
  id: "article",
  state() {
    title: '',
    content: ''
  },
  getters: {
    titleLen(state) {
      return `title's length is ${state.title.length}`;
    },
    contentLen() {
      return `content's length is ${this.content.length}`;
    }
  },
  actions: {
    setInfo(title, content) {
      this.title = title;
      this.content = content;
    }
  }
});

// article.vue
<template>
  <div>
    <div>{{title}}</div>
    <div>{{content}}</div>
  </div>
</template>
import {storeToRefs} from 'pinia';
import {articleStore} from './store/article';
const store = articleStore();
const {title, content} = storeToRefs(store);  // 解构为响应式变量
```

## 修改状态

```js
/* 简单数据修改 */
store.title = "111";

/* 多条数据修改 */
// $patch方式经过优化的，会加快修改速度，对性能有很大好处
store.$patch({
  title: "111",
  content: "222",
});

// 通过action方法
store.setInfo("111", "222");
```

## getters

Pinia 中的 getter 和 Vue 中的计算属性几乎一样，在获取 State 值之前做一些逻辑处理

- getter 中的值有缓存特性，如果值没有改变，多次使用也只会调用一次
- getter 中可以使用 state.属性，也可以使用 this.属性

## 相互调用

```js
// info.js
import {defineStore} from 'pinia';
import articleStore from "./store/article";
const store = articleStore();

exports const infoStore = defineStore({
  id: "info",
  state() {
    title: '',
    content: ''
  },
  getters: {
    allLen() {
      return store.title.length + store.content.length;
    }
  },
  actions: {}
});
```
