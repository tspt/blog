---
title: Less
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: css,less
---

## Less

### 变量

```
// 数值变量
@midgray: #666;
// 属性变量
@c: color;
// 选择器变量
@el: el;
// 路径变量
@images: '../images'
// 声明变量
@path: '../../common/css'

@import "@{path}/index.less";
.@{el}-header {
  background: url("@{images}/header.png");
  .@{el}-nav {
    @c: #fff;
    background-@{c}: @midgray;
  }
  &:hover {
    opacity: .7;
  }
}

// v3.0.0
.@{el}-aside {
  color: @midgray;
  .@{el}-s-item {
    // 引用最近的属性名所对应的值
    background: $color;
  }
}
```

### 选择器

```
.el-btn {
  background: #666;

  &-cancel {
    color: #666;
  }
  &-confirm {
    color: #fff;
  }

  .blue-theme & {
    // 觉得适合用于公用组件需要差异化时
    background: #0000d9;
  }
}
```

### extend

继承必须放在选择器最后

```
.basestyle {}
.el-btn {
  &:extend('.basestyle');
}
.el-btn:extend('.basestyle') {}

// 需要完全匹配（除了属性选择器带引号的）
// 不能使用变量的选择器
// 在@media中使用，只匹配当前@media声明内的；否则匹配同层级@median内部的
// 相对于mixins，extend使生成的css更小，mixins只能与简单的选择器一起使用
```

### merge

```
// +  逗号分隔
.boxShadow () {
	box-shadow+: 0 0 2px #999;
}
.el-btn {
	.boxShadow();
  box-shadow+: 0 0 1px #666;
}
// output
.el-btn {
  box-shadow: 0 0 2px #999, 0 0 1px #666;
}


// +_  空格分隔
.translate () {
	transform+_: translate(10px);
}
.el-btn {
	.translate();
	transform+_: rotate(10deg);
}
// output
.el-btn {
  transform: translate(10px) rotate(10deg);
}
```

### mixins

未来版本不推荐缺省括号

```
// 没输出的mixin
.getStyle () {
  color: #ccc;
  background: #fff;
}
.el-btn {
  .getStyle();
}


// !important会适用于所有属性
.getStyle () {
  color: #ccc;
  background: #fff;
}
.el-btn {
  .getStyle() !important;
}


// Named param
.getStyle (@color: #ccc; @background: #fff; @bColor: #999) {
  color: @color;
  background: @background;
  border: 1px solid @bColor;
}
.el-btn {
  .getStyle(#999, @background: #f0f0f0);
}


// arguments
.box-shadow (@x: 0; @y: 0; @blur: 1px; @color: #333) {
  box-shadow: @arguments;
}
.el-btn {
  .box-shadow(1px; 7px);
}


// reset
.getBackground (...) {}
.getBackground (@color: #999; ...) {}
.getBackground (@color: #999; @reset...) {}
.getBackground (@color: #999; @reset...) {}
```

### import

```
@import (reference) 'filename'    // 引用但是不输出
```

### mixins guards

when 里面可以用的比较运算符：=, >=, >, <=, <

```
.getColor (@color) when (lightness(@color) > 50%) {
  background: #fff;
}
.getColor (@color) when (lightness(@color) <= 50%) {
  background: #ffa500;
}

.el-btn {
  .getColor(#ccc);
}
.el-btn {
  .getColor(#000);
}
```

逻辑运算符：and，逗号，not

```
// 并且
.getHeight (@size) when (@size > 30) and (@size < 60) {
  width: @size;
}
.el-btn {
  .getHeight(40);
}
// 或
.getWidth (@size) when (@size > 60) , (@size < 20) {
  width: 30px;
}
.el-btn {
  .getWidth(5);
}
// 非
.getRadius (@n) when not (@n > 10) {
  border-radius: @n;
}
.el-btn {
  .getRadius(7);
}
```

default()为默认匹配，当其余条件不满足时匹配

```
.getShadow (@size) when (isnumber(@size)) and (@size < 10) {
  box-shadow: 0 0 @size #ccc;
}
.getShadow (@size) when (default()) {
  box-shadow: 0 0 1px #ccc;
}
.el-btn {
  .getShadow(7px);
}
```

### css guards

```
// v1.5.0
@size: 20px;
button when (isnumber(@size)) and (@size > 10) {
  width: @size;
}

.el-btn {
  @size: 20px;
  & when (isnumber(@size)) and (@size > 10) {
    color: #ccc;
  }
}
```

### loops

```
.setCol (@n, @i: i) when (@i =< @n) {
  .el-col-@{i} {
    width: 100% * @i / 12;
  }
  .setCol(@n, @i + 1);
}
.setCol(12, 1);
```
