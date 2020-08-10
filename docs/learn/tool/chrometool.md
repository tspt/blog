---
title: ChromeTool
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,chrometool
---

# ChromeTool

## 快捷键

### Elements 面板

- `ctrl + shift + D` 切换面板展示位置
- `ctrl + [` 和 `ctrl + ]` 向左或向右切换面板 Tab
- `H` 设置元素 visibility: hidden
- `F2` 编辑当前选中节点
- `ctrl + ↑` 交换当前选中节点与前一个兄弟节点
- `ctrl + ↓` 交换当前选中节点与后一个兄弟节点

### Sources 面板

- `ctrl + shift + O` 查找成员（如 js 对象方法）
- `ctrl + G` 查找某行
- `ctrl + P` 查找文件

### Command 面板

- `ctrl + shift + P` 打开 Command 面板
- 截屏：以 capture 开头进行搜索

## Console 面板功能

### 复制

`copy(variable);`复制变量的值到粘贴板

### Store as global variable 存储为一个全局变量

右键 console.log 输出结果，保存为一个全局变量，命名一次为 temp1, temp2...，操作这些变量不对影响原变量

### save as

在面板右键 save as，将所有内容保存为一个 log 文件

### \$

`$0` 表示当前选中节点的引用，`$1` 表示上一个选中节点的引用，`$n`以此类推

```
// 获取单个元素 $()
$(variable) === document.querySelector(variable)
// 获取集合（数组形式）$$()
$$(variable) === Array.from(document.querySelectorAll(variable))
```

`$_` 表示对上一次（变量执行结果）的引用

### queryObejcts

`queryObjects(Constructor)` 获取构造函数的所有实例
