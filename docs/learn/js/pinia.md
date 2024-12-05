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
// articleStore.js
import {defineStore} from 'pinia';
exports const useArticleStore = defineStore({
  id: "article",
  state: () => ({
      title: '',
      content: '',
      amount: 1
  }),
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
      this.amount = amount;
    },
    async saveInfo(title, content) {
      let result = await this.postData();
    }
  }
});

// article.vue
<template>
  <div>
    <div>{{title}}</div>
    <div>{{content}}</div>
    <div>{{amount}}</div>
  </div>
</template>
import {storeToRefs} from 'pinia';
import {useArticleStore} from './store/articleStore';
const articleStore = useArticleStore();

// ❌ 这样会破坏响应式，title和content的值就不变了
const {title, content, amount} = articleStore;

// 正确方式
const {title, content, amount} = storeToRefs(articleStore);  // 解构为响应式变量
```

### 使用 setup()

```js
<template>
  <div>
    <div>{{articleStore.title}}</div>
  </div>
</template>
import { useArticleStore } from "./store/articleStore";

export default {
  computed() {
    price() {
      return articleStore.amount * 6;
    }
  },
  setup() {
    const articleStore = new useArticleStore();
    return {
      articleStore,
    };
  },
};
```

### 不使用 setup()

```js
import { mapState } from "pinia";
import { useArticleStore } from "./store/articleStore";

export default {
  computed: {
    ...mapState(useArticleStore, ["contentLen"]),
    ...mapState(useArticleStore, {
      newTitle: "title", // 与从 store.title 读取相同
      newTitleLen: "titleLen", // 与从 store.titleLen 读取相同
      detail: (store) => store.title + "作者",
      price(store) {
        return store.amount * 6;
      },
    }),
    ...mapActions(useCounterStore, ["setInfo"]),
  },
  mounted: function () {
    // this.setInfo"111", "222", 2);
  },
};
```

## state

### 重置状态

```js
const articleStore = useArticleStore();
// 将状态重置为初始值
articleStore.$reset();
```

### 修改状态

```js
/* 简单数据修改 */
articleStore.title = "111";

/* 多条数据修改 */
// $patch方式经过优化的，会加快修改速度，对性能有很大好处
articleStore.$patch({
  title: "111",
  content: "222",
  amount: 2,
});
articleStore.$patch((state) => {
  state.title = "111";
  state.content = "222";
  state.amount = 2;
});

// 通过action方法
articleStore.setInfo("111", "222", 2);
```

## getters

Pinia 中的 getter 和 Vue 中的计算属性几乎一样，在获取 State 值之前做一些逻辑处理

- getter 中的值有缓存特性，如果值没有改变，多次使用也只会调用一次
- getter 中可以使用 state.属性，也可以使用 this.属性

```js
<template>
  <div>
    <div>{{articleStore.titleLen}}</div>
  </div>
</template>
import { useArticleStore } from "./store/articleStore";

export default {
  setup() {
    const articleStore = new useArticleStore();
    return {
      articleStore,
    };
  },
};
```

## store 之间相互调用

```js
// info.js
import {defineStore} from 'pinia';
import useArticleStore from "./store/articleStore";
const articleStore = useArticleStore();

exports const infoStore = defineStore({
  id: "info",
  state() {
    title: '',
    content: ''
  },
  getters: {
    allLen() {
      return articleStore.title.length + articleStore.content.length;
    }
  },
  actions: {}
});
```
