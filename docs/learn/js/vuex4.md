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

```js
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),

      // 在 computed 函数中访问 getter
      double: computed(() => store.getters.double),

      // 使用 mutation
      increment: () => store.commit("increment"),

      // 使用 action
      asyncIncrement: () => store.dispatch("asyncIncrement"),
    };
  },
};
```
