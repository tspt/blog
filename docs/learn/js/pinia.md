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
    // articleStore.amount
    // articleStore.titleLen
    return {
      articleStore,
    };
  },
  methods: {
    initInfo() {
      articleStore.setInfo"111", "222", 2);
    }
  }
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
    ...mapActions(useArticleStore, ["setInfo"]),  // useArticleStore.setInfo()
    ...mapActions(useArticleStore, { setInfoNew: 'setInfo' }),  // this.setInfoNew()
  },
  mounted: function () {
    this.setInfo"111", "222", 2);
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

## 插件

可以执行的操作列表：

- 向 Store 添加新属性
- 定义 Store 时添加新选项
- 为 Store 添加新方法
- 包装现有方法
- 更改甚至取消操作
- 实现本地存储等副作用
- 仅适用于特定 Store

插件仅适用于**在将 pinia 传递给应用程序后创建的 store**，否则将不会被应用。

```js
import { createPinia } from "pinia";
const pinia = createPinia();

function myPiniaPlugin(content) {
  // context.pinia // 使用 `createPinia()` 创建的 pinia
  // context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
  // context.store // 插件正在扩充的 store
  // context.options // 定义存储的选项对象传递给`defineStore()`
}

pinia.use(myPiniaPlugin);
```

### 扩充 store

通过返回对象，为每一个 store 添加属性

```js
pinia.use(() => ({
  info: "test",
}));
```

### 在插件中调用

```js
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 在存储变化的时候执行
  });
  // 在 action 的时候执行
  store.$onAction(
    ({
      name, // action 的名字
      store, // store 实例
      args, // 调用这个 action 的参数
      after, // 在这个 action 执行完毕之后，执行这个函数
      onError, // 在这个 action 抛出异常的时候，执行这个函数
    }) => {
      // 记录开始的时间变量
      const startTime = Date.now();
      // 这将在 `store` 上的操作执行之前触发
      console.log(`Start "${name}" with params [${args.join(", ")}].`);

      // 如果 action 成功并且完全运行后，after 将触发。
      // 它将等待任何返回的 promise
      after((result) => {
        console.log(`Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`);
      });

      // 如果 action 抛出或返回 Promise.reject ，onError 将触发
      onError((error) => {
        console.warn(`Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`);
      });
    }
  );
})``;
```

### 持久化

```js
npm i pinia-plugin-persistedstate
```
