---
title: Vuex
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vuex
---

## 安装

```text
npm install vuex@next -S
```

## 初始化实例

```js
// store.js
import { createStore } from "vuex";

const store = createStore({
  modules: {
    product,
    order,
  },
});
export default store;

// main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(APP).use(store).use(router).mount("#app");
```

## 组合式 API
