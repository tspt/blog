---
title: Webpack
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,webpack
---

```
module.exports = {
  // Entry
  entry: {

  },

  // Output
  output: {
    filename: '',
  },

  // Module
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {

      }
    ]
  },

  // Plugins
  plugins: [

  ],

  // Mode
  // value: development production
  mode: 'development',

  // Target
  // value: web node
  target: 'web',


  // 别名
  alias: {

  },

  // 扩展
  extensions: ['.js', '.json'],

  // devServer
  devServer: {
    open: true,
    openPage: '',
    host: '',
    post: '',
    lazy: true,
    filename: 'bundle.js',
    overlay: {
      warnings: true,
      errors: true
    },
    pubilcPath: '',
    index: '',
    proxy: {
      '/api': 'http://localhost:8080/',
    },
  }

}
```

### babel

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
