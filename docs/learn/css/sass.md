---
title: Sass
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: css,sass
---

## Sass

### 1. Sass 环境配置

- 下载 ruby 安装包，查看 ruby 安装成功：ruby -v
- 移除 gem 源：gem sources --remove https://rubygems.org/
- 替换 gem 源：gem sources -a https://gems.ruby-china.com/
- 安装 sass：gem install sass
- 安装 compass：gem install compass
- 更新 sass：gem update sass
- 查看 sass 安装成功：sass -v

### 2. Sass 运行

#### 2.1 命令行编译

```
//单文件
sass index.scss index.scss
//监听单文件
sass --watch index.scss:index.scss
//监听文件夹
sass --watch src/assets/sass:src/assets/css
```

#### 2.2 命令行编译配置选项

```
//解析后排版格式
--style nested | expanded | compact | compressed
//开启sourcemap调试
--sourcemap
```

### 3. 写法

#### 3.1 嵌套

```css
.side {
  background: #999;
  &:hover {
    color: #c6c6c6;
  }
  .side-item {
    width: 100%;
  }
}
```

#### 3.1.1 属性嵌套

```css
.nav {
  font: {
    size: 16px;
    family: "Microsoft Yahei";
    weight: bold;
  }
}
```

#### 3.2 注释

多行注释`/**/`会被编译到 css 文件中，单行注释`//`不会  
compressed 模式下，多行注释第一个字符为!时，会保留该注释

#### 3.3 变量

```css
$basecolor: #363636;
//局部变量转换为全局变量
.nav {
  $bgColor: #363636 !global;
  background: $bgColor;
}
.side {
  background: $bgColor;
}
```

#### 3.4 数据类型

- 数字
- 字符串
- 颜色
- 布尔值
- 数组，空格或逗号隔开
- map

#### 3.5 运算符

/：

- 值或值的一部分，是变量或函数的返回值
- 值被圆括号包裹
- 值是算术表达式的一部分

+： null 被当作空字符串

#{}: 使用变量，同时可以避免运算符

!default：给变量赋值，如果值为 null 或未赋值过

#### 3.6 @-Rules 与指令

#### 3.6.1 @import

@import "_index.scss"加入`_`不会编译该文件  
@import 四类普通 css 语句

- ".css"
- http://
- url()
- media queries

#### 3.6.2 @media

@media 嵌套在 css 规则内，会编译到最外层，包含嵌套的父选择器

```css
.nav {
  height: 66px;
  @media screen and (max-width: 320px) {
    height: 48px;
  }
}
```

@media 互相嵌套，编译时会自动添加 and

```css
@media screen and (max-width: 320px) {
  .nav {
    @media (orientation: langscape) {
      height: 36px;
    }
  }
}
```

#### 3.6.3 @extend

@extend 继承所有包含该选择器的样式  
@extend 多重延伸

```css
.rectangle {
  width: 52px;
  height: 26px;
}
.square {
  width: 26px;
}
.circle {
  border-radius: 50%;
  @extend .rectangle, .square;
  //@extend .rectangle;
  //@extend .square;
}
```

@extend 继续延伸

```css
.square {
  @extend .rectangle;
}
.circle {
  @extend: .square;
}
```

@extend 选择器列

```css
.rectangle {
  width: 52px;
  height: 26px;
  &:hover {
    color: #999;
  }
}
.square {
  width: 26px;
  @extend .rectangle;
}
```

占位符选择器%，忽略不用的样式，并且自身不会被编译

```css
.rectangle {
  & span%active {
    color: #999;
  }
}
.square {
  @extend %active;
}
```

!optional 声明不生成新选择器，同时可以避免报错

```css
div.rectangle {
  width: 52px;
  height: 26px;
}
a.square {
  @extend .rectangle !optional;
}
```

@media 中，@extend 必须延伸相同指令层中的选择器

#### 3.7 @at-root

@at-root

```css
.rectangle {
  & span {
  }
  @at-root p {
  }
}
```

@at-root (without: ...)

```css
@media screen and (max-width: 320px) {
  .nav {
    height: 36px;
    @at-root (without: media) {
      background: #999;
    }
  }
}
```

@at-root (with: ...)

```css
@media screen and (max-width: 320px) {
  .nav {
    height: 36px;
    @at-root (with: media) {
      background: #999;
    }
  }
}
```

#### 3.8 控制指令

#### 3.8.1 if() @if

```css
$basecolor: #999;
.nav {
  //返回一个值
  width: if(true, 26px, 52px);
  @if $basecolor == #666 {
    color: #666 + #333;
  } @else if $basecolor == #999 {
    color: #999 + #333;
  } @else {
    color: #000;
  }
}
```

#### 3.8.2 @for

```css
//to范围 [n, m)
@for $i from 6 to 9 {
  .item-#{$i} {
    width: 6px * $i;
  }
}
//throught范围 [n, m]
@for $i from 6 through 9 {
  .item-#{$i} {
    width: 6px * $i;
  }
}
```

#### 3.8.3 @each

```css
//@each $var in <list>
@each $fruit in apple, pear, banana {
  .#{$fruit}-icon {
    background-image: url("/images/#{$fruit}.png");
  }
}
@each $fruit, $color in (apple, red), (pear, green), (banana, yellow) {
  .#{$fruit}-icon {
    background-image: url("/images/#{$fruit}.png");
    background-color: $color;
  }
}
@each $fruit, $color in (apple: red, pear: green, banana: yellow) {
  .#{$fruit}-icon {
    background-image: url("/images/#{$fruit}.png");
    background-color: $color;
  }
}
```

#### 3.8.4 @while

```css
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 6px * $i;
  }
  $i: $i - 1;
}
```

#### 3.9 混合指令

#### 3.9.1 @mixin @include

```css
//定义
@mixin inner-wrap {
  font: {
    size: 16px;
    weight: bold;
    family: "Microsoft Yahei";
  }
  background: #c6c6c6;
}
@mixin outer-wrap {
  .el-upload {
    color: #666;
    background: #999;
  }
}

//引用
.el-article {
  padding: 6px;
  @include inner-wrap;
}
//最外层引用
@include outer-wrap;
//混合引用
@mixin cont-wrap {
  @include outer-wrap;
  @include inner-wrap;
}

//带参数
@mixin cont-size($w, $h: 26px) {
  width: $w;
  height: $h;
}
@mixin cont-pos($l: 0, $t: 0, $r: 0, $b: 0) {
  left: $l;
  top: $t;
  right: $r;
  bottom: $b;
}
@mixin cont-style($c, $bg, $bd) {
  color: $c;
  background: $bg;
  border-color: $bd;
}
@mixin cont-shadow($shadow...) {
  box-shadow: $shadow;
}
$colors: #666, #999, #c6c6c6;
.el-box {
  @include cont-pos($t: 20px);
  @include cont-size(26px);
  @include cont-style($colors...);
  @include cont-shadow(0 0 2px #666, -2px -2px 2px #999);
}
```

#### 3.9.2 @content

```css
//向混合样式导入内容
@mixin cont-box {
  box-sizing: border-box;
  @content;
}
.el-image {
  @include cont-box {
    display: flex;
  }
}
```

#### 3.9.3 书写方便

> @mixin 简写 =  
>  @include 简写 +

#### 3.10 函数指令

@function @return

```css
@function set-size($n, $m) {
  @return $n * $m * 6;
}
.el-side {
  width: set-size(6, 9);
}
```
