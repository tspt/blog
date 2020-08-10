---
title: 小程序
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,小程序
---

# 小程序

## 基础

- import 不具有递归的特性
- include 将目标文件中\<template/>和\<wxs/>外的整个代码引入到当前位置
- js 脚本在 JsCore 中执行，每个页面在各自 WebView 线程进行渲染，切换页面时，运行上下文依旧在同一个 JsCore 线程中
- 所有脚本都在同一个 JsCore 中执行，所以定时器需要切换页面时，需要提前清除

## App

- App()创建 App 实例，getApp()获取 App 实例
- onLaunch （全局只触发一次） / onShow / onHide / onError / 其余字段

## Page

- Page()创建页面实例
- data 属性是初始数据
- onLoad （未被销毁前只触发一次） / onReady （未被销毁前只触发一次） / onShow / onHide / onUnload 生命周期函数
- 触发顺序 onLoad > onShow > onReady
- onReady 执行了表示逻辑层和视图层可以交互
- wx.navigateTo 切换页面或 tab 切换时，会触发 onHide
- wx.redirectTo 或 wx.navigateBack 回到其他页面，会触发 onUnload

### setData

- setData(data, callback)，data 是 key: value 形式的对象
- setData 需要两个线程的一些通讯消耗，为了提高性能，每次设置数据不超过 1024KB
- 不要把 data 中任意一项的 value 设置为 undefined，可能会引起不可预料的 bug

### 页面用户行为

**onPullDownRefresh**
监听用户下拉刷新事件，在 app.json 的 window 选项中或页面配置.json 中设置 enablePullDownRefresh 为 true 开启功能，刷新完后，wx.stopPullDownRefresh 可以停止当前页面的下拉刷新

**onRearchBottom**
监听用户上拉触底事件，在 app.json 的 window 选项中或页面配置.json 中设置触发距离 onReachBottomDistance，在触发距离期间，事件只会触发一次

**onShareAppMessage**
监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示垂直方向已滚动的距离（px）

**onPageScroll**
定义了该事件，右上角才显示转发按钮，点击转发按钮式会调用，此事件需要返回一个 Object，包含 title 和 path 两个字段，用于自定义转发内容

```js
Page({
  onShareAppMessage: function() {
    return {
      title: "自定义转发标题",
      path: "/page/user?id=123",
    };
  },
});
```

### 页面跳转和路由

页面栈最大数量为 10 个页面

只能打开非 Tabbar 页面：  
**wx.navigateTo()** 打开新页面，路由前 onHide，路由后 onLoad、onShow
**wx.redirectTo()** 页面重定向，路由前 onUpload，路由后 onLoad、onShow

只能打开 Tabbar 页面：  
**wx.switchTab()** Tab（除了声明了 Tabbar 页面）

**wx.navigateBack()** 页面返回，路由前 onUpload，路由后 onShow
**wx.reLauch** 重启动，路由前 onUpload，路由后 onLoad、onShow

## 组件

组件名和属性都是小写，多个单词以"-"进行连接；  
组件公有属性：

- id
- class
- hidden 是否可显示
- data-\* 自定义属性
- bind/catch 事件

Image 图片组件属性：

- src
- mode 图片裁剪、缩放的模式
- lazy-load 懒加载
- binderror 错误发生时触发事件
- bindload 加载完毕时触发事件

## API

wx.on*开头的 API 是监听某个事件发生的 API 事件，接受一个 callback 函数为参数；  
API 的 Object 参数一般由 success、fail、complete 三个回调接收接口调用结果；  
wx.get*开头的 API 是获取宿主环境数据的接口；  
wx.set\*开头的 API 是写入数据到宿主环境的接口；

## 事件

- touchstart
- touchmove
- touchcancel
- touchend
- tap
- longpress
- longtap
- transitionend
- animationstart
- animationiteration
- animationend

### 事件绑定和捕获

bind 不会阻止冒泡事件向上冒泡，bind: 以及 capture-bind:  
catch 可以阻止冒泡事件向上冒泡，catch: 以及 capture-catch:

## 兼容

## 使用

- placeholder-class 用于指定 placeholder 的相关样式
- button 的 formType="submit" 和 form 的 bindSubmit="方法"用于提交表单
- background 的 url 只能用 base64 或线上地址
-
