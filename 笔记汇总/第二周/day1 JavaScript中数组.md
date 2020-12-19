#  javascript中数组（array）

本文将介绍JavaScript语言中的数组，全文内容包括但不限于 数组的简单介绍、数组的创建、数组中的元素访问、数组的类型以及数组相关的核心方法等内容。

## 一、数组的核心概念

-   数组的概念：称之为 **数据的集合**，数组中的每一个-值成为元素

-   数组的格式：[1,2,3,4,5]

-   数组的索引：每一个元素在数组中都是有一个位置，用数字表示称为索引，索引值默认从 0 开始依次递增

-   数组的长度：JavaScript中每个数组都拥有`length `属性，通常该属性的值为数组的长度

**思考：数组时什么类型的数据呢？**

数据类型的分类：

-   基本数据类型：
    -   number 数字
    -   string 字符串
    -   boolean 布尔
    -   null 空
    -   undefined 为定义

-   复杂数据类型：
    -   object 对象
    -   function 函数
    -   array 数组

## 二、数组的创建

通常数组的创建方式有两种，一种时直接通过**字面量**方式创建，一种是通过 **Array 构造函数** 方式创建

### 1、字面量创建数组方式
字面量（直接量）创建数组方式是最简单的方式，只需要直接使用 `[]` 并在括号中设置数组元素即可

```javascript
    var empty = [];   //没有元素的空数组
    var ages = [12,13,14,15] //有4个元素的数字数组
    var books = ["婧婧","老谢","顶顶","田田"]; //有4个元素的字符串数组
    
```

### 2、使用构造函数创建
使用构造函数Array 是创建数组的第二种方式，在调用构造函数的时候可以有多种方式

**语法：** `new Array()`、`new Array(lenght)`、`new Array(ele1,ele2,.....)`
```JavaScript
    // 创建一个空数组
    var arr1 = new Array()

    // 创建一个长度为 10 的数组
    var arr2 = new Array(10)

    // 创建一个有内容的数组
    var arr3 = new Array(1, 2, 3)
```

## 三、数组的length属性

-   length：长度的意思（当数组使用该属性的时候，表示获取数组的长度）

```JavaScript
    // 创建一个数组
    var arr = [1, 2, 3]

    console.log(arr.length) // 3

```

## 四、数组的索引

-   索引（下标），是指一个数据在数组里面排行在第几的位置
-   注意：在所有的语言里面，索引都是从0开始的
-   在js里面也是一样的，数组的索引从0 开始
```javascript
    //创建一个数组
    var arr = ['hello','world'];

```
-   上面这个数组中，**第 0 个** 数据就是字符串 `hello`，**第 1 个** 数据就是字符串 `world`
-   想获取数组中的第几个就使用 `数组[索引]` 来获取

```javascript
    var arr = ['hello', 'world']

    console.log(arr[0]) // hello
    console.log(arr[1]) // world
```

## 五、数据类型之间存储的区别（重点）

- 既然我们区分了基本数据类型 和复杂的数据类型

- 那么他们之间就一定会存在一些区别

- 他们最大的区别就是储存上的区别

- 我们的储存空间分成两种 **栈** 和 **堆**

- 栈：主要储存基本数据类型的内容 、变量、复杂数据类型的地址（指针）

- 堆：主要储存复杂数据类型的内容

- **当地址中的数据被更改之后，不管通过哪个变量去访问，都是得到被更改过后的数据**

![](G:\笔记 二阶段\笔记汇总\images\堆、栈.jpg)

### 1、基本数据类型在内存中的存储情况

-   var num = 100,在内存中的存储情况

![blockchain](01.png)

-   直接在 **栈空间** 内有存储一个数据

### 2、复杂数据类型在内存中的存储情况

-   下面这个 对象 的存储
```javascript
    var obj = {
        name: 'Jack',
        age: 18,
        gender: '男'
    }
```
![blockchain](02.png)

- 复杂数据类型的存储
  -   在对立面开辟一个存储空间
  -   把数据存储道存储空间内
  -   把存储空间的地址复制给栈里面的变量

- 这就是数据类型之间的存储的区别

### 3、不同数据类型作为函数参数的区别

  - 当使用基本数据类型当作函数的实参的时候，外部变量的值不会被改变
  - 当使用**复杂数据类型当作函数的实参**的时候，内容通过变量改变这个复杂数据的值，会影响外部变量的访问结果。

### 3、数据类型之间的比较

-   基本数据类型是 **值** 之间的比较

```javascript
    var num = 1;
    var str = '1';

    console.log(num == str)  // true
```

-   复杂数据类型是 **地址** 之间的比较
```javascript
    var obj = {name:'jingjing'};
    var obj2 = {name:'jingjing'};

    console.log(obj == obj2) // false
```
-   因为我们创建了两个对象，那么就会在 堆空间 里面开辟两个存储空间（地址）来存储数据
-   虽然存储的内容是一样的，那么也是需要两个存储空间（地址）
-   复杂数据类型之间就是地址的比较，所以 `obj` 和 `obj2` 的两个变量的地址不一样
-   所以我们得到的就是 `false`

- -  

##  六、for 和 for in 循环

-   因为数组的索引就可以获取数组中的内容
-   数组的索引又是按照0~n顺序排列
-   我们可以使用for训话来循环数组，因为for循环我们可以设置成0~n顺序增加（数组 遍历）
    ```javascript
        var arr = [1, 2, 3, 4, 5]

        // 使用 for 循环遍历数组
        for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
        }

        // 会在控制台依次打印出 1， 2， 3， 4， 5
    ```
    -   `i < arr.length` 因为length就是数组的长度，就是一个数字，所以我们可以直接用它来决定循环次数
    -  ` console.log(arr[i])` 因为随着循环，i 的值会从 0 开始依次增加
    -   所以我们实际上就相当于在打印 `arr[0]` / `arr[1]` / ...

-   因为 **对象** 是么有索引的，所以我们没有办法使用 for 循环遍历
-   这里我们使用 for in 虚幻遍历对象
    ```javascript
        var obj = {
        name: 'Jack',
        age: 18
        }

        for (var key in obj) {
        console.log(key)
        }

        // 会在控制台打印两次内容，分别是 name 和 age
    ```
    -   `for in` 循环的遍历是按照对象中有多少成员来决定的
    -   有多少成员，就会执行多少次
    -   `key` 是我们自己定义的一个变量，就相当于 for循环中的时候我们定义的`i`
    -   在每次循环过程中，`key` 就代表着对象中某一个成员的 **属性名**

## 七、数组排序

-   排序，就是把一个乱序的数组，通过我们的处理，让他变成一个有虚的数组
-   今天我们主要讲解两种方式嘞排序数组：**冒泡排序** 和 **选择排序**

### 1、冒泡排序

-   先遍历一遍数组，让挨着的值两个进行比较，如果钱一个 比 后一个大，那么就把两个值交换位置
-   数组遍历一遍以后，那么最后一个数字就是最大的那个值
-   然后进行第二遍的遍历，还是按照之前的规则，然后第二大的数字就会跑到倒数第二的位置
-   以此类推，最后就会按照顺序吧数组排好了

    1、先准备一个乱序的数组

    ```javascript
        var arr = [3, 1, 5, 6, 4, 9, 7, 2, 8]
    ```
    -   接下来我们就会用代码让数组排序
   
    2、先看看数组里面内容交换位置
    ```javascript
        //假设我们现在要让数组中的第 0 项 和 第 1 项 交换位置
        //需要借助第三个变量
        var tmp = arr[0];
        arr[0] = arr[1];
        arr[1] = tmp;

    ```

    3、第一次遍历数组，把最大的值放在最后面去
    ```javascript
        for (var i = 0; i < arr.length; i++) {
        // 判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
        if (arr[i] > arr[i + 1]) {
            var tmp = arr[i]
            arr[i] = arr[i + 1]
            arr[i + 1] = tmp
        }
        }

        // 遍历完毕以后，数组就会变成 [3, 1, 5, 6, 4, 7, 2, 8, 9]
    ```
    -   第一次结束以后，数组中的最后一个，就会是最大的那个值
    -   然后我们把上面的这段代码执行多次。数组有多少项就执行对少次

    4、按照数组的出现昂度来遍历

    ```JavaScript
        for (var j = 0; j < arr.length; j++) {
            for (var i = 0; i < arr.length; i++) {
                // 判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
                if (arr[i] > arr[i + 1]) {
                var tmp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = tmp
                }
            }
        }
    ```
    5、 给一些优化

    - 想象一个问题，假设数组长度是 9，第八次排完以后

    -    后面八个数字已经按照顺序排列好了，剩下的那个最小的一定是在最前面

    - 那么第九次就已经没有意义了，因为最小的已经在最前面了，不会再有任何换位置出现了

    - 那么我们第九次遍历就不需要了，所以我们可以减少一次

     ```javascript
     for (var j = 0; j < arr.length - 1; j++) {
       for (var i = 0; i < arr.length; i++) {
         // 判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
         if (arr[i] > arr[i + 1]) {
           var tmp = arr[i]
           arr[i] = arr[i + 1]
           arr[i + 1] = tmp
         }
       }
     }
     ```

    - 第二个问题，第一次的时候，已经把最大的数字放在最后面了

    - 那么第二次的时候，其实倒数第二个和最后一个就不用比了

    - 因为我们就是要把倒数第二大的放在倒数第二的位置，即使比较了，也不会换位置

    - 第三次就要倒数第三个数字就不用再和后两个比较了

    - 以此类推，那么其实每次遍历的时候，就遍历当前次数 - 1 次

     ```javascript
     for (var j = 0; j < arr.length - 1; j++) {
       for (var i = 0; i < arr.length - 1 - j; i++) {
         // 判断，如果数组中的当前一个比后一个大，那么两个交换一下位置
         if (arr[i] > arr[i + 1]) {
           var tmp = arr[i]
           arr[i] = arr[i + 1]
           arr[i + 1] = tmp
         }
       }
     }
     ```
    6、 至此，一个冒泡排序就完成了

### 2、选择排序
- 先假定数组中的第 0 个就是最小的数字的索引
- 然后遍历数组，只要有一个数字比我小，那么就替换之前记录的索引
- 知道数组遍历结束后，就能找到最小的那个索引，然后让最小的索引换到第 0 个的位置
- 再来第二趟遍历，假定第 1 个是最小的数字的索引
- 在遍历一次数组，找到比我小的那个数字的索引
- 遍历结束后换个位置
- 依次类推，也可以把数组排序好

1. 准备一个数组

   ```javascript
   var arr = [3, 1, 5, 6, 4, 9, 7, 2, 8]
   ```

2. 假定数组中的第 0 个是最小数字的索引

   ```javascript
   var minIndex = 0
   ```

3. 遍历数组，判断，只要数字比我小，那么就替换掉原先记录的索引

   ```javascript
   var minIndex = 0
   for (var i = 0; i < arr.length; i++) {
     if (arr[i] < arr[minIndex]) {
       minIndex = i
     }
   }
   
   // 遍历结束后找到最小的索引
   // 让第 minIndex 个和第 0 个交换
   var tmp = arr[minIndex]
   arr[minIndex] = arr[0]
   arr[0] = tmp
   ```

4. 按照数组的长度重复执行上面的代码

   ```javascript
   for (var j = 0; j < arr.length; j++) {
     // 因为第一遍的时候假定第 0 个，第二遍的时候假定第 1 个
     // 所以我们要假定第 j 个就行
     var minIndex = j
     
     // 因为之前已经把最小的放在最前面了，后面的循环就不需要判断前面的了
     // 直接从 j + 1 开始
     for (var i = j + 1; i < arr.length; i++) {
       if (arr[i] < arr[minIndex]) {
         minIndex = i
       }
     }
   
     // 遍历结束后找到最小的索引
     // 第一堂的时候是和第 0 个交换，第二趟的时候是和第 1 个交换
     // 我们直接和第 j 个交换就行
     var tmp = arr[minIndex]
     arr[minIndex] = arr[j]
     arr[j] = tmp
   }
   ```

5. 一些优化

   - 和之前一样，倒数第二次排序完毕以后，就已经排好了，最后一次没有必要了

     ```javascript
     for (var j = 0; j < arr.length - 1; j++) {
       var minIndex = j
       
       for (var i = j + 1; i < arr.length; i++) {
         if (arr[i] < arr[minIndex]) {
           minIndex = i
         }
       }
     
       var tmp = arr[minIndex]
       arr[minIndex] = arr[j]
       arr[j] = tmp
     }
     ```

   - 在交换变量之前，可以判断一下，如果我们遍历后得到的索引和当前的索引一直

   - 那么就证明当前这个就是目前最小的，那么就没有必要交换

   - 做一我们要判断，最小作引和当前作引不一样的时候，才交换

     ```javascript
     for (var j = 0; j < arr.length - 1; j++) {
       var minIndex = j
       
       for (var i = j + 1; i < arr.length; i++) {
         if (arr[i] < arr[minIndex]) {
           minIndex = i
         }
       }
     
       if (minIndex !== j) {
         var tmp = arr[minIndex]
         arr[minIndex] = arr[j]
         arr[j] = tmp   
       }
     }
     
     ```

6. 至此，选择排序完成

   ```javascript
    var arr = [45, 8, 7, 0, 5, 4];
   
               for(var i = 0; i < arr.length - 1; i++){
                   //被比较的数的下标
                   for(var j = i + 1; j < arr.length; j++){
                       if(arr[i] > arr[j]){
                           var tmp = arr[i];
                           arr[i] = arr[j];
                           arr[j] = tmp;
                       }
                   }
               }
               alert(arr);
   ```

   

## 八、函数参数传递基本数据和复杂数据类型的区别

-   之前我嗯知道基本数据类型 和 复杂数据类型在存储上有区别
-   那么他们在赋值之间也是有区别的
-   基本数据类型 之间的赋值
```javascript
    var num = 10
    var num2 = num

    num2 = 200

    console.log(num) // 100
    console.log(num2) // 200
```
-   复杂的数据类型之间的赋值
    ```javascript
        var obj = {
        name: 'Jack'
        }
        var obj2 = obj

        obj2.name = 'Rose'

        console.log(obj.name) // Rose
        console.log(obj2.name) // Rose

    ```
    - 因为复杂数据类型，变量存储的是地址，真实内容在 堆空间 内存储
    -   所以赋值的时候相当于把 obj 存储的那个地址复制了一份给到了 obj2 变量
    - 现在 obj 和 obj2 两个变量存储的地址一样，指向一个内存空间
    - 所以使用 obj2 这个变量修改空间内的内容，obj 指向的空间也会跟着改变了

## 九、函数的参数

-   函数的参数也是赋值的之中，在函数调用的时候，实参给形参赋值
-   和之前变量赋值的规则一样的
-   函数传递基本数据类型
    ```javascript
        function fn(n) {
        n = 200
        console.log(n) // 200
        }

        var num = 100
        fn(num)
        console.log(num) // 100
    ```
    -   和之前变量赋值的时候一样，在把num的hi复制了一份一模一样的给到函数内部的形参
    -   两个之间没有任何关系
-   函数传递复杂数据类型
    ```javascript
        function fn(o) {
            o.name = 'Rose'
            console.log(o.name) // Rose
        }

        var obj = {
        name: 'Jack'
        }
        fn(obj)
        console.log(obj.name) // Rose
    ```
    - 和之前变量赋值的时候一样，把 obj 内存储的地址复制了一份一摸一样的给到函数内部的行参 o
    - 函数外部的 obj 和函数内部的行参 o，存储的是一个地址，指向的是一个存储空间
    - 所以两个变量操作的是一个存储空间
    - 在函数内部改变了空间内的数据
    - obj 看到的也是改变以后的内容
