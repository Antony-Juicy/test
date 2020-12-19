# ES5/string
本文将重点介绍 JavaScript语言中的字符串，操作字符串的常见的方法以及具体的代码实现等

## 一、严格模式（了解）

-   JavaScript 是一个相对不是很严格的语言
-   而且开发的时候，一些代码也不是很严格的要求
-   而严格模式就是对开发的时候写一些内容做了要求

### 1、开启严格模式
-   想开启严格模式，直接在代码最开始的位置写上字符串 `use strict`即可

    ```javascript
        <script>
            'use strict'
            
            //下面的代码就会按照严格模式来书写
        </script>

    ```
### 2、严格模式的规则
-   声明变量 必须有 `var` 关键字
    ```javascript
        'use strict'
        var num = 100;
        num1 = 20; // 这句代码会报错
    ```
    -   在声明变量的时候，如果没有var 关键字，那么按照作用于的规则自动定义成全局变量
    -   严格模式下不可以，会报错
-   函数的形参不可以重复
    ```javascript
        'use strict'

        function fn(p1,p1){

        } //直接就会报错

    ```
    -   在非常严格模式下，函数两个形参一样，是不会报错的，只不过就是相当于 在函数内部只有一个变量了
    -   但是在严格模式下会报错

-   声明式函数调用的时候函数内部没有this

    ```javascript
        'use strict';
        function fn(){
            cosnole.log(this) // undefined
        };
        fn();

    ```
    -   本身全局声明式行数在调用的时候，函数内部的this 是指向window的
    -   在严格模式下，是没有m `this` 的



## 二、创建字符串（了解）

-   我们创建字符串也分为两种方法 **字面量** 和 **构造函数**
-   字面量：
    ``` javascript 
        var str = 'hello'
    ```
-   构造函数创建
    ```javascript
        var str = new String('hello');
    ```

## 三、ASCLL 字符集（了解）

-   我们之前都讲过计算机只能存储`0101010`这样的的二进制数字
-   那么我们的 `a-z / A-Z / @ / $ / ....`这些内容也有由二进制数字来组成的，这些内容都有一个自己的编号，然后在计算机存储的时候，是存储的这些编号，我们看的时候，也是通过这些编号在解析成我们要看到的内容给我们看到

    ![](ASCII控制字符.png)
-   上面的就是ASCLL对照表，我们只需要知道它是这么存储就好

### 1、Unicode 编码
-   我们看到ASCLL码只有 128个字符的编码结构
-   但是因为ASCLL出现的比较早，而且是美国发明的，早些时候这些内容是够用的
-   因为存储一些英文的内容，传递一些英文的文章都够用
-   但是对于世界来说，肯定是不够用
-   因为我们的汉子没有办法存储了，包括一些其他的语言也没有办法存储
-   所有即出现了Unicode编码，也叫做（万国码，统一码）
-   Unicode对照表就是一个 和 ASCLL一样的对照表，只不过变的很大，因为存储的内容特别多
-   我们的UTF-8 就是一种 8位的Unicode 字符集

## 四、字符串常用的方法

-   我们操作字符串，也有一堆的方法来帮助我们操作
-   字符串 和数组有一个一样的地方就是按照索引来排列的

### 1、`charAt` 方法
-   `charAt(索引)` 是找到字符串中指定索引位置的内容返回
    ```javascript
        var str = 'Jack'

        // 使用 charAt 找到字符串中的某一个内容
        var index = str.charAt(2)

        console.log(index) // c

    ```
    -   因为字符串也是按照索引进行排列的，也是同样从 0 开始
    -   所以索引为 2 的位置就是 c
-   如果没有对应的索引，那么就会返回空字符串
    ```javascript
        var str = 'Jack'

        // 使用 charAt 找到字符串中的某一个内容
        var index = str.charAt(10)

        console.log(index) // ''

    ```
    -   这个字符串根本没有索引为10的位置
    -   所以就会返回一个空的 字符串 ''

### 2、`charCodeAt` 方法
-   `charCodeAt(索引)` 就是返回一个对应索引位置的`unicode` 编码
    ```javascript
        var str = 'Jack'

        // 使用 charAt 找到字符串中的某一个内容
        var index = str.charCodeAt(0)

        console.log(index) // 74

    ```
    -   因为 `J` 在`unicode` 对照表面存在的是 74，所以就返回 74

### 3、`indexOf` 方法
-   `indexOf`就是按照字符找到对应的索引
    ```javascript
        var str = 'Jack'

        // 使用 indexOf 找到对应的索引
        var index = str.indexOf('J')

        console.log(index) // 0

    ```
    - 因为字符 `J` 在字符串 `Jack` 中的索引位置是 0
    - 所以会返回 0

### 4、`substring` 方法
-   `substring` 是用来截取字符串使用的
-   语法：`substring(idx,value)` 包含开始做引，不包含结束索引
    >idx:从哪个索引开始   
    >value：到哪个索引结束
    ```javascript
        var str = 'hello'
        //         01234
        // 使用 substring 截取字符串
        var newStr = str.substring(1, 3)
        console.log(newStr) // el
    ```
    - 从索引 1 开始，到索引 3 截止，包含前面的索引不包含后面的索引
    - 所以返回的是 el

### 5、`substr` 方法
-   `substr` 也是用来截取字符串的
-   语法：`substr(idx,number)`
    >idx:从哪个索引开始   
    number：截取多少个

    ```javascript
        var str = 'hello'
        //         01234

        // 使用 substr 截取字符串
        var newStr = str.substr(1, 3)

        console.log(newStr) // ell
    ```
    - 这个方法和 `substring` 不一样的是，第二个参数是截取多少个
    - 从索引 1 开始，截取 3 个，所以得到的是 `ell`

### 6、`toLowerCase `和 `toUpperCase`
-   这两个方法分别是用来给字符串转换成小写字母 和大写字母的
    ```javascript
        var str = hello

        // 使用 toUpperCase 转换成大写
        var upper = str.toUpperCase()

        console.log(upper) // HELLO

        // 使用 toLowerCase 转换成小写
        var lower = upper.toLowerCase()

        console.log(lower) // hello
    ```

### 7、`split()` 方法

- `split()`方式是将一个发字符创切割为一个数组

  ```javascript
  var str1 = " 苹果, 香蕉, 榴莲, 水蜜桃, 橘子";
  /*01-以逗号（,）来切割字符串 */
  console.log(str1.split(",")); //["苹果", "香蕉", "榴莲", "水蜜桃", "橘子"]
  
  /*02-用 | 来切割字符串 */ 
  console.log("a|b|c|d".split("|")); //["a","b","c","d"] 
  /*03-用 点（.）来切割字符串*/
  console.log("1:2:3:4".split(":")); //["1","2","3","4"]
  
  ```

  - 在使用`split()`来切割字符串的时候，得到的数组中每个元素都是字符串类型(得到的一定是字符串数组)，且指定的分隔符不可能出现在数组元素中。