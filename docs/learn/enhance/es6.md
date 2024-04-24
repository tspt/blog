---
title: ES6
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,es6
---

## 块作用域

---

- 不存在变量提升情况，变量未声明前不能使用
- 同一作用域中不能重复声明变量
- 作用域中的函数声明，会被提升到全局作用域或函数作用域以及当前块级作用域顶部，可以使用函数表达式替换该方式
- 替换匿名立即执行函数

const 声明的变量必须初始化，针对复合类型的数据，数据结构可变不能够控制的；  
var/function 声明的全局变量是顶处对象的属性，let/const/class 声明的全局变量不是顶处对象的属性；  
globalThis 指向全局对象 window。

## 变量解构

---

解构失败时，变量的值为 undefined；  
数组解构，当数组成员严格等于 undefined 时，才会使用默认值；  
对象解构，当对象属性值严格等于 undefined 时，才会使用默认值。找到同名属性，然后赋值给对应变量。

```js
let { color: color, opacity: opacity } = { color: "#ffa500", opacity: 1 };
let { color, opacity } = { color: "#ffa500", opacity: 1 };
```

### 解构赋值

针对函数参数、数组、对象，...变量名必须是最后一个参数

## 运算符 扩展

`?.` 链判断运算符?.有三种写法。

- obj?.prop // 对象属性是否存在
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法是否存在

```js
let a = { b: 1 };
a?.b; // 1
```

`||=`

```js
let x = 0;
let y = 2;

x ||= y; // x || ( x= y)
console.log(x, y); // 2 2
```

`&&=`

```js
let x = 0;
let y = 2;

x &&= y; // x && (x = y)
console.log(x, y); // 0 2
```

`??=`

```js
let x = 0;
let y = 2;

x ??= y; // x ?? (x = y)
console.log(x, y); // 0 2
```

## String 扩展

---

### 方法

```js
// 返回码点大于0xFFFF的字符
String.fromChatCode(value1, value2...);

// 返回一个斜杠都被转义的字符串，用于模板字符串的处理方法
String.raw();
```

### 实例方法

```js
// 是否包含对应的字符串，返回布尔值
str.includes(s, start?);
str.startsWith(s, start?);
str.endsWith(s, start?);

// 返回重复n次的原字符串
// n为正数时，对n向下取整；
// n为0~-1之间时，视为0；
// n为负数或Infinity时，会报错；
// 非数值会转化为数值。
str.replace(n);

// 最大长度 和 用于补全的字符串（第二个参数缺省用空格补全）
str.padStart(len, s?)   // 头部补全
str.padEnd(len, s?)     // 尾部补全

// 返回新字符串
str.trimStart();    // 去掉头部空格
str.trimEnd();    // 去掉尾部空格
```

## 正则表达式

---

返回正则的正文：RegExp.prototype.source  
返回正则的修饰符：RegExp.prototype.flags

```js
// ES5
new RegExp("color", "i");
new RegExp(/color/i);
// ES6，第二个参数为指定修饰符，会覆盖正则默认的修饰符
new RegExp(/color/gi, "i");
```

### u 修饰符

处理大于\uFFFF 的 Unicode 字符，正确处理四个字节的 UTF-16 字符

- 针对大于码点大于 0xFFFF 的 Unicode 字符
- Unicode 字符表示法
- 识别大括号中的字符，为非量词

```js
/^\uD83D/u.test("\uD83D\uDC3c"); // true
/^.$/u.test("\uD83D\uDC3c"); // true
/\u{61}/u.test("a"); // true
/𠮷{2}/u.test("𠮷𠮷"); // true
/^\S$/u.test("𠮷"); // true
/[a-z]/iu.test("\u212A"); // true
```

RegExp.prototype.unicode 返回是否设置了 u 修饰符

### y 修饰符

y 修饰符是全局匹配，后一次匹配从上一次匹配成功的下一个位置开始，不同于 g 修饰符只要剩下位置存在匹配即可，必须从剩余第一个位置开始；  
RegExp.prototype.sticky 返回是否设置了 y 修饰符。

### s 修饰符

.代表任意单个字符，有两个例外：

- 针对四个字节的 UTF-16 字符，可以使用 u 修饰符
- 行终止符：\u000A 换行符\n，\u000D 回车符\r，\u2028 行分隔符，\u2029 段分隔符

通过 s 修饰符可以匹配任意单个字符，即是 dotAll 模式；  
RexExp.prototype.dotAll 返回是否在 dotAll 模式。

### 断言

先行断言 ?=

```js
// 匹配紧接着后面是y的x，(?=y)不计入结果
/x(?=y)/;
```

先行否定断言 ?!

```js
// 匹配紧接着后面不是y的x，(?!y)不计入结果
/x(?!y)/;
```

后行断言 ?<=

```js
// 匹配紧接着前面是y的x，(?<=y)不计入结果
/(?<=y)x/;
```

后行否定断言 ?!<

```js
// 匹配紧接着前面不是y的x，(?<!y)不计入结果
/(?<!y)x/;
```

后行断言执行顺序是从右到左的

```js
// 无后行断言时，第一个括号是贪婪模式，第二个括号只能捕获一个字符
/(\d+)(\d+)$/.exec("2019"); // ["2019", "201", "9"]
// 后行断言时，第二个括号是贪婪模式，第一个括号只能捕获一个字符
/(?<=(\d+)(\d+))$/.exec("2019"); // ["", "2", "019"]
```

针对反斜杠引用（例如\1）也需要放在前面

```js
/(?<=\1i(n))e/.exec("nine");
```

### Unicode 属性类

\p 和 \P，只针对 Unicode 字符，需要加上 u 修饰符，匹配符合 Unicode 某种属性的所有字符  
\P 是\p 的反向匹配，即不满足条件的字符

```js
\p{UnicodePropertyName=UnicodePropertyValue}
\p{UnicodePropertyName}
\p{UnicodePropertyValue}
```

### 具名组匹配

具名组匹配允许为每一个组匹配指定一个名字，便于阅读以及引用，在圆括号内部，模式的头部添加 问号 + 尖括号 + 组名  
通过返回结果的 groups 属性上引用该组名，同时数字序号依然有效。

```js
let reg = /(?<year>\d{4}-(?<month>\d{2})-(?<day>\d{2}))/;
let s = "1989-12-13";
let result = reg.exec(s);
result.groups.year; // 1989
result.groups.month; // 12
result.groups.day; // 13
```

具名组匹配的引用：\k<组名> 等效于 数字引用，例如\1

```js
let reg = /(?<digital>\d+)\w+\k<digital>/;
let s = "1989ts1989";
let result = reg.test(s); // true
```

### String.prototype.matchAll

返回正则在字符串中的多个匹配，是一个遍历器对象，可以用 for...of 循环取出，针对大数组，可以节省资源。

```js
let reg = /\d+[a-zA-Z]+/g;
let s = "1989ts1989jm1989es1989jt";
for (const result of s.matchAll(reg)) {
  console.log(result);
}
```

遍历器对象转化为数组的两种方法：

```js
[...s.matchAll(reg)];
Array.from(s.matchAll(reg));
```

## Number 扩展

---

### 二进制和八进制

0b|0B、0o|0O

```js
0b1110 === 14;
0o16 === 14;
```

### 常量

```js
// 转化为十进制数
Number(value);
// 两个数之间的最小间隔
Number.EPSILON; // 2.220446049250313e-16
// 最大安全整数
Number.MAX_SAFE_INTEGER; // Math.pow(2, 53) - 1;
// 最小安全整数
Number.MIN_SAFE_INTEGER; // -Math.pow(2, 53) + 1;
// 最大正数
Number.MAX_VALUE - // 1.7976931348623157e+308
  // 最小负数
  Number.MAX_VALUE; // -1.7976931348623157e+308
// 最小正数
Number.MIN_VALUE - // 5e-324
  // 最大负数
  Number.MIN_VALUE; // -5e-324
// 非数字
Number.NaN; // NaN
// 正无穷大，溢出时返回该值
Number.POSITIVE_INFINITY; // Infinity
// 负无穷大，溢出时返回该值
Number.NEGATIVE_INFINITY; // -Infinity
```

### 方法

```js
// 转化为十进制数
Number(value);
// 数值是否为NaN，不是NaN返回false
Number.isNaN(value);
// 数值是否为有限数，不是数值返回false
Number.isFinite(value);
// 数值是否为整数，不是数值返回false
Number.isInteger(value);
// 是否为安全整数
Number.isSafeInteger(value);
// 转化为浮点数
Number.parseFloat(value);
// 转化为整数
Number.parseInt(value, radix);
```

### 实例方法

```js
// 返回一个指定位数（[0, 100]，非必填）的指数形式数字
Number.prototype.toExponential(n);
(123456).toExponential(); // 1.23456e+5

// 返回一个指定位数（[0, 100]，非必填）的定点形式数字
Number.prototype.toFixed(n);
(123456).toFixed(7); // "123456.0000000"

// 返回一个指定位数（[1, 100]）的定点形式或指数形式数字
Number.prototype.toPrecision(n);
(123456).toPrecision(7); // 123456.0
```

### 指数运算符

\*\* 是右结合方式

```js
2 ** (2 ** 7) === 2 ** (2 ** 7); //3.402823669209385e+38
let a = 2;
a **= 2 ** 7; // 3.402823669209385e+38
```

## Math

---

非数值内部先转化为数值，无法转为数值的返回 NaN

```js
// 返回整数部分，非数值内部先转化为数值
Math.trunc(value)

// 判断数值是正数、负数、零，返回对应值+1，-1，0|-0
Math.sign(value)

// 立方根
Math.cbrt(value)

// 所有参数的平方和的平方根
Math.hypot(value1, value2, value3...)
```

## Function 扩展

---

函数参数：函数声明时，参数会形成单独一个作用域  
length：返回指定默认参数之前的参数个数，也不包括 reset 参数  
name：

- 一个变量为匿名函数，name 值为变量名
- 一个变量为具名函数，name 值为具名函数值
- 构造函数返回的函数实例，name 值为 anonymous
- bind 返回的函数，name 值会加上'bound '前缀

### 箭头函数

- 不需要参数或需要多个参数，使用圆括号代表参数
- 代码块多于一条语句，使用大括号括起来，并使用 return 语句
- 直接返回一个对象时，需在对象外面加上括号
- 函数内部的 this 指向定义时所在的对象
- 没有自身的 this，不能使用 call/apply/bind 方法改变 this 指向

不适用场景：

- 定义对象的方法，且方法内部包括 this
- 需要动态 this 的时候

### 尾调用优化

函数的最后一步是调用另一个函数。

```js
let getStyle = function (color, opacity) {
  let color = transformColor(color);
  let rgba = color + opacity;
  return getColor(rgba);
};
getStyle("#ffa500", 1);
```

### 其他

函数参数的尾逗号：允许函数声明和调用时，最后可以加上一个逗号。

```js
let getColor = function (color, opacity) {};
getColor("#ffa500", 1);
```

catch 命令省略参数

```js
try {
  // ...
} catch {
  // ...
}
```

## Array 扩展

---

### 解构赋值

```js
let [a, ...extra] = [6, 7, 14, 16];
extra; // [7, 14, 16]
```

### 扩展运算符

扩展运算符...是 rest 参数的逆运算，将数组转为逗号分隔的参数序列。

### 扩展运算符应用

```js
// 复制数组，克隆
let a1 = [6, 7];
let a2 = [...a1]; // 写法一
let [...a3] = a1; // 写法二

// 合并数组，浅拷贝
let a1 = [6, 7];
let a2 = [14, 16];
let a3 = a1.concat(a2);
let a4 = [...a1, ...a2];
// a3和a4的成员都是对原数组成员的引用，都是浅拷贝，修改后原数组后，会同步到新数组

// 将字符串转为数组，正确识别Unicode字符
let s1 = "orange";
[...s1]; // ['o', 'r', 'a', 'n', 'g', 'e'];
let s2 = "6\uD83D\uDC3c";
[...s2].length; // 2
```

将空位转化为 undefined

### 方法

```js
// 从类数组对象或遍历器对象中创建一个新的数组实例
Array.from({ 0: 6, 1: 7, length: 2 }); // [6, 7]
Array.from([6, 7, 14, 16], (x) => x * x); // [36, 49, 196, 256]

// 用一组参数来创建新的数组实例
Array.of(6, 7, 14, 16); // [6, 7, 14, 16]
```

### 实例方法

```js
// 浅复制数组的一部分到同一数组的另一个位置，不改变原数组长度
Array.prototype.copyWithin(target, start?, end?)
[2, 4, 9, 16, 25].copyWithin(1);      // [2, 2, 4, 9, 16]
[1, 2, 3, 4, 5].copyWithin(1, 3);     // [1, 4, 5, 4, 5]
[1, 2, 3, 4, 5].copyWithin(1, 3, 4);  // [1, 4, 3, 4, 5]

// 用固定值填充数组中从起始索引到终止索引内的所有元素
Array.prototype.fill(value, start?, end?)
[1, 2, 3, 4, 5].fill(6);    // [6, 6, 6, 6, 6]
[1, 2, 3, 4, 5].fill(6, 3);    // [1, 2, 3, 6, 6]
[1, 2, 3, 4, 5].fill(6, 3);    // [1, 2, 3, 6, 5]

// 判断数组是否包含一个指定值，从指定位置开始查找
Array.prototype.includes(value, start?)
[1, 2, 3, 4, 5].includes(3);    // true
[1, 2, 3, 4, 5].includes(3, 4); // false

// 查找满足函数的第一个元素，否则返回undefined
Array.prototype.find(callback)
[2, 4, 9, 16, 25].find((element, index, array) => element > 14);   // 16

// 查找满足函数的第一个元素的索引，否则返回-1
Array.prototype.findIndex(callback)
[2, 4, 9, 16, 25].findIndex((element, index, array) => element > 14);   // 3

// 返回新的遍历器对象，包含每一个索引的值
Array.prototype.values()
let a1 = ['o', 'r', 'a', 'n', 'g', 'e'].values();
for (let v of a1) {console.log(v);}

// 返回新的遍历器对象，包含每一个索引键
Array.prototype.keys()
let a1 = ['o', 'r', 'a', 'n', 'g', 'e'].keys();
for (let k of a1) {console.log(k);}

// 返回新的遍历器对象，包含每个索引的键值对
Array.prototype.entries()
let a1 = ['o', 'r', 'a', 'n', 'g', 'e'].entries();
for (let [k, v] of a1) {console.log(k, v);}

// 根据指定深度递归遍历数组，返回新数组。可以移除空项
Array.prototype.flat(depth)
[1, 2, [3, [4, 5]]].flat(1);    // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(Infinity);    // [1, 2, 3, 4, 5]
[1, 2, , [3, [4, 5]]].flat();    // [1, 2, 3, [4, 5]]

// 用映射函数映射每个元素，压缩成一个新数组。与map()和flat(1)几乎相同
Array.prototype.flatMap(callback)
[1, 2, [3, [4, 5]]].flatMap((element, index, array) => element);     // [1, 2, 3, [4, 5]]
```

## Object 扩展

---

### 解构赋值

```js
let { background, ...style } = {
  color: "#ffa500",
  opacity: 1,
  background: "#fff",
}; // {color: "#ffa500", opacity: 1}
```

### 扩展运算符

```js
let Color = { color: "#ffa500", opacity: 1 };
let newColor = { ...Color, background: "#fff" }; // {color: "#ffa500", opacity: 1, background: "#fff"}
```

### 属性简洁表示法

允许在大括号里面直接写入变量和函数。

```js
let color = "#ffa500";
let style = { color }; // {color: '#ffa500'}

function getStyle(color, opacity) {
  return { color, opacity }; // {color: color, opacity: opacity}
}

let Color = {
  getStyle() {},
};
```

### 属性名表达式

- 标识符作为属性名
- 表达式作为属性名，表达式放在方括号内

```js
let getOpacity = "getOpacity";
let Color = {
  getStyle() {},
  ["getColor"]() {},
  [getOpacity]() {},
};
```

属性简洁表示法和属性名表达式不能同时使用；属性名表达式是一个对象，会被转化为字符串[object Object]。

### 方法的 name

```js
let getOpacity = "getOpacity";
let Color = {
  getStyle() {},
  ["getColor"]() {},
  [getOpacity]() {},
};
Color.getColor.name; // "getColor"

// 对象的取值函数getter和存值函数setter的name属性是在描述对象的get和set上
let Color = {
  get color() {},
  set color(x) {},
};
let des = Object.getOwnPropertyDescriptor(Color, "color");
des.get.color; // 'get color'
des.set.color; // 'set color'
```

### 可枚举

- for...in 遍历自身和继承可枚举的属性
- Object.keys() 返回自身可枚举的属性键名
- JSON.stringify() 串行化自身可枚举的属性
- Object.assign() 只拷贝自身可枚举属性

### 方法

```js
// 在===基础上，正确识别 0不等于-0 以及 NaN等于自身
Object.is(value1, value2)

// 浅拷贝，合并所有对象自身可枚举属性到目标对象上，后面属性覆盖前面同名属性
Object.assign(target, source1, source2...)

// 返回对象所有自身描述对象
Object.getOwnPropertyDescriptors(obj)

// 设置原型对象
Object.setPrototypeOf(obj, prototype)

// 获取原型对象
Object.getPrototypeOf(obj);

// 返回包含自身所有可遍历属性键名的数组
Object.keys(obj);

// 返回包含自身所有可遍历属性键值的数组
Object.values(obj);

// 返回包含自身所有可遍历属性键值对数组的数组
Object.entries(obj);
let Color = {color: '#ffa500', opacity: 1};
Object.entries(Color);  // [["color", "#ffa500"], ["opacity", 1]]

// entries逆操作，将键值对数组转化为对象
Object.fromEntries(arrayObj)
Object.fromEntries([["color", "#ffa500"], ["opacity", 1]]); // {color: "#ffa500", opacity: 1}
```

## Symbol

---

### Symbol(description)

返回的 symbol 值都是唯一的，作为对象属性的标识符，保证属性名的唯一，它是一种类似于字符串的类型。

```js
let color1 = Symbol("#ffa500");
let color2 = Symbol("#ffa500");
color1 === color2; // false

// 作为属性名，需要放在方括号内
let color = Symbol();
let style = {
  [color]: "#ffa500",
};

// 判断类型
let attr = Symbol();
attr.description;
typeof attr === "symbol"; // true
```

### Symbol.prototype.description

```js
// 没有描述
let att1 = Symbol();
att.description; // undefined
// 有描述
let att1 = Symbol("color");
att1.description; // 'color'
```

### 正则表达式

```js
symbol.match; // string.prototype.match 被调用
symbol.replace; // string.prototype.replace 被调用
symbol.search; // string.prototype.search 被调用
symbol.split; // string.prototype.split 被调用
```

可以用于消除强耦合的具体字符串或数字，替换对应值。

## Set 和 Map 结构

---

Set|WeakSet|Map|WeakSet 的属性 size 值为 0；  
遍历器对象的 next().value 来获取对应的值。

### Set

new Set(iterable) 类似于数组，但成员是唯一的，参数接收具有 iterable 接口的结构，可以用于去重，NaN 之间是相同值。

```js
new Set([1, 2, 3, 3, 3]); // Set(3) {1, 2, 3}
new Set("#ffa500"); // Set(5) {"#", "f", "a", "5", "0"}
```

实例属性

```js
// 返回值的个数
Set.prototype.size;
```

实例方法

```js
// 添加元素，返回该Set对象
Set.prototype.add(value);
// 删除元素，返回布尔值
Set.prototype.delete(value);
// 查找元素，返回布尔值
Set.prototype.has(value);
// 清除元素
Set.prototype.clear();

// 由于没有键，所以values()|keys()返回的是相同的值
// 返回包含所有值的遍历器对象
Set.prototype.values();
// 返回包含所有值的遍历器对象
Set.prototype.keys();
// 返回包含所有值的遍历器对象
Set.prototype.entries();
// 遍历
Set.prototype.forEach(callback);
```

扩展运算符

```js
let set = new Set([1, 2, 3, 3, 3]);
[...set]; // [1, 2, 3]
```

### WeakSet

只能存放对象引用，存储的的对象是被弱引用，一旦不引用会被回收

```js
// 添加元素，返回该WeakSet对象
WeakSet.prototype.add(value);
// 删除元素，返回布尔值
WeakSet.prototype.delete(value);
// 查找元素，返回布尔值
WeakSet.prototype.has(value);
// 清除元素
WeakSet.prototype.clear();
```

### Map

new Map(iterable)

- 类似于 Object，但键值可以是任意值
- 遍历时按照插入顺序返回键值
- 可直接遍历
- 在频繁增删键值有性能优势

实例属性

```js
// 键值对数量
Map.prototype.size;

// 设置键值对
Map.prototype.set(key, value);
// 获取值
Map.prototype.get(key);
// 删除key，返回布尔值
Map.prototype.delete(key);
// 查找key，返回布尔值
Map.prototype.has(key);
// 清除所有键值对
Map.prototype.clear();
// 遍历
Map.prototype.forEach();

// 返回包含所有值的遍历器对象
Map.prototype.values();
// 返回包含所有键的遍历器对象
Map.prototype.keys();
// 返回包含所有[key, value]的遍历器对象
Map.prototype.entries();
```

### WeakMap

只接受对象作为键名，键名所引用的对象是被弱引用，一旦不引用会被回收。

```js
// 添加元素，返回该WeakMap对象
WeakMap.prototype.add(value);
// 删除元素，返回布尔值
WeakMap.prototype.delete(value);
// 查找元素，返回布尔值
WeakMap.prototype.has(value);
// 清除元素
WeakMap.prototype.clear();
```

## Iterator 和 for...of 循环

---

作用：

- 为各种数据结构提供统一简便的访问接口
- 使数据结构的成员按照某种次序排列
- 接口供 for...of 循环消费

创建一个指针对象，指向当前数据结构的起始位置，调用其 next()来指向对应的成员直到结束位置。next()方法返回一个对象，具有 value 和 done 两个属性，value 为 undefined 和 done 为 true 是遍历到结束位置的标志。

原生具备 Iterator 接口的数据结构，部署了 Symbol.iterator 属性，for...of 和 while 均可用于遍历：  
Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象。

数组、Map、Set 通过 entries()、keys()、values()均返回一个遍历器对象。

使用场合：

- 解构赋值
- 扩展运算符
- yield\*
- 其他场合

## Generator

---

Generator 函数是状态机，调用后并不会立即执行，而返回一个遍历器对象，可依次遍历内部的每个状态，通过调用遍历器对象的 next 方法，使得指针移向下一个状态。  
特征：

- funciton 关键字与函数名间有一个星号
- 函数体内部使用 yield 表达式
- yield 暂停执行
- next 恢复执行

**yield**  
遇到 yield 表达式，暂停执行后面的操作，并将 yield 后面表达式的值作为返回对象的 value 属性值。

**next 方法**

- 调用 next 方法会返回一个包含 value 和 done 属性的对象；
- yield 表达式：在另一个表达式中使用需要放在圆括号中，作为函数参数或复制表达式右边，可以不加括号；
- yield 表达式本身返回 undefined，next 方法可以带一个参数，该参数会作为上一个 yield 表达式的返回值。

**Generator.prototype.throw()**

- 可以接受一个参数被 catch 语句接收，建议是 Error 对象实例；
- 在函数体外抛出错误，在 Generator 函数体内用 catch 语句捕获，前提是至少执行一次 next 方法；
- 多个 yield 表达式，可以用一个 try...catch 在函数内来捕获错误；
- 在 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了，之后调用 next 方法，会返回对象的 value 为 undefined、done 为 true，JS 引擎会认为 Generator 已经结束。

**Generator.prototype.return**

- 返回给定的值，终结遍历 Generator 函数，返回对象的 value 为 return 方法的参数，done 为 true。
- return 不提供参数时，返回对象的 value 为 undefined
- 如果函数内部有 try...finally 代码块，且执行到 try 代码块，return 会导致立刻进入 finally 代码块，执行完后整个函数才结束

next()将 yield 表达式替换成一个值  
throw()将 yield 表达式替换成一个 throw 语句  
return()将 yield 表达式替换成一个 return 语句

**yield\*表达式**  
Generator 函数内部调用另一个 Generator 函数需要在前者函数体内手动完成遍历，通过 yield\*可以解决嵌套问题，它返回的是一个遍历器对象。

作为对象属性的 Generator 函数

```js
let color = {
  getColor: function* () {},
};
let color = {
  *getColor() {},
};
```

## Async

---

Generator 语法糖，体现四点改进：

- 内置执行器
- 更好的语义
- 更广的适用性
- 返回值是 Promise

async 函数返回一个 Promise 对象，函数内部的 return 语句返回的值，作为 then 方法回调函数的参数，内部抛出的错误导致返回的 Promise 对象的状态为 reject 状态，抛出的错误对象作为 catch 方法回调函数的参数。

### await

正常情况下 await 返回一个 Promise 对象，否则直接返回该值；  
await 后面的异步操作出错，等同于 async 函数返回的 Promise 对象变为 reject 状态；  
任何一个 await 语句后面的 Promise 对象变为 reject 状态，整个 async 函数都会中断执行；  
将 await 代码放在 try...catch 代码块中，防止出现 reject 状态时，中断了执行。

## Class

---

类必须用的 new 来创建实例；  
类的方法声明时不需要加 function；  
类实例的 constructor 方法指向类原型的 constructor 方法；  
类不存在变量提升；  
类有 name 属性。

```js
// Color.prototype.getColor指向Color类的getColor方法
class Color {
  getColor() {}
}
let color = new Color();
(color.constructor === Color.prototype.constructor) === Color;
```

类的内部定义的方法是不可枚举的；  
constructor 方法没有显示定义，会默认添加一个空的 constructor 方法；  
constructor 方法默认返回实例对象，也可以指定返回一个对象。

### set/get 关键字

```js
class Color {
  constructor(o) {
    this.opacity = o;
  }
  getColor() {}
  get op() {
    return this.opacity;
  }
  set op(v) {
    this.opacity = v;
  }
}
let color = new Color(1);
color.op = 0;
console.log(color.op);
```

### 实例属性

除了 constructor 里面声明属性外，可以在类里面直接定义属性。

```js
class Color {
  opacity = 1;
  shadow;
  getColor() {}
  get op() {
    return this.opacity;
  }
  set op(v) {
    this.opacity = v;
  }
}
```

### static

类的方法名前加上 static 就变成静态方法，静态方法只能通过类来调用，静态方法可以被继承，静态方法内部的 this 指向该类，静态方法可以和非静态方法重名；  
类的属性同上。

```js
class Color {
  static opacity = 1;
  opacity;
  static getColor() {}
  getColor() {}

  get op() {
    return this.opacity;
  }
  set op(v) {
    this.opacity = v;
  }
}
Color.opacity;
Color.getColor();
```

### 私有属性/方法

在属性名或方法名前加上#，只能在类内部使用；  
私有属性/方法前面加上 static，变成静态私有属性和方法。

### new.target

返回该 Class，子类继承父类时，内部指向子类本身。

### 继承

子类 constructor 方法内部必须调用 super 来指向父类的 constructor 方法，之后 this 的指向才是子类的实例；  
子类继承父类的静态方法和属性。

### Object 新增静态方法

```js
class Base {}
class Color extends Base {}
Object.getPrototypeOf(Color) === Base;
```

### super

super 作为对象，在普通方法中，指向父类的原型对象；静态方法中，指向父类。

## 模块

---

模块顶层 this 的值为 undefined，可以作为判断是否在模块中的依据；  
import 是在编译时，进行静态分析；require 是在运行时加载模块，动态加载功能；  
export 和 import 需要在模块顶层（任何位置）使用。

### export

export 输出的接口，与其对应值是动态绑定关系，能够实时获取内部值；  
需要将导出的接口写在大括号内；

```js
// baseColor.js
let color = "#ffa500";
let opacity = 1;
function getColor() {}
export { color, getColor, opacity as op };

后面可以跟变量声明语句;
export let rgba = "#ffa50000";

let rd = 0;
function getRandom() {
  rd = Math.random();
  setTimeout(getRandom, 1000);
}
export { rd, getRandom };
```

### import

import 会提升到整个模块头部，首先执行；  
需要将导入的接口写在大括号内；  
多次重复执行同一 import 语句，只会执行一次（Singleton 模式）；
是静态执行，不能使用表达式和变量（运行时才能得到的结构）；
整体加载用\*代表一个对象，所有输出值都在这个对象上。

```js
import { color, getColor, op } from "./baseColor";
import * as Color from "./baseColor";
```

### export default

默认导出时不需要大括号，对应的导入时也不需要大括号；

```js
导出的匿名函数可以在导入时自定义名称
export default function () {return Math.random();}
import getRandom from 'random'

function getRgb () {}
export default getRgb
// 等同于
export default function getRgb () {}

后面不能跟变量声明语句
let color = '#ffa500';
export default color;
```

### export 和 import 复合使用

```js
第一种方式：内部不能使用color和getColor这两个接口，因为直接对外转发了
export {color, getColor} from './baseColor'
// 等同于
import {color, getColor} from './baseColor'
export {color, getColor}

别名
export {color as c} from './baseColor'

全部导出，不包含baseColor模块的default方法
export * from './baseColor'

默认接口
export {default} from './baseColor'

具名接口改为默认接口
export {color as default} from './baseColor'
// 等同于
import {color} from './baseColor'
export default color

默认接口改为具名接口
export {default as color} from './baseColor'
```

### CommonJS 和 ES6 模块

- CommonJS 模块输出是一个值的拷贝，ES6 模块时值的引用
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

### Nodejs 加载

在 Nodejs 中：

- ES6 模块采用.mjs 后缀文件名，或者在 package.json 文件中将 type 字段指定为 module；
- CommonJS 模块使用.cjs 后缀名文件，或者在 package.json 文件中将 type 字段指定为 commonjs；
- .js 文件加载取决于 package.json 中的 type 字段；

### package.json

```js
{
  "type": "module",     // commonjs
  "main": "./src/index.js",   // 入口文件
	// 文件或子目录别名
  "exports": {
    "./util": "./src/util.js",
    "./actions/": "./src/actions/",
  },


	// main的别名，字段名是.代码模块主入口，优先级高于main字段
  // "exports": {
  //   ".": "./main.js"
  // }
  // 等同于
  // "exports": "./main.js",


	// 条件加载，在NodeJS中运行，需打开--experimental-conditional-exports标志
	// "exports": {
	// 	".": {
	// 		"require": "./main.cjs",	// require条件指定require*()命令入口文件
	// 		"default": "./main.js"		// default条件指定其他情况入口
	// 	}
	// },
	// 等同于
	// "exports": {
	// 	"require": "./main.cjs",
	// 	"default": "./main.js"
	// }
}
```

import 命令加载 CommonJS 模块只能整体加载，不能加载单一的输出项；  
require 命令不能加载 ES6 模块，需要使用 import()加载；  
Nodejs 内置模块可以整体加载，也可以指定输出项。

### 内部变量

ES6 模块顶层 this 为 undefined，CommonJS 模块顶层 this 为当前模块。

- arguments
- require
- module
- exports
- \_\_filename
- \_\_dirname

### 加载机制

Commonjs 在第一次加载时运行一次，会缓存到内存中；循环加载时，只会输出已经执行的部分，未执行部分不会输出。
