---
title: TS
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,ts
---

# TypeScript

## 变量

```js
// 布尔值
let colorBoolean: boolean = true;

// 数字：支持二、八、十、十六进制
let colorNumber: number = 26;

// 字符串
let colorString: string = "orange";

// 数组
let colors: string[] = ["orange", "red"];

// 数组泛型
let colorArr: Array<string> = ["orange", "red"];

// 元组：包含多个类型值的数组，按照顺序对应
let colorTuple: [string, number] = ["orange", 26];

// 枚举
enum ColorEnum {orange, red};
// 修改编号从6开始
enum ColorEnum1 {orange = 6, red};
```

### Any

任意类型

```js
let any: any = 26;
let anyArr: any[] = [26, "orange", "red"];
```

### Void

空类型

```js
function setColor(): void {
  console.log("test");
}
// 声明void类型变量，只能赋值undefined或null
let undefinedVoid: void = undefined;
let nullVoid: void = null;
```

### Null | Undefined

null 和 undefined 是所有类型的子类型  
--strictNullChecks 标记开启后，null 和 undefined 只能赋值给自身的类型

```js
let u: undefined = undefined;
let n: null = null;
```

### Never

是所有类型的子类型，永不存在的值的类型

```js
switch (value) {
  case 0:
    break;
  case 1:
    break;
  default:
    // 永远无法达到的位置
    let colorNever: never = val;
}
```

### Object

非原始类型（除 number，string，boolean，symbol，null 或 undefined 之外的类型），包括对象、函数、数组等

```js
let object: object = {};
let object: object = ["orange", 26];
let object: object = () => {};
```

### 类型断言

尖括号 或 as 语法，在使用 JSX 时，只有 as 语法断言是被允许的

```js
let strAssert: any = 'This is a paragraph';
let strLenAssert: number;
strLenAssert = (<string>strAssert).length;
strLenAssert = (strAssert as string).length;
```

非空断言，变量后加`!`

```js
let flag: null | undefined | string;
flag!.toString(); // ok
flag.toString(); // error
```

## 接口

非可选属性需要校验是否传递对应的属性，属性名后面加`?`

```js
interface ColorBase {
  value?: string;
  opacity?: number;
}
function getColor(color: ColorBase): { value: string, opacity: number } {
  let style = { value: "#ffa500", opacity: 1 };
  if (color.value) {
    style.value = color.value;
  }
  return style;
}
let color = getColor({ value: "#ffa500" });
```

定义任意属性`[propName:string]:any`，指代可选参数

```js
interface ColorBase {
  value?: string;
  opacity?: number;
  [propName: string]: any;
}
let color: ColorBase = {
  value: "#ffa500",
  opacity: 1,
  brightness: 50,
};
```

### 只读属性

创建后不能进行赋值等操作，在属性前加`readonly`

```js
interface Circle {
  readonly rx: number;
  readonly ry: number;
}
let circle: Circle = {rx: 1, ry: 1};
```

### 只读数组

`ReadonlyArray`创建后不能进行赋值等操作

```js
let readonlyArr: ReadonlyArray<string> = ["orange", "red"];
```

### readonly | const

声明时，const 用作变量，readonly 用作属性

### 函数类型

包含了参数列表（每个参数需要名字和类型）和返回类型的函数定义

```js
interface ColorBase {
  (value: string, opacity: number): boolean;
}
let filterColor: ColorBase;
filterColor = function (value: string, opacity: number): boolean {
  return opacity > 1;
};

// 对于函数类型的类型检查，参数名不需要匹配定义中的名字
filterColor = function (value1: string, opacity1: number): boolean {
  return opacity1 > 1;
};
```

### 可索引类型

具有一个索引签名，描述了对象索引的类型 和 相应的索引返回值类型  
索引签名支持字符串和数字，可同时使用两种类型的索引

```js
interface IndexArray {
  [index: number]: string;
}
let indexArr: IndexArray = ["orange", "red"];
console.log(indexArr[0]);


// dictionary模式
interface IndexDictionary {
  [index: string]: number;
  amount: number;
  totalAmount: number;
}
let indexDictionary: IndexDictionary = { amount: 26, totalAmount: 26 };
console.log(indexDictionary["amount"]);


// 可索引类型（只读）
interface ReadonlyIndexArray {
  readonly [index: number]: string;
}
let readonlyIndexArr: ReadonlyIndexArray = ['orange', 'red'];
console.log(indexArr[0]);
```

### 类类型

```js
interface ColorInterface {
  value: string;
  opacity: number;
  getColor(v: string, o: number): void;
}
class Color implements ColorInterface {
  value: string;
  opacity: number;
  getColor(v: string, o: number) {
    this.value = v;
    this.opacity = o;
  }
  constructor(v: string, n: number) {}
}
```

### 继承接口

一个接口可以继承多个接口

```js
interface ColorBase {
  color: string;
}
interface OpacityBase {
  opacity: number;
}
interface ColorList extends ColorBase, OpacityBase {
  value: string;
}
let colorList = <ColorList>{};
colorList.color = 'orange';
colorList.opacity = 1;
```

## 类

```js
class Color {
  color: string;
  opacity!: number;
}
```

### extends 继承

```js
class Color {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  setColor(color: string) {
    this.color = color;
  }
}

class Picker extends Color {
  constructor(color: string) {
    super(color);
  }
  getColor() {
    return this.color;
  }
}
```

### public | private | protected

- public：类的属性和方法默认是 public 的
- private：设置为 private 只能在声明它的类中访问
- protected：类似 private，设置为 protected 可以在派生类中访问

```js
class Color {
  private opacity: number;
  protected background: string;

  constructor(color: string) {
    this.opacity = 1;
    this.background = color;
  }
  public setBackground(background: string) {
    this.background = background;
  }
}

class Picker extends Color {
  color: string;
  constructor(color: string) {
    super(color);
    this.color = color;
  }
  getColor() {
    return this.color;
  }
  getBackground() {
    return this.background;
  }
}
let picker = new Picker('#ffa500');
console.log(picker.background);  // error
console.log(picker.getBackground());  // '#ffa500'
```

构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承

```js
class Color {
  private opacity: number;
  protected background: string;

  protected constructor(color: string) {
    this.opacity = 1;
    this.background = color;
  }
  public setBackground(background: string) {
    this.background = background;
  }
}
let color = new Color('#ffa500'); // error
```

### readonly 修饰符

将属性设置为只读，只读属性必须在声明时或构造函数里被初始化

```js
class Color {
  readonly opacity: number = 1;
  readonly background: string;

  constructor(color: string) {
    this.background = color;
  }
  public getBackground() {
    return this.background;
  }
}
let color = new Color('777');
console.log(color.getBackground());
```

参数属性：在构造函数参数前加一个访问限定符来声明，将声明和赋值放在一起处理

```js
class Color {
  readonly opacity: number = 1;

  constructor(readonly background: string) {
    this.background = background;
  }
  public getBackground() {
    return this.background;
  }
}
let color = new Color('777');
console.log(color.getBackground());
```

### get set 存储器

```js
class Color {
  _opacity: number;

  constructor(value: number) {
    this._opacity = value;
  }
  get opacity(): number {
    return this._opacity;
  }
  set opacity(value: number) {
    this._opacity = value;
  }
}
let color = new Color(1);
color.opacity = 0;
console.log(color.opacity);
```

### static 静态属性

```js
class Color {
  static color = "#ffa500";
  shadow = "0 0 0";

  constructor(value: string) {
    this.shadow = value;
  }

  setShadow(value: string) {
    this.shadow = value + " " + Color.color;
  }
}

let color = new Color("1px 1px 1px");
color.setShadow("0 0 0");
console.log(color.shadow);
```

### abstract 抽象类

需要在派生类中实现抽象类中的抽象方法，抽象类不能直接实例化

```js
abstract class Color {
  shadow = "0 0 0";

  constructor(value: string) {
    this.shadow = value;
  }

  getShadow(): string {
    return this.shadow;
  }

  abstract setShadow(value: string): void;
}
class Picker extends Color {
  static color = "#ffa500";

  constructor(value: string) {
    super(value);
  }

  setShadow(value: string): void {
    this.shadow = value + " " + Picker.color;
  }
}

let color = new Picker("1px 1px 1px");
color.setShadow("0 0 0");
console.log(color.getShadow());
```

## 函数

### 函数类型

完整函数类型写法

```js
let getColor: (value: string, opacity: number) => string = function (v: string, o: number): string {
  return v + o;
};
```

推断类型写法

```js
let getColor: (value: string, opacity: number) => string = function (v, o): string {
  return v + o;
};
```

### 可选参数和默认参数

针对可选参数，没传递该参数时，值默认是 undefined 的

```js
function getColor(value: string, opacity?: number): string {
  return value + opacity;
}
function getColorDefault(value: string, opacity = 1): string {
  return value + opacity;
}

// 带默认值的参数出现在前面，需要传入undefined来获取默认值
function getColorDefault(value = "#ffa500", opacity: number): string {
  return value + opacity;
}
getColorDefault(undefined, 1);
```

### 剩余参数

```js
function getShadow(value: string, ...resetParams: string[]): string {
  return resetParams.join(" ") + " " + value;
}
console.log(getShadow("#ffa500", "0", "0", "0"));
```

### 重载

## 泛型

类型变量(例如`<T>`)：是一个特殊变量，只表示类型不表示值。

保证传入参数和返回值类型相同

```js
function getColor<T>(value: T): T {
  return value;
}
// 方式一：传入类型参数
// getColor<string>("#ffa500");
// 方式二：类型推论
getColor("#ffa500");
```

### 泛型变量

```js
function getOpacity<T>(opacity: T[]): T[] {
  return opacity;
}
function getOpacity<T>(opacity: Array<T>): Array<T> {
  return opacity;
}
```

### 泛型类型

泛型函数类型和非泛型函数类型写法，只是差异在前面加了一个类型参数

```js
let getColor: <T>(arg: T) => T = function <T>(arg: T): T {
  return arg;
};

let getColor: <U>(arg: U) => U = function <T>(arg: T): T {
  return arg;
};

// 带有调用签名的对象字面量
let getColor: { <T>(arg: T): T } = function <T>(arg: T): T {
  return arg;
};

// 泛型接口
interface ColorConfig {
  <T>(arg: T): T;
}
let getColor: ColorConfig = function <T>(arg: T): T {
  return arg;
};

// 泛型参数作为接口的参数
interface ColorConfig<T> {
  (arg: T): T;
}
let getColor: ColorConfig<string> = function <T>(arg: T): T {
  return arg;
};
```

### 泛型类

类名后面加`<>`泛型类型

```js
class Color<T> {
  value: T;
  getColor: (x: T, y: T) => T;
}
let color = new Color<number>();
```

### 泛型约束

定义一个接口来描述约束条件

```js
interface Len {
    length:number;
}
function getLen<T extends Len>(arg: T): T {
    console.log(arg.length);
    return arg;
}

getLen([3]);
getLen({length: 3, value: 1});
getLen(3); // error
```

在泛型约束中使用类型参数  
在泛型里使用类类型

## 枚举

### 数字枚举

默认第一个是从 0 开始编号

```js
enum ColorEnum {orange, red};
// 通过枚举值名字
let colorEnumByName: ColorEnum = ColorEnum.orange; // 0
// 通过编号
let colorEnumByIndex: string = ColorEnum[0]; // orange
console.log(colorEnumByIndex)

// 修改编号从6开始
enum ColorEnum1 {orange = 6, red};
let colorEnum1: string = ColorEnum1[6]; // orange
```

### 字符串枚举

```js
    Orange = 'orange',
    Red = 'red'
};
console.log(ColorEnum.Orange);  // orange
```

### 反向映射

只有数字枚举具有反向映射

```js
enum ColorEnum {orange, red};
// 通过枚举值名字
let colorEnumByName: ColorEnum = ColorEnum.orange; // 0
// 通过编号
let colorEnumByIndex: string = ColorEnum[colorEnumByName]; // orange
console.log(colorEnumByIndex);
```

### const 枚举

通过 const 修饰符声明的枚举，不会在编译后，产生额外的开销和代码，常量枚举通过 const 修饰符来定义。

```js
const enum ColorEnum {orange, red};
let color = [ColorEnum.orange, ColorEnum.red];

// output
let color = [0, 1];
```

## 类型推论

## 类型兼容性

## 高级类型

### 交叉类型

用`&`连接，表示同时满足几种类型的成员

```js
function getColor<T, U>(value: T, opacity: U): T & U {
    let color = <T & U>{};
    return color;
}
getColor('#ffa500', 1);
```

### 联合类型

用`|`分割类型，表示一个值可以是几种类型之一

```js
function getColor(value: string | number) {
  if (typeof value === "string") {
  } else if (typeof value === "number") {
  }
}
```

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员

```js
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```

### 类型保护与区分类型

通过断言可以检查属性是否存在

```js
interface Bird {
  fly(): any;
  layEggs(): any;
}

interface Fish {
  swim(): any;
  layEggs(): any;
}

function getSmallPet(): Fish | Bird {}


let pet = getSmallPet();

if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}
```

#### 用户自定义类型保护

上一个例子不得不多次使用类型断言，如果在检查过类型后，能在每个分支知道类型就更好了。  
类型保护：定义一个返回值是类型谓词的函数，通过类型谓词`parameterName is Type`的形式，`parameterName` 必须是当前函数的参数

```js
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

#### typeof 类型保护

只有两种形式能被识别，typeof v === 'typename' && typeof v !== 'typename'  
typename 必须是 number、string、boolean、symbol

```js
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

#### instanceof 类型保护

```js
interface Pad {
    getPaddingString(): string
}

class SpaceRepeatingPad implements Pad {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPad implements Pad {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPad() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPad(4) :
        new StringPad("  ");
}

// 类型为SpaceRepeatingPad | StringPad
let pad: Pad = getRandomPad();

if (pad instanceof SpaceRepeatingPad) {
    console.log(pad); // 类型细化为'SpaceRepeatingPad'
}
if (pad instanceof StringPad) {
    console.log(pad); // 类型细化为'StringPad'
}
```

### 可以为 null 的类型

使用`--strictNullChecks`标记

```js
let s = "text";
s = null; // error，null不能赋值给string
```

#### 可选参数和可选属性

可选参数或可选属性，自动加上`| undefined`

```js
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'


class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
```

#### 类型保护和类型断言

### 类型别名

#### 接口 vs 类型别名

1.基础数据类型：与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组  
2.重复定义：接口可以定义多次，会被自动合并为单个接口；类型别名不可以重复定义  
3.扩展：接口可以扩展类型别名，类型别名也可以扩展接口。但是两者实现扩展的方式不同

- 接口的扩展就是继承，通过 extends 来实现。
- 类型别名的扩展就是交叉类型，通过 & 来实现。

### 字符串字面量类型

```js
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // error! should not pass null or undefined.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

### 数字字面量类型

```js
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  // ...
}
```

### 可辨识联合

```js
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;
```

### 索引类型

#### 索引类型和字符串索引签名

### 映射类型

## Symbol

## 模块

### export = 和 import = require()

为了支持 CommonJS 和 AMD 的 exports

```js
// color.js
let getColor = function () {}
export = getColor;

// test.js
import getCurrentColor =  require('./color');
```

## 命名空间

```js
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```

## 模块解析

### 非法合并

类不能与其它类或变量合并

## JSX

### 类型检查

固有元素总是以一个小写字母开头，基于值的元素总是以一个大写字母开头

#### 固有元素

```js
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

<foo />; // 正确
<bar />; // 错误
```

#### 基于值的元素

```js
import MyComponent from "./myComponent";

<MyComponent />; // 正确
<SomeOtherComponent />; // 错误
```
