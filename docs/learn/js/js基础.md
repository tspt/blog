---
title: JS基础
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,js基础
---

## 数据类型

- 原始类型：number、string、boolean、null、undefined、symbol、bigint
- 引用类型：Object、Function

Object 包含了很多子类型：Array、RegExp、Math、Map、Set

## 类型判断

- typeof 判断类型，除了 null
- instanceof 通过原型链方式判断构造函数的实例
- Object.prototype.toString

## 类型转换

### 强制转换

转布尔值的规则：

- undefined、null、false、NaN、''、0、-0 都转为 false
- 其他所有值都转为 true，包括所有对象

转数字的规则：

- true 为 1，false 为 0
- null 为 0，undefined 为 NaN，symbol 报错
- 字符串看内容，如果是数字或者进制值就正常转，否则就 NaN
- 对象的规则隐式转换再讲

## 隐式转换

四则运算符：

- 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型
- 其他运算只要其中一方是数字，那么另一方就转为数字

## 作用域

- 全局作用域
- 函数作用域
- 块级作用域

## 原型

- 所有对象都有一个属性 **proto** 指向一个对象，也就是原型
- 每个对象的原型都可以通过 constructor 找到构造函数，构造函数也可以通过 prototype 找到原型
- 所有函数都可以通过 **proto** 找到 Function 对象
- 所有对象都可以通过 **proto** 找到 Object 对象
- 对象之间通过 **proto** 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 Object 对象，再往上就是 null 了

## 深拷贝

```js
// 利用 WeakMap 解决循环引用
let map = new WeakMap();
function deepClone(obj) {
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj);
    }
    let newObj;
    if (obj instanceof Array) {
      newObj = [];
    } else if (obj instanceof Function) {
      newObj = function () {
        return obj.apply(this, arguments);
      };
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags);
    } else if (obj instanceof Date) {
      newobj = new Date(obj);
    } else {
      newObj = {};
    }
    // 克隆一份对象出来
    let desc = Object.getOwnPropertyDescriptors(obj);
    let clone = Object.create(Object.getPrototypeOf(obj), desc);
    map.set(obj, clone);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
```

## 最佳继承方式 - 寄生组合继承

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
function Child() {
  Parent.call(this);
  this.type = "child";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

## 模块化

require 与 import 的区别

- require 支持 动态导入，import 不支持，正在提案 (babel 下可支持)
- require 是 同步 导入，import 属于 异步 导入
- require 是 值拷贝，导出值变化不会影响导入值；import 指向 内存地址，导入值会随导出值而变化

## babel 编译原理

- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译，得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5

## forEach 终止循环替换方法 - every | some

官方推荐方法（替换方法）：every 在碰到 return false 的时候，中止循环。some 在碰到 return true 的时候，中止循环

## 异步处理

```js
// 回调函数时代
// Promise时代
function* test() {
  let result = yield getProductList();
}
async function test() {
  let result = await getProductList();
}
```

## 遍历出所有节点

`createNodeIterator`

```js
const body = document.getElementsByTagName("body")[0];
const it = document.createNodeIterator(body);
let root = it.nextNode();
while (root) {
  console.log(root);
  root = it.nextNode();
}
```

## getComputedStyle、getPropertyValue 获取样式

```js
let box = document.getElementById("box");
box.getPropertyValue("width");
```

## MutationObserver 监听 DOM 结构变化

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById("some-id");

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log("The " + mutation.attributeName + " attribute was modified.");
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

## includes

```js
let arr = [1, 2, NaN];
arr.indexOf(NaN); // -1，找不到NaN
arr.includes(NaN); //  true，能找到NaN
```

## for await of

```js
function fn(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`);
    }, time);
  });
}

async function asyncFn() {
  const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)];
  for await (let x of arr) {
    console.log(x);
  }
}

asyncFn();
```

## Promise

```js
const p = new Promise((resolve, reject) => {
  let num = Math.random();
  num > 0.5 ? resolve() : reject();
});

p.then(handleResolved1, handleRejected1).then(handleResolved2, handleRejected2).then(handleResolved3, handleRejected3);
```

页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，每次请求回来的数据都为按钮的名字。 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。

```js
class Queue {
  promise = Promise.resolve();

  execute(promise) {
    debugger;
    this.promise = this.promise.then(() => promise);
    return this.promise;
  }
}

const queue = new Queue();

const delay = (params) => {
  debugger;
  const time = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, time * 500);
  });
};

const handleClick = async (name) => {
  const res = await queue.execute(delay(name));
  console.log(res);
};

handleClick("A");
handleClick("B");
handleClick("C");
handleClick("A");
handleClick("C");
handleClick("B");
```

## Promise.finally

```js
new Promise((resolve, reject) => {
  resolve("成功喽");
})
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  )
  .finally(() => {
    console.log("我是finally");
  });

new Promise((resolve, reject) => {
  reject("失败喽");
})
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  )
  .finally(() => {
    console.log("我是finally");
  });
```

## 数组分隔符 \_

```js
let num = 1000000000;
let num1 = 1_000_000_000;
```

## yarn | npm

yarn 解决了一些问题：
确定性、采用模块扁平化的安装模式、网络性能更好、采用缓存机制，实现了离线模式，

npm v5 版本加入了 package-lock.json

- dependencies 项目依赖
- devDependencies 开发依赖
- peerDependencies 同版本的依赖
- bundledDependencies 捆绑依赖
- optionalDependencies 可选依赖

依赖是否是被打包，完全是取决你的项目里是否引入了该模块

## this

在 ES5 中，this 永远指向最后调用它的那个对象。

改变 this 指向：

- 使用 ES6 的箭头函数
- 在函数内部使用 \_this = this
- 使用 apply、call、bind
- new 实例化一个对象

### 箭头函数

箭头函数的 this 始终指向函数定义时的 this，而非执行时

## 防抖节流

### 防抖

将多次高频操作优化为只在最后一次执行。  
通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可

```js
function debounce(fn, wait, immediate) {
  let timer = null;

  return function () {
    let args = arguments;
    let context = this;

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

### 节流

每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作。  
通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms 执行一次即可

```js
function throttle(fn, wait, immediate) {
  let timer = null;
  let callNow = immediate;

  return function () {
    let context = this,
      args = arguments;

    if (callNow) {
      fn.apply(context, args);
      callNow = false;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}
```

## 9 种跨域方式

### JSONP

声明一个回调函数，将函数名称作为参数传递给服务器，服务器直接调用该函数，并把数据作为形参传递。
简单兼容性好，仅支持 get 方法，不安全容易遭受 XSS 攻击

### cors

服务器开启 Access-Control-Allow-Origin

#### 简单请求

满足一下两个要求：

- 方法：GET、POST、HEAD
- Content-Type：text/plain、multipart/form-data、application/x-www-form-urlencoded

#### 复杂请求

简单请求剩余的就是复杂请求

### postMessage

解决以下问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的 iframe 消息传递
- 上面三个场景的跨域数据传递

### WebSocket

WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。
通过 Socket.io，很好的封装的 WebSocket 接口，对不支持的向下兼容

### Node 中间件代理

同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。  
需要做以下几个步骤：

- 接受客户端请求。
- 将请求 转发给服务器。
- 拿到服务器 响应 数据。
- 将 响应 转发给客户端。

### Nginx 反向代理

类似于 Node 中间件代理，需要你搭建一个中转 nginx 服务器，用于转发请求

### window.name + iframe

name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）

### location.hash + iframe

a.html 欲与 c.html 跨域相互通信，通过中间页 b.html 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信

### document.domain + iframe

只能用于二级域名相同的情况

## 跨标签页通讯

不同标签页间的通讯，本质原理就是去运用一些可以 共享的中间介质，因此比较常用的有以下方法：

- 通过父页面 window.open()和子页面 postMessage
  - 异步下，通过 window.open('about: blank') 和 tab.location.href = '\*'
- 设置同域下共享的 localStorage 与监听 window.onstorage
  - 重复写入相同的值无法触发
  - 会受到浏览器隐身模式等的限制
- 设置共享 cookie 与不断轮询脏检查(setInterval)
- 借助服务端或者中间层实现