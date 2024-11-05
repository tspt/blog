---
title: VueRouter
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vuerouter
---

## 安装

```text
npm install vue-router@4 -S
```

## 初始化实例

```js
// router.js
import { createRouter } from "vue-router";

const router = createRouter({
  routes,
});
export default router;

// main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(APP).use(store).use(router).mount("#app");
```

## 组合式 API

```js
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
```

## 扩展 Routerlink

## 导航故障

### 全局导航故障

```js
router.afterEach((to, from, failure) => {
  if (failure) {
    sendToAnalytics(to, from, failure);
  }
});
```

## 动态路由

`route.addRoute` 和 `route.removeRoute`
