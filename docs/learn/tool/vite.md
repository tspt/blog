---
title: Vite
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,vite
---

## vite preview

预览本地构建，开启一个静态 Web 服务器

## 路径

`process.cwd()`是指当前 node 命令执行时所在的文件夹目录
比如在 D:/aaa/bb 目录下执行 yarn build 那么 cwd 就是 D:/aaa/bb

`__dirname`是指被执行 js 文件所在的文件夹目录
比如 D:/aa/scripts

## ES 模块

### <script type=module>

支持内联脚本和加载脚本，默认是 defer，可以设置为 async

- async 脚本每个都会在下载完成后立即执行，无关 script 标签出现的顺序
- defer 脚本会根据 script 标签顺序先后执行

```html
<script src="./app.js" type="module"></script>
```

### CORS 跨域限制

浏览器会禁止加载资源

```html
<!-- http://localhost:5501/type-module.html -->
<html>
  <head>
    <script type="module" src="http://localhost:8082/app.js"></script>
  </head>
  <body>
    count: <span id="count">0</span>
  </body>
</html>
```

### babel-minify

实验性项目，利用 Babel 工具链进行代码压缩，处理 ECMAScript 标准，保留最新特性的同时，减小体积，无需转译为 ES5
