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

//// 布尔值
/////start
let colorBoolean: boolean = true;
/////end

//// 数字
/////start
let colorNumber: number = 26;
/////end

//// 字符串
/////start
let colorString: string = 'orange';
/////end

//// 数组
/////start
let colors: string[] = ['orange', 'red'];
/////end

//// 数组泛型
/////start
let colorArr: Array<string> = ['orange', 'red'];
/////end

//// 元组
/////start
let colorTuple: [string, number] = ['orange', 26];
/////end

//// 枚举
///// 数字枚举，默认是第一个是0
/////start
enum ColorEnum {orange, red};
let colorEnumByName: ColorEnum = ColorEnum.orange;  // 0
let colorEnumByIndex: string = ColorEnum[0];  // orange
console.log(colorEnumByIndex)

enum ColorEnum1 {orange = 6, red};
let colorEnum1: string = ColorEnum1[6];   // orange
/////end

//// Any
/////start
let any: any = 26;
let anyArr: any[] = [26, 'orange', 'red'];
/////end

//// Void
/////start
let undefinedVoid: void = undefined;
let nullVoid: void = null;
/////end

//// Null Undefined
//// null 和 undefined是所有类型的子类型
//// --strictNullChecks标记，null 和 undefined只能赋值给自身的类型
/////start
let u: undefined = undefined;
let n: null = null;
/////end

//// 类型断言
/////start
let strAssert: any = 'This is a paragraph';
let strLenAssert: number = (<string>strAssert).length;
let strLenAssert1: number = (strAssert as string).length;
/////end




//// 接口
/////start
interface ColorConfig {
  value?: string;
  opacity?: number;
}
function getColor (color: ColorConfig): {value: string; opacity: number} {
  let style = {value: '#ffa500', opacity: 1};
  if (color.value) {
    style.value = color.value;
  }
  return style;
}
let a = getColor({value: '#ffa500'});
/////end

//// 只读属性，创建后不能进行赋值等操作
/////start
interface Circle {
  readonly rx: number;
  readonly ry: number;
}
let circle: Circle = {rx: 1, ry: 1};
/////end

//// 只读数组
/////start
let readonlyArr: ReadonlyArray<string> = ['orange', 'red'];
/////end

//// 函数类型
/////start
interface FilterColorFunc {
  (value: string, opacity: number): boolean;
}
let filterColorFunc: FilterColorFunc = function (value: string, opacity: number): boolean {
  return opacity > 1;
}
/////end

//// 可索引类型
/////start
interface IndexArray {
  [index: number]: string;
}
let indexArr: IndexArray = ['orange', 'red'];
console.log(indexArr[0]);

interface IndexDictionary {
  [index: string]: number;
  amount: number,
  totalAmount: number;
}
let indexDictionary: IndexDictionary = {amount: 26, totalAmount: 26};
console.log(indexDictionary['amount']);
/////end

//// 可索引类型（只读）
/////start
interface ReadonlyIndexArray {
  readonly [index: number]: string;
}
let readonlyIndexArr: ReadonlyIndexArray = ['orange', 'red'];
console.log(indexArr[0]);
/////end


interface ColorInterface {
  value: string;
  opacity: number;
  getColor(v: string, o: number): void;
}
class Color implements ColorInterface {
  value: string;
  opacity: number;
  getColor (v: string, o: number) {
    this.value = v;
    this.opacity = o;
  }
  constructor(v: string, n: number) {}
}


//// 继承类型
interface ColorBase {
  color: string;
}
interface OpacityBase {
  opacity:  number;
}
interface ColorList extends ColorBase, OpacityBase {
  value: string;
}
let colorlist = <ColorList>{};
colorlist.color = 'orange';
colorlist.opacity = 1;





//// 函数声明
/////start
function getColorFunc (value: string, opacity: number) {
  return value + opacity;
}
function getColorDefaultFunc (value: string, opacity = 1) {
  return value + opacity;
}
/////end

//// 重载



//// 泛型
//// 传入参数和返回值类型相同
function getColorValue<type> (value: type): type {
  return  value;
}
getColorValue('#ffa500');

function getColorOpacity1<type> (opacity: type[]): type[] {
  return opacity;
}
function getColorOpacity2<type> (opacity: Array<type>): Array<type> {
  return opacity;
}

//// 泛型类型
//// 泛型类
//// 泛型约束
