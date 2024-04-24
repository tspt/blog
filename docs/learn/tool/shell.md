---
title: Shell
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,shell
---

## 变量

### 变量组成

英文、数字、下划线

```shell
#!/bin/bash

month=6

### 使用变量：$month 或 ${month} 推荐第二种方式，能在字符串中使用变量
echo $month
echo ${month}
echo "This is ${month} month"
```

### 只读变量 readonly

```shell
#!/bin/bash

month=6
readonly month
month=7   #输出error
```

### 删除变量 unset

不能删除只读变量

```shell
#!/bin/bash

month=6
unset month
echo month  #输出空
```

### 字符串

- 单引号
  单引号里的字符会按原样输出，单引号中使用变量是无效的
  单引号里出现的单引号必须是成对出现，成对出现可以作为字符串拼接使用
- 双引号
  双引号里可以有变量
  双引号里可以出现转义字符
- 不用引号

```shell
#!/bin/bash

#### 获取长度：用#
month=December
echo ${#month}  # 8

#### 截取
start=1
end=4
echo ${month:start}   # ecember
echo ${month:start:end}   # ecem

#### 查找子字符串：用反引号包裹，查找字符的位置，哪个字母先出现就计算哪个
echo `expr index "${month}" em`  # 2
```

### 数组

用圆括号包裹，空格隔开或者换行展示，脚标从 0 开始

```shell
#!/bin/bash

day=(Monday Tuesday Wednesday Thursday Friday Saturday Sunday)
week=(
  Mon
  Tue
  Wed
  Thur
  Fri
  Sat
  Sun
)
echo ${day[6]}  # Sunday
echo ${week[6]} # Sun

#### 赋值
day[6]=six
echo ${day[6]}  # six

#### 获取所有元素：用*或@
echo ${week[*]} # Mon Tue Wed Thur Fri Sat Sun
echo ${week[@]} # Mon Tue Wed Thur Fri Sat Sun

#### 获取长度：用#
echo ${#day[*]}  # 7
echo ${#day[@]}  # 7
```

### 注释

```shell
#!/bin/bash

# 这是一个单行注释

:<<EOF
这是一个多行注释
这是一个多行注释
这是一个多行注释
EOF


:<<!
这是一个多行注释
这是一个多行注释
这是一个多行注释
!
```

## 运算

`expr`是用于表达式，条件语句需要用`[]`包裹

```shell
#!/bin/bash

a=10
b=20

value1=`expr ${a} + ${b}`
value2=`expr ${a} - ${b}`
value3=`expr ${a} \* ${b}`
value4=`expr ${a} / ${b}`
value5=`expr ${a} % ${b}`
echo ${value1} ${value2} ${value3} ${value4} ${value5}

if [ ${value1} == ${value2} ]
then
  echo '等于'
fi
if [ ${value1} != ${value2} ]
then
  echo '不等于'
fi
```
