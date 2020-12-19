# JavaScript基础语法
## 1.JavaScript的简介

![JavaScript介绍](D:\GZ2005\课件和资料\第一周\day01-JavaScript基础\资料\JavaScript介绍.PNG)




### （1）概述

JavaScript是一门动态的、弱类型的解释型高级编程语言。它基于原型，支持面向对象 和函数式编程等多种编程范式。通常称为js

### （2）作者
Brendan Eich（布兰登·艾奇）

### （3）背景： 
JavaScript诞生于 1995年，其诞生的初衷是为了减轻服务器的压力，而在客户端提供一种表单验证的功能。最初的名字为：Mocha（摩擦），1995年9月在Netscape navigator 2.0的beta版本中改名为 livescript，同年12月份，Netscape navigator 2.0 beta3中部署时被命名为 JavaScript

### （4）标准：
1996年11月，网景正式向 ECMA（欧洲计算机制造商协会）提交语言标准。1997年6月，ECMA 以JavaScript语言为基础制定了ECMAscript标准规范 ECMA_262。JavaScript成为ECMAscript最著名的实现之一。

### （5）组成：
JavaScript 由 ECMAscript + DOM + BOM 组成的
>(1)ECMAscript:由ECMA-262定义，提供核心的语法功能
(2)DOM:全称为Document Bbject Model 文档对象模型，提供方为和操作网页的IPA
(3)BOM:全称为 Browser Object Model 浏览器对象模型，提供与浏览器交互的方法和接口

### （6）版本：
ECMAscript 迄今为止已经历多个版本的迭代了，下面给出主要的版本历史
![此处输入图片的描述][1]

[1]:01.png
### （7）JavaScript的应用
JavaScript 主要应用于浏览器web、物联网、游戏、桌面应用 和移动端应用开发以及 服务端开发（能用JavaScript开发的就移动会用JavaScript开发）

```javaScript
1. 常见的网页效果【表单验证，轮播图。。。】
2. 与H5配合实现游戏【水果忍者： http://www.jq22.com/demo/html5-fruit-ninja/】
3. 实现应用级别的程序【http://naotu.baidu.com】
4. 实现统计效果【http://echarts.baidu.com/examples/】
5. 地理定位等功能【http://lbsyun.baidu.com/jsdemo.htm#i4_5】
6. 在线学编程【https://codecombat.163.com/play/】
7. js可以实现人工智能【面部识别】
8. 。。。
```

## 2.JavaScript 的书写位置

### （1）行内式 js代码（不推荐）
直接在标签上写js代码，需要依靠事件（行为）来触发

```JavaScript
<!-- 写在 a 标签的 href 属性上 -->
<a href="javascript:alert('我是一个弹出层');">点击一下试试</a>

<!-- 写在其他元素上 -->
<div onclick="alert('我是一个弹出层')">点一下试试看</div>

<!-- 
	注：onclick 是一个事件（点击事件），当点击元素的时候执行后面的 js 代码
-->

```
### （2）内嵌式js代码
在HTML页面中创建script标签，并且在script标签中直接编写JavaScript代码即可（js代码会在页面打开的时候直接触发执行）

```javaScript
<!-- 在 html 页面书写一个 script 标签，标签内部书写 js 代码 -->
<script type="text/javascript">
	alert('我是一个弹出层')
</script>

<!-- 
	注：script 标签可以放在 head 里面也可以放在 body 里面
-->

```

### （3）外链式js代码（推荐）
在HTML页面中创建一个script标签，把JavaScript代码单独保存在 .js后缀的文件中，然后通过设置script标签的src属性来引入外部的js文件

```
// 我是 index.js 文件
alert('我是一个弹出层')

```

```javascript
<!-- 我是一个 html 文件 -->

<!-- 通过 script 标签的 src 属性，把写好的 js 文件引入页面 -->
<script src="index.js"></script>

<!-- 一个页面可以引入多个 js 文件 -->
<script src="index1.js"></script>
<script src="index2.js"></script>
<script src="index3.js"></script>

```
## 3.注释

### （1）单行注释
一般就是用来描述下面一行代码的作用
可以直接写两个 /（快捷键L:ctrl + /）

```javascript
// 我是一个单行注释

// 下面代码表示在浏览器里面出现一个弹出层
alert('我是一个弹出层')

```

### （2）多行注释
一般用来注释一大段的文字或者代码
可以直接写/* */,然后在两个*号之间写注释的内容（快捷键：shift + alt + a）

```javascript
/*
	我是一个多行注释
	我是一个多行注释我
	是一个多行注释
*/

/*
	注释的代码不会执行
	alert('我是一个弹出层')
	alert('我是一个弹出层')
*/
alert('我是一个弹出层')

```

## 4.变量（重点）

### （1）变量的定义

**定义：**  变量是编程语言中能够存储计算结果 或 表示值得抽象概念（在程序中保存数据的一个容器）

 **使用：**  在JavaScript语言中变量需要先声明在使用

 **声明：**  使用var 关键字来声明变量，如果省略 var关键字，那么该变量默认成为全局变量

 **作用：**  记录特定的内容，并通过变量名来访问它们

 **原理：**  当使用var关键字声明变量时，计算机会从内存中分配储存空间来存放不同类型的内容

```javascript
// 定义一个变量
var num;

// 给一个变量赋值
num = 100;

// 定义一个变量的同时给其赋值
var num2 = 200;

```
>注意：
1.一个变量名只能存储一个值
2.当再次给一个变量赋值的时候，前一次的值就被覆盖掉了
3.变量名称区分大小写（js区分大小写）

### （2）命名的规范
**标识符：** 指的是JavaScript中变量，函数，属性的名字，在JavaScript中标识符命名的时候并不能随心所，也有对应的规则和 要求。下面就是变量命名的规范：

>（1）标识符可以 使用 字母、下划线、数字 和 $符号组成
（2）标识符不能以数字开头
（3）标识符区分到小写
（4）标识符不能使用JavaScript 的关键字 和保留字

### （3）命名的风格
（1）变量名尽量有意义（语义化）
（2）遵循驼峰命名规则，由多个单词组成的时候，从第二个单词开始首字母大写
```javascript
var wenJing  = "     ";
```
![此处输入图片的描述][2]

[2]:02.png

![此处输入图片的描述][3]

[3]:03.png

## 5.控制输出

### （1） 输出到页面：document.write()
### （2）弹窗框显示：alert()
### （3） 控制台输出：console.log()



## 6.数据类型（重点）

在编程语言中，能够表示并操作的值得类型被称之为 数据类型（type），能够支持多种数据类型是每一门编程语言的基本特征。
JavaScript 语言中的数据类型可以简单的分成：基本数据类型 和 复杂的数据类型。

![](E:\笔记 08班\img\04.png)

[4]:04.png

### （1）基本数据类型

#### 【1】数值类型（number）
* 一切数字都是数值类型（包括二进制，十进制，十六进制等）
* **当数字是0开头的时候，默认为八进制数，转化为十进制输出**
* 12e11 表示12*十的11次方
* NAN（not number）,一个非数字

#### 【2】字符串类型（string）
* 被一对引用包裹的所有内容（单引号或者双引号）

#### 【3】布尔类型（boolean）
* 只有两个值（true 或者 false）

#### 【4】null类型（null）
* 只有一个取值，就是null，表示空的意思

#### 【5】undefined类型（undefined）
* 只有一个取值，就是undefined，表示没有值的意思

### （2）复杂数据类型
复杂数据类型：对象（object）、函数（function）、数组（array）、正则（regexp）、RegExp等，暂时不讲







## 7.判断数据类型的关键字
### （1）isNaN 关键字
isNAN可以判断一个变量是不是数(数字为false，其他为true)

```javascript
// 如果变量是一个数字
var n1 = 100;
console.log(isNaN(n1)); //=> false

// 如果变量不是一个数字
var s1 = 'Jack'
console.log(isNaN(s1)); //=> true

```
### （2）typeof 关键字
JavaScript有分数据类型，那么我们有时候需要知道我们存储的数据是什么类型的数据，
使用 typeof 关键字来进行判断
**语法：**  typeof 变量

```javascript
/* 多种类型的变量 */
var age = 18; 
var name=" "; 
var isFun = true; 
var a;

console.log(typeof age);    //number
console.log(typeof name);   //string
console.log(typeof a);      //undefined
console.log(typeof isFun);  //boolean

```

## 8.数据类型的转换
在JavaScript的基本数据类型中，字符串、数值以及其他类型之间是可以相互转换的，而这种转换又可以分为两种。一种是在进行算数是默认会执行的 **自动转换**，其二就是 **强制转换**

### （1）数据类型之间的强制转换：
1.Number（变量）
>将其他的数据类型转化为数值类型

 - 可以把一个变量强制转化为数值类型
 - 可以转换成小数，胡保留小数
 - 可以转换布尔值
 - 遇到不可转换的都会返回NAN

2.parseInt（变量）
>将其他的数据类型转化为数值类型

-   从第一位开始检查，是数字就转换，直到一个不是数字内容
-   开头不是数值，那么久直接转换为NAN
-   不认识小数点，只能保留小数点

3.parseFloat（变量）
>将其他的数据类型转化为数值类型

-   从第一个开始检查，是数字就转换，直到一个不是数字的内容
-   开头就不是数字，那么直接返回NAN
-   认识一次小数点

4.变量.toString()          （用法num.toString()）
>将其他的数据类型转化为字符串类型（可以转换进制，在括号中添加转的进制）

-   有一些数据类型不能使用toString()方法，比如undefined 和null

5.String（变量）
>将其他的数据类型转化为字符串类型

-   所有数据类型都可以     用法：String(num);

6.Boolean(变量)
>将其他数据类型转换为布尔类型

-   在js中，只有'',0,null,undefined,NaN，这些为false

### （2）自动转换
1.除了加法以外的数学运算符

-   运算符两边都是可运算数字才行
-   如果运算符任何一边不是个可运算的数字，那么会返回NaN
-   加法不可以用

2.使用加法运算

-   在js里面，`+` 有；两个含义
-   字符串拼接：只要 `+` 的两边有任意一边是字符串，那么就会进行字符串拼接
-   加法运算：只有 `+` 两边都是数字的时候，才会进行数学运算


## 9.JavaScript运算符
>就是在代码里面进行运算的时候使用的符号，不光只是数学运算，我们在 js 里面还有很多的运算方式

![此处输入图片的描述][5]

[5]:05.png

### （1）算术运算符
1. `+`加法运算

-   只有符号两边都是数字的时候，才会进行加法运算
-   只要符号任意一边是字符串，就会进行字符串的拼接

2. `-` 减法

-   会执行减法运算
-   会自动把两边都转换成数字进行运算

3. `*` 乘法

-   会执行乘法运算
-   会自动把两边都转换成数字进行运算

4. `/` 除法

-   会执行除法运算
-   会自动的两边都转换成数字进行运算

5. `%` 求余

-   会执行取余运算
-   会自动把两边都转换成数字进行运算

### （2）赋值运算
1. `=` 

-   就是把 `=` 右边的值 赋值给 `=` 左边的变量名
-   `var num = 100；`

2.`+=`

```javascript
    var age = 18;
    a += 10;
    console.log(a) // 28
```
-   `a += 10` 等价于  `a = a + 10`

3.`-=`
```javascript
    var a = 10;
    a -= 10;
    console.log(a); //=> 0
```
-   `a -= 10` 等价于  `a = a - 10`

4.`*=`
```javascript
    var a = 10;
    a *= 10;
    console.log(a); //=> 100

```
-   `a *= 10` 等价于 `a = a * 10`

5.`/=`
```javascript
    var a = 10;
    a /= 10;
    console.log(a); //=> 1

```
-   `a /= 10` 等价于 `a = a / 10`

6.`%=`
```javascript
    var a = 10;
    a %= 10;
    console.log(a); //=> 0
```
-   `a %= 10` 等价于 `a = a % 10`

### （3）关系运算符

1. `==`
    -   比较符号两边的值是否相等，不管数据类型
    -   `1 == '1' ==》true`
    -   两个值是一样的，所以得到true
2. `===` 全等
    -   比较符号两边的值 和数据类型是否相等
    -   `1 === '1'==>false`
    -   两个值虽然一样，但是因为因为值得数据类型不一样，所以为false

3. `!=`
    -   比较符号 两边的值是否 不等
    -   `1 != '1'==>false`
    -   因为两边的值是相等的，所以在比较的他们不等的时候得到false

4. `!==`  不全等
    -   比较符号两边的**值**和**类型**是否不等
    -   `1 != '1'` true
    -   因为量的数据类型不一样，所以得到true

5. `>=`
    - 比较左边的值是否 大于或等于 右边的值
    - `1 >= 1`  true
    - `1 >= 0`  true
    - `1 >= 2`  false
6. `<=`
    - 比较左边的值是否 小于或等于 右边的值
    - `1 <= 2`  true
    - `1 <= 1`  true
    - `1 <= 0`  false 
7. `>`
    - 比较左边的值是否 大于 右边的值
    - `1 > 0 `   true
    - `1 > 1`   false
    - `1 > 2`   false
8. `<`
    - 比较左边的值是否 小于 右边的值
    - `1 < 2`   true
    - `1 < 1`   false
    - `1 < 0`   false

### （4）逻辑运算符
1. `&&`
    - 进行 且 的运算
    - 符号左边必须为 `true` 并且右边也是 `true`，才会返回 `true`
    - 只要有一边不是 `true`，那么就会返回 `false`
    - `true && true`  true
    - `true && false`  false
    - `false && true`  false
    - `false && false`  false
2. `||`
    - 进行 或 的运算
    - 符号的左边为 true 或者右边为 true，都会返回 true
    - 只有两边都是 false 的时候才会返回 false
    - `true || true`    true
    - `true || false`   true
    - `false || true`   true
    - `false || false`  false
3. `!`
    - 进行 取反 运算
    - 本身是 true 的，会变成 false
    - 本身是 false 的，会变成 true
    - `!true`  false
    - `!false`  true


### （5）自增自减运算（一元运算符）
1. `++`
- 进行自增运算
- 分成两种，**前置`++`** 和 **后置`++`**
- 前置++，会先把值自动 +1，在返回
```javascript
var a = 10;
console.log(++a);
// 会返回 11，并且把 a 的值变成 11
```
- 后置`++`，会先把值返回，在自动`+1`
```javascript
var a = 10;
console.log(a++);
// 会返回 10，然后把 a 的值变成 11
```
2. `—`
    - 进行自减运算
    - 分成两种，**前置--** 和 **后置--**
    - 和 `++` 运算符道理一样

