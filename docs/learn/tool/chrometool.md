---
title: ChromeTool
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,chrometool
---

## 快捷键

### Command 面板 （全局）

- `ctrl + shift + P` 打开 Command 面板
- 截屏：以 capture 开头进行搜索
- `ctrl + shift + F` 全局搜索，输入`query file:xxx`可以查询并指定文件名
- 输入`Enable Code folding`，在 Sources 面板中的文件，将打开代码折叠功能

### Elements 面板

- `ctrl + shift + D` 切换面板展示位置
- `ctrl + [` 和 `ctrl + ]` 向左或向右切换面板 Tab
- `H` 设置元素 visibility: hidden
- `F2` 编辑当前选中节点
- `ctrl + ↑` 交换当前选中节点与前一个兄弟节点
- `ctrl + ↓` 交换当前选中节点与后一个兄弟节点
- `alt + click`，用鼠标点击向下三角符号，可以展开收起该元素下所有的子元素

### Sources 面板

- `ctrl + shift + O` 查找成员（如 js 对象方法）
- `ctrl + G` 查找某行
- `ctrl + P`或`ctrl + O` 均可查找文件
- `alt + -` 在 page 选项右侧的文件，回到上一个鼠标聚焦地方
- `alt + +` 在 page 选项右侧的文件，回到下一个鼠标聚焦地方
- `ctrl + D` 选中同样的内容，使用一次选中一个
- `ctrl + U` 取消选中同样的内容，使用一次取消选中一个

按住`ctrl`不放，鼠标点击右侧文件的某个内容，会出现一个光标，这样可以生成多个光标，同时能够编辑修改几个地方的内容  
按住`alt`，用鼠标选中右侧文件的内容，以鼠标点击处为起点，可以多行多列选中  
用鼠标选中右侧文件的内容，按住`ctrl + shift + E`，可以快速复制到 console 面板

### Console 面板

#### 复制

`copy(variable);`复制变量的值到粘贴板

#### Store as global variable 存储为一个全局变量

右键 console.log 输出结果，保存为一个全局变量，命名一次为 temp1, temp2...，操作这些变量不对影响原变量

#### save as

在面板右键 save as，将所有内容保存为一个 log 文件

#### $

`$0` 表示当前选中节点的引用，`$1` 表示上一个选中节点的引用，`$n`以此类推

```js
// 获取单个元素 $()
$(variable) === document.querySelector(variable);
// 获取集合（数组形式）$$()
$$(variable) === Array.from(document.querySelectorAll(variable));
```

`$_` 表示对上一次（变量执行结果）的引用

#### queryObejcts

`queryObjects(Constructor)` 获取构造函数的所有实例

#### 监听事件

- monitorEvents(object [, events]) 监听某一类型的事件
- unmonitorEvents(object) 取消监听
- getEventListeners(object) 获取 dom 所有监听事件

```js
monitorEvents(window, "click");
```

#### 查找事件定义源

`EventListener`中对应的事件下找到 handler，右键点击`show function definition`

### Network 面板

在 filter 输入框中输入`is:`，可以看到有四个选择，筛选出四个不同类型的请求结果；或者其他的内容进行筛选，例如 larger-than:100，status-code:200
