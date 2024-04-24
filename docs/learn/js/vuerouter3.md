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
npm install vue-router -S
```

## 初始化实例

```js
// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router


// main.js
import Vue from 'vue'
import App from './App.vue'

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app);
```

## 样例

```js
import login from "../pages/login";
import home from "../pages/home";
import user from "../pages/user";
import list from "../pages/list";
import detail from "../pages/detail";
import detailCenter from "../pages/detailCenter";
import related from "../pages/related";

var routes = [
  {
    path: "/",
    redirect: "/login", // 重定向
  },
  {
    path: "/login",
    component: login,
    name: "login",
  },
  {
    path: "/home",
    component: home,
    name: "home",
  },
  {
    path: "/user",
    component: user,
    name: "user",
    meta: {
      requiresAuth: true, // 自定义属性值
    },
  },
  {
    path: "/list",
    component: list,
    name: "list",
  },
  {
    path: "/detail/:id",
    component: detail,
    name: "detail",
    props: true, // 用于组件传参
    children: [
      //  /detail/777
      {
        path: "",
        component: detailCenter,
        name: "detailCenter",
      },
      //  /detail/777/related
      {
        path: "related",
        component: related,
        name: "related",
      },
    ],
  },
];
```

## 编程式

- `$router.push(location, onComplete?, onAbort?)`
- `$router.replace(location, onComplete?, onAbort?)`
- `$router.go(num)`

`<router-link :to="...">` 等同 `$router.push`，使用 path 后，params 无效

```js
this.$router.push("home");
this.$router.push({ path: "home" });
this.$router.push({ path: "list", query: { date: "2021" } }); // /list?date=2021

this.$router.push({ name: "detail", params: { id: "777" } }); // /detail/777
let id = "777";
this.$router.push({ path: `detail/${id}` });
this.$router.push({ path: "detail", params: { id } });
```

## 动态路由

使用路由参数时，`detail/777`变为`detail/7777`，组件复用，不会触发组件生命周期钩子

## 组件传参

解耦处理，避免使用`this.$route.params.id`来访问参数

```js
// 路由对象中设置props为true，访问 /detail/777，这里的id值就是777
export default {
  data() {
    return {};
  },
  props: ["id"],
};
```

## 守卫

### 导航守卫

参数或查询的改变不会触发进入/离开的导航守卫，会触发`beforeRouteUpdate`

### 全局前置守卫

导航在 resolve 前是等待状态

- to: Route 进入的
- from: Route 离开的
- next 调用处理 resolve 钩子，依赖参数

```js
router.beforeEach((to, from, next) => {
  // next() 跳转到指定地址
  // next(false) 中断当前跳转
  // next('/') 或 next({path: '/'}) 跳转其他地址
});
```

### 全局解析守卫

导航被确认之前，同时组件内守卫和异步路由组件被解析之后

- to: Route 进入的
- from: Route 离开的
- next 调用处理 resolve 钩子，依赖参数

```js
router.beforeResolve((to, from, next) => {
  // next() 跳转到指定地址
  // next(false) 中断当前跳转
  // next('/') 或 next({path: '/'}) 跳转其他地址
});
```

### 全局后置守卫

- to: Route 进入的
- from: Route 离开的

```js
router.afterEach((to, from) => {});
```

### 路由独享守卫

- to: Route 进入的
- from: Route 离开的
- next 调用处理 resolve 钩子，依赖参数

```js
{
  path: '/list',
  component: list,
  name: 'list',
  beforeEnter: (to, from, next) => {
    //
  }
},
```

### 组件内的守卫

- to: Route 进入的
- from: Route 离开的
- next 调用处理 resolve 钩子，依赖参数

```js
{
  methods: {},
  beforeRouteEnter (to, from, next) => {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    // （唯一一个支持回调的守卫），可通过回调访问组件实例，vm指向组件实例
    next(vm => {

    })
  },
  beforeRouteUpdate (to, from, next) => {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) => {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
}
```

### 执行顺序

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 路由元信息

`meta`属性，可用于路由跳转前，进行登录校验

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("isLogin")) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
```

## 支持过渡效果

```html
<transtion :name="transName">
  <route-view></route-view>
</transtion>
```

## 滚动位置

路由切换时，滚动到指定位置及效果

```js
{
  path: '/list',
  component: list,
  name: 'list',
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用

    // 返回期望位置的对象
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
        behavior: 'smooth'  // 'auto'
      }
    }

    // 返回Promise，用于异步计算位置等操作处理
    return new Promise((resolve, reject) => {
      resolve({
        x: 0,
        y: 0,
        behavior: 'smooth'  // 'auto'
      })
    });
  }
},
```

## 路由懒加载

减少对页面的加载，不同路由对应的组件分割为不同的代码块，访问时再去加载组件，  
定义 Webpack 自动代码分割的异步组件

```js
{
  path: '/login',
  component: () => import('../pages/login'),
  name: 'login',
},
```
