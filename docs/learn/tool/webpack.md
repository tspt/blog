---
title: Webpack
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,webpack
---

## 配置

```js
module.exports = {
  // Entry
  entry: {},

  // Output
  output: {
    filename: "",
  },

  // Module
  module: {
    noParse: /jquery|lodash/,
    rules: [{}],
  },

  // Plugins
  plugins: [],

  // Mode
  // value: development production
  mode: "development",

  // Target
  // value: web node
  target: "web",

  // 别名
  alias: {},

  // 扩展
  extensions: [".js", ".json"],

  // devServer
  devServer: {
    open: true,
    openPage: "",
    host: "",
    post: "",
    lazy: true,
    filename: "bundle.js",
    overlay: {
      warnings: true,
      errors: true,
    },
    pubilcPath: "",
    index: "",
    proxy: {
      // 捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，比如API请求/api/store/get, 会被代理到请求 http://www.baidu.com/api/store/get 。
      "/api": {
        /*
          代理的API地址，就是需要跨域的API地址。
          地址可以是域名,如：http://www.baidu.com
          也可以是IP地址：http://127.0.0.1:3000
          如果是域名需要额外添加一个参数changeOrigin: true，否则会代理失败。
        */
        target: "http://localhost:8080/",
        // 这个参数可以让target参数是域名。
        changeOrigin: true,
        /*
          路径重写，也就是说会修改最终请求的API路径。
          比如访问的API路径：/api/store/get，设置pathRewrite: {'^/api' : ''}后，最终代理访问的路径：http://www.baidu.com/store/get，这个参数的目的是给代理命名后，在访问时把命名删除掉。
         */
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

## babel

使用 babel-plugin-transform-runtime 需要将 babel-runtime 当做依赖

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage", // 按需加载
        "debug": true
      }
    ]
  ]
}
```

## 清除 dist 目录

```js
// 默认webpack打包后的dist文件夹下的js文件并不会被自动删除，如果重新打包，会生成新的文件，旧的文件仍然会存在。
// 使用此插件webpack打包后的dist目录中的所有文件将被删除一次

var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].[chunkhash:5].js",
  },
  plugins: [new CleanWebpackPlugin()],
};
```
