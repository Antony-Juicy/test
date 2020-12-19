# ES5和ES6

- 我们所说的 ES5 和 ES6 其实就是在 js 语法的发展过程中的一个版本而已
- ECMAScript 就是 js 的语法
  - 以前的版本没有某些功能
  - 在 ES5 这个版本的时候增加了一些功能
  - 在 ES6 这个版本的时候增加了一些功能
- 因为浏览器是浏览器厂商生产的**（兼容性问题）**
  - ECMAScript 发布了新的功能以后，浏览器厂商需要让自己的浏览器支持这些功能
  - 所以我们写代码的时候就要考虑哪些方法是 ES5 或者 ES6 的，看看是不是浏览器都支持



## 一、ES5 增加的数组常用方法

### 1、数组方法之 forEach

- `forEach` 用于遍历数组，和 for 循环遍历数组一个道理

- 语法： `数组.forEach(function (item, index, arr) {})`

  ```javascript
  var arr = ['a', 'b', 'c']
  // forEach 就是将数组循环遍历，数组中有多少项，那么这个函数就执行多少回
  arr.forEach(function (item, index, arr) {
    // 在这个函数内部
    // item 就是数组中的每一项
    // index 就是每一项对应的索引
    // arr 就是原始数组
    console.log(item) 
    console.log(index) 
    console.log(arr) 
  })
  ```

  - 上面的代码就等价于

  ```javascript
  var arr = ['a', 'b', 'c']
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr)
  }
  function fn(item, index, arr) {
    console.log(item)
    console.log(index)
    console.log(arr)
  }
  ```

```javascript
var arr = [4,3,2,1];
 
var index = [];
var value = [];
var sum = 0;
for(var i=0;i<arr.length;i++){
 
    index.push(i);
    value.push(arr[i])
    sum += arr[i]
};
console.log(index);    //[0, 1, 2, 3]
console.log(value);    // [4,3,2,1]
console.log(sum);      //10
//可以看出，i表示的是数组下标，arr[i]是通过下标来去的对应的值
```

###   2、reduce方法还有个参数

```javascript
于计算一个数组的和，reduce就是很好的方法

var arr = [4,3,2.1,1.1];
var sum = arr.reduce(function(total, val) {
    return total + Math.round(val);     //   Math（取整）
});
console.log(sum);//10

array.reduce(function(total, currentValue, index, arr), initialValue)
其中 currentValue, index, arr意义相同，而total代表计算的初始值, 也是计算结束后的返回值。
其中total, currentValue都是必须的参数。
对于计算一个数组的和，reduce就是很好的方法
```

##### **迭代时不做修改

```javascript
若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 该方法遍历到它们的那一时刻的值；被删除的元素将不会被访问到。例如：

var words = ["one", "two", "three", "four"];
words.forEach(function(word) {
    console.log(word);
    if (word === "two") {
        words.shift();  //  用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    }
});
console.log(words);//["two", "three", "four"]
```

###### 定义：

1. forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
2. map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
   map()方法按照原始数组元素顺序依次处理元素
3. filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。没有到没有符合条件时返回空数组。
4. reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值

|              | forEach      | map        | filter     | reduce            |
| ------------ | ------------ | ---------- | ---------- | ----------------- |
| 操作         | 循环（迭代） | 映射       | 过滤器     | 汇总              |
| 返回值       | undefined    | 返回新数组 | 返回新数组 | 返回计算结果total |
| 改变原数组？ | 看情况       | 否         | 否         | 否                |
| 检测空数组？ | 不检测       | 不检测     | 不检测     | 不检测            |



### 3、数组方法之 map

- `map` 用于遍历数组，和 forEach 基本一致，只不过是有一个返回值

- 语法： `数组.map(function (item, index, arr) {})`

- 返回值： 一个新的数组

  ```javascript
  var arr = ['a', 'b', 'c']
  // forEach 就是将数组循环遍历，数组中有多少项，那么这个函数就执行多少回
  var newArr = arr.map(function (item, index, arr) {
    // 函数里面的三个参数和 forEach 一样
    // 我们可以在这里操作数组中的每一项，
    // return 操作后的每一项
    return item + '11'
  })
  console.log(newArr) // ["a11", "b11", "c11"]
  ```

  - 返回值就是我们每次对数组的操作
  - 等价于

  ```javascript
  var arr = ['a', 'b', 'c']
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i], i, arr))
  }
  function fn(item, index, arr) {
    return item + '11'
  }
  console.log(newArr)
  ```

  

### 3、数组方法之 filter

- `filter` ： 是将数组遍历一遍，按照我们的要求把数数组中符合的内容过滤出来

- 语法： `数组.filter(function (item, index, arr) {})`

- 返回值： 根据我们的条件过滤出来的新数组

  ```javascript
  var arr = [1, 2, 3, 4, 5]
  var newArr = arr.filter(function (item, index, arr) {
    // 函数内部的三个参数和 forEach 一样
    // 我们把我们的条件 return 出去
    return item > 2
  })
  console.log(newArr) // [3, 4, 5]
  ```

  - 新数组里面全都是大于 2 的数字
  - 等价于

  ```javascript
  var arr = [1, 2, 3, 4, 5]
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      newArr.push(arr[i])
    }
  }
  function fn(item, index, arr) {
    return item > 2
  }
  console.log(newArr)
  ```



## 二、JSON 方法

- `json` 是一种特殊的字符串，本质是一个字符串
- 语言的翻译机

  + Javascript的对象：{name:'aa'}

  + PHP: $name -> 'bb'
- json -是所有语言都识别的字符串
- 后端数据格式 --（JSON）--> 前后端交互的时候，后端数据要返回数据给前端：
- 先把后端的数据转化为json数据格式==》把json数据格式传递给前端 ==》 把json数据转化为前端的数据格式

  ```javascript
  var jsonObj = '{ "name": "Jack", "age": 18, "gender": "男" }'
  var jsonArr = '[{ "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }]'
  ```

- 就是对象内部的 `key` 和 `value` 都用**双引号**包裹的字符串（必须是双引号）

  ```javascript
  
  ```

  

### 1、JSON的两个方法

- 我们有两个方法可以使用 **JSON.parse** (json --> jsData)
- `json.stringify` 是将 js 的对象或者数组转换成为 json 格式的字符串 (jsData --> json)



### 2、JSON.parse

- 把数据转化为前端

- `JSON.parse`  是将 json 格式的字符串转换为 js 的对象或者数组

  ```javascript
  var jsonObj = '{ "name": "Jack", "age": 18, "gender": "男" }'
  var jsonArr = '[{ "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }]'
  
  var obj = JSON.parse(jsonStr)
  var arr = JSON.parse(jsonArr)
  
  console.log(obj)
  console.log(arr)
  ```

  - `obj` 就是我们 js 的对象
  - `arr` 就是我们 js 的数组



### 3、JSON.stringify

- `JSON.parse`  是将 json 格式的字符串转换为 js 的对象或者数组

- 把json数据转化为前端数据

  ```javascript
  var obj = {
    name: 'Jack',
    age: 18,
    gender: '男'
  }
  var arr = [
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    },
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    },
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    }
  ]
  
  var jsonObj = JSON.stringify(obj)
  var jsonArr = JSON.stringify(arr)
  
  console.log(jsonObj)
  console.log(jsonArr)
  ```

  - `jsonObj` 就是 json 格式的对象字符串
  - `jsonArr` 就是 json 格式的数组字符串



## 三、this 关键字

- 每一个函数内部都有一个关键字是 `this` 

- 可以让我们直接使用的

- 重点： **函数内部的 this 只和函数的调用方式有关系，和函数的定义方式没有关系**

- 函数内部的 this 指向谁，取决于函数的调用方式

  - 全局定义的函数直接调用，`this => window`

    ```javascript
    function fn() {
      console.log(this)
    }
    fn()
    // 此时 this 指向 window
    ```

  - 对象内部的方法调用，`this => 调用者`

    ```javascript
    var obj = {
      fn: function () {
        console.log(this)
      }
    }
    obj.fn()
    // 此时 this 指向 obj
    ```

  - 定时器的处理函数，`this => window`

    ```javascript
    setTimeout(function () {
      console.log(this)
    }, 0)
    // 此时定时器处理函数里面的 this 指向 window
    ```

  - 事件处理函数，`this => 事件源`

    ```javascript
    div.onclick = function () {
      console.log(this)
    }
    // 当你点击 div 的时候，this 指向 div
    ```

  - 自调用函数，`this => window`

    ```javascript
    (function () {
      console.log(this)
    })()
    // 此时 this 指向 window
    ```

           ```javascript
    //第二种
    !function(){}()
    //第三种
    ~function(){}()
    
               ```
    
               ```



###  强行改变this指向

#### 1、call

- `call` 方法是附加在函数调用后面使用，可以忽略函数本身的 this 指向

- 语法： `函数名.call(要改变的 this 指向，要给函数传递的参数1，要给函数传递的参数2， ...)`

  ```javascript
  var obj = { name: 'Jack' }
  function fn(a, b) {
    console.log(this)
    console.log(a)
    console.log(b)
  }
  fn(1, 2)
  fn.call(obj, 1, 2)
  ```

  - `fn()` 的时候，函数内部的 this 指向 window
  - `fn.call(obj, 1, 2)` 的时候，函数内部的 this 就指向了 obj 这个对象
  - 使用 call 方法的时候
    - 会立即执行函数
    - 第一个参数是你要改变的函数内部的 this 指向
    - 第二个参数开始，依次是向函数传递参数



#### 2、apply

- `apply` 方法是附加在函数调用后面使用，可以忽略函数本身的 this 指向

- 语法： `函数名.apply(要改变的 this 指向，[要给函数传递的参数1， 要给函数传递的参数2， ...])`

  ```javascript
  var obj = { name: 'Jack' }
  function fn(a, b) {
    console.log(this)
    console.log(a)
    console.log(b)
  }
  fn(1, 2)
  fn.call(obj, [1, 2])
  ```

  - `fn()` 的时候，函数内部的 this 指向 window
  - `fn.apply(obj, [1, 2])` 的时候，函数内部的 this 就指向了 obj 这个对象
  - 使用 apply 方法的时候
    - 会立即执行函数
    - 第一个参数是你要改变的函数内部的 this 指向
    - 第二个参数是一个 **数组**，数组里面的每一项依次是向函数传递的参数



#### 3、bind

- `bind` 方法是附加在函数调用后面使用，可以忽略函数本身的 this 指向

- 和 call / apply 有一些不一样，就是不会立即执行函数，而是**返回一个已经改变了 this 指向的函数**

- 语法： `var newFn = 函数名.bind(要改变的 this 指向); newFn(传递参数)`

  ```javascript
  var obj = { name: 'Jack' }
  function fn(a, b) {
    console.log(this)
    console.log(a)
    console.log(b)
  }
  fn(1, 2)
  var newFn = fn.bind(obj)
  newFn(1, 2)
  ```

  - bind 调用的时候，不会执行 fn 这个函数，而是返回一个新的函数
  - 这个新的函数就是一个改变了 this 指向以后的 fn 函数
  - `fn(1, 2)` 的时候 this 指向 window
  - `newFn(1, 2)` 的时候执行的是一个和 fn 一摸一样的函数，只不过里面的 this 指向改成了 obj



## 四、ES6新增的内容

### 1、let 和 const 关键字

- 我们以前都是使用 `var` 关键字来声明变量的

- 在 ES6 的时候，多了两个关键字 `let` 和 `const`，也是用来声明变量的

- 只不过和 var 有一些区别

  1.  `let` 和 `const` 不允许重复声明变量

     ```javascript
     // 使用 var 的时候重复声明变量是没问题的，只不过就是后面会把前面覆盖掉
     var num = 100
     var num = 200
     ```

     ```javascript
     // 使用 let 重复声明变量的时候就会报错了
     let num = 100
     let num = 200 // 这里就会报错了
     ```

     ```javascript
     // 使用 const 重复声明变量的时候就会报错
     const num = 100
     const num = 200 // 这里就会报错了
     ```

  2. `let` 和 `const` 声明的变量不会在预解析的时候解析（也就是没有变量提升）

     ```javascript
     // 因为预解析（变量提升）的原因，在前面是有这个变量的，只不过没有赋值
     console.log(num) // undefined
     var num = 100
     ```

     ```javascript
     // 因为 let 不会进行预解析（变量提升），所以直接报错了
     console.log(num) // undefined
     let num = 100
     ```

     ```javascript
     // 因为 const 不会进行预解析（变量提升），所以直接报错了
     console.log(num) // undefined
     const num = 100
     ```

  3. `let` 和 `const` 声明的变量会被所有代码块**限制作用范围**(块级作用域)

     - 在花括号中声明一个变量只能在这个花括号中使用

     ```javascript
     // var 声明的变量只有函数能限制其作用域，其他的不能限制
     if (true) {
       var num = 100
     }
     console.log(num) // 100
     ```

     ```javascript
     // let 声明的变量，除了函数可以限制，所有的代码块都可以限制其作用域（if/while/for/...）
     if (true) {
       let num = 100
       console.log(num) // 100
     }
     console.log(num) // 报错
     ```

     ```javascript
     // const 声明的变量，除了函数可以限制，所有的代码块都可以限制其作用域（if/while/for/...）
     if (true) {
       const num = 100
       console.log(num) // 100
     }
     console.log(num) // 报错
     ```

- `let` 和 `const` 的区别

  1. `let` 声明的变量的值可以改变，`const` 声明的变量的值不可以改变

     ```javascript
     let num = 100
     num = 200
     console.log(num) // 200
     ```

     ```javascript
     const num = 100
     num = 200 // 这里就会报错了，因为 const 声明的变量值不可以改变（我们也叫做常量）
     ```

  2. `let` 声明的时候可以不赋值，`const` 声明的时候必须赋值

     ```javascript
     let num
     num = 100
     console.log(num) // 100
     ```

     ```javascript
     const num // 这里就会报错了，因为 const 声明的时候必须赋值
     ```

#### 1-1、`let` 声明优点

```javascript
var btn = document.querySelectorAll('button');
       //之前使用var声明 是用添加index索引的方法，否则i的值其实为循环后的值
		for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = function () {
                // 如果使用let 声明i 的时候，点击事件中 是可以获取当前的i的值
                console.log(i);
            }
        }
```



### 2、箭头函数

- 箭头函数是 ES6 里面一个简写函数的语法方式

- 重点： **箭头函数只能简写函数表达式，不能简写声明式函数**

- function() {} ====>   () =>{}

  ```javascript
  function fn() {} // 不能简写
  const fun = function () {} // 可以简写
  const obj = {
    fn: function () {} // 可以简写
  }
  ```

- 语法： `(函数的行参) => { 函数体内要执行的代码 }`

  ```javascript
  const fn = function (a, b) {
    console.log(a)
    console.log(b)
  }
  // 可以使用箭头函数写成
  const fun = (a, b) => {
    console.log(a)
    console.log(b)
  }
  ```

  ```javascript
  const obj = {
    fn: function (a, b) {
      console.log(a)
      console.log(b)
    }
  }
  // 可以使用箭头函数写成
  const obj2 = {
    fn: (a, b) => {
      console.log(a)
      console.log(b)
    }
  }
  ```

  

#### 2-1、箭头函数的特殊性

- 1、箭头函数内部没有 this，箭头函数的 this 是上下文的 this（定义在哪个容器就指向哪里）

  ```javascript
  // 在箭头函数定义的位置往上数，这一行是可以打印出 this 的
  // 因为这里的 this 是 window
  // 所以箭头函数内部的 this 就是 window
  const obj = {
    fn: function () {
      console.log(this)
    },
    // 这个位置是箭头函数的上一行，但是不能打印出 this
    fun: () => {
      // 箭头函数内部的 this 是书写箭头函数的上一行一个可以打印出 this 的位置
      console.log(this)
    }
  }
  
  obj.fn()
  obj.fun()
  ```

  - 按照我们之前的 this 指向来判断，两个都应该指向 obj
  - 但是 fun 因为是箭头函数，所以 this 不指向 obj，而是指向 fun 的外层，就是 window

- 2、箭头函数内部没有 `arguments` 这个参数集合

  ```javascript
  const obj = {
    fn: function () {
      console.log(arguments)
    },
    fun: () => {
      console.log(arguments)
    }
  }
  obj.fn(1, 2, 3) // 会打印一个伪数组 [1, 2, 3]
  obj.fun(1, 2, 3) // 会直接报错
  ```

- 3、函数的行参只有一个的时候可以不写 `()` 其余情况必须写

  ```javascript
  const obj = {
    fn: () => {
      console.log('没有参数，必须写小括号')
    },
    fn2: a => {
      console.log('一个行参，可以不写小括号')
    },
    fn3: (a, b) => {
      console.log('两个或两个以上参数，必须写小括号')
    }
  }
  ```

- 4、函数体只有一行代码的时候，可以不写 `{}` ，并且会**自动 return**

  ```javascript
  const obj = {
    fn: a => {
      return a + 10
    },
    fun: a => a + 10
  }
  
  console.log(fn(10)) // 20
  console.log(fun(10)) // 20
  ```

#### 2-2、练习：箭头函数函数转换为普通函数

```javascript
        let fun = a => b => c => a + b + c;
        //把箭头函数 转化为 普通函数
        let fun = function (a) {
            return function (b) {
                return function (c) {
                    return a + b + c
                }
            }
        }
```



### 3、函数传递参数的时候的默认值

- 当不传递实参的时候，使用默认值，传递参数了就使用传递的参数

#### 3-1、法一：给或判断

  ```javascript
  function fn(a) {
    a = a || 10 
    console.log(a)
  }
  fn()   // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```
#### 3-2、法二：直接在形参位置赋值
  - 在 ES6 中我们可以直接把默认值写在函数的形参位置

  ```javascript
  function fn(a = 10) {
    console.log(a)
  }
  fn()   // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```

  - 这个默认值的方式箭头函数也可以使用

  ```javascript
  const fn = (a = 10) => {
    console.log(a)
  }
  fn()   // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```

  - 注意： **箭头函数如果你需要使用默认值的话，那么一个参数的时候也需要写 （）**

### 4、解构赋值

- 解构赋值，就是快速的从对象或者数组中取出成员的一个语法方式

#### 4-1、解构对象

- 快速的从对象中获取成员

  ```javascript
  // ES5 的方法向得到对象中的成员
  const obj = {
    name: 'Jack',
    age: 18,
    gender: '男'
  }
  
  let name = obj.name
  let age = obj.age
  let gender = obj.gender
  ```

  ```javascript
  // 解构赋值的方式从对象中获取成员
  const obj = {
    name: 'Jack',
    age: 18,
    gender: '男'
  }
  
  // 前面的 {} 表示我要从 obj 这个对象中获取成员了
  // name age gender 都得是 obj 中有的成员
  // obj 必须是一个对象
  //内部：定义一个name变量，解构obj对象的name属性，返回给name这个变量（一般情况下就用这个属性为变量）
  let { name, age, gender } = obj
  //内部：定义一个userName变量，解构obj对象的name属性，返回给userName这个变量
  let { name: userName } = obj
  ```

    ```javascript
    //对象的多重解构
    let person = {
        name:'zs',
        age:18,
        info:{
            id:2424252532,
            height:180,
            weight:140
        }
    }
    //先定义一个变量 info，解构person中的info属性，把info的属性的属性值 赋值给变量info
    // 然后定义一个id变量,解构info对象中的id属性，然后把id属性的属性值赋值给id这个变量
    let {info:{id}} = person;  //log出2424252532
    ```



#### 4-2、解构数组

- 快速的从数组中获取成员

  ```javascript
  // ES5 的方式从数组中获取成员
  const arr = ['Jack', 'Rose', 'Tom']
  let a = arr[0]
  let b = arr[1]
  let c = arr[2]
  ```

  ```javascript
  // 使用解构赋值的方式从数组中获取成员
  const arr = ['Jack', 'Rose', 'Tom']
  
  // 前面的 [] 表示要从 arr 这个数组中获取成员了
  // a b c 分别对应这数组中的索引 0 1 2 （默认只能从左到右）
  // arr 必须是一个数组
  let [a, b, c] = arr
  ```

    ```javascript
    //利用数组解构实现两个数据交换
    let num1 = 10;
    let num2 = 20;
    [num1,num2] = [num2,num1];
    ```



#### 4-3、注意

- `{}` 是专门解构对象使用的
- `[]` 是专门解构数组使用的
- 不能混用



### 5、模版字符串

- ES5 中我们表示字符串的时候使用 `''` 或者 `""`

- 在 ES6 中，我们还有一个东西可以表示字符串，就是 **``**（反引号）

  ```javascript
  let str = `hello world`
  console.log(typeof str) // string
  ```

- 和单引号好友双引号的区别

  1. 反引号可以换行书写

     ```javascript
     // 这个单引号或者双引号不能换行，换行就会报错了
     let str = 'hello world' 
     
     // 下面这个就报错了
     let str2 = 'hello 
     world'
     ```

     ```javascript
     let str = `
     	hello
     	world
     `
     
     console.log(str) // 是可以使用的
     ```

  2. 反引号可以直接在字符串里面拼接变量

     ```javascript
     // ES5 需要字符串拼接变量的时候
     let num = 100
     let str = 'hello' + num + 'world' + num
     console.log(str) // hello100world100
     
     // 直接写在字符串里面不好使
     let str2 = 'hellonumworldnum'
     console.log(str2) // hellonumworldnum
     ```

     ```javascript
     // 模版字符串拼接变量
     let num = 100
     let str = `hello${num}world${num}`
     console.log(str) // hello100world100
     ```

     - 在 **``** 里面的 `${}` 就是用来书写变量的位置



### 6、展开/合并运算符(`...`)

#### 6-1、把数组展开

    ```javascript
    let arr = [1, 2, 3, 4, 5]
    console.log(...arr) // 1 2 3 4 5
    ```
#### 6-2、合并数组的时候可以使用

```javascript
//合并数组
let arr = [1, 2, 3, 4]
let arr2 = [...arr, 5]
console.log(arr2)
```
```javascript
//把arr1中的数据添加到 arr中
 let arr = [12, 4, 55, 6, 7, 80, 99, 100, 209];
 let arr1 = ['a', 'b', 'c'];
 let res = arr.concat(arr1)
```

#### 6-3、合并对象

```javascript
let obj = {
  name: 'Jack',
  age: 18
}
let obj2 = {
  ...obj,
  gender: '男'
}
console.log(obj2)
```
#### 6-4、函数传参使用

```javascript
let arr = [1, 2, 3]
function fn(a, b, c) {
  console.log(a)
  console.log(b)
  console.log(c)
}
fn(...arr)
// 等价于 fn(1, 2, 3)
```
#### 6-5、伪数组转换为真数组

```javascript
//获取元素时
        let lis = document.querySelectorAll('li');
        lis = [...lis];
//传参时
  		function fn() {
            // 把伪数组转成真正的数组
            var arr = [...arguments];
            console.log(arr.slice(1));
        }
        fn(1, 2, 3, 4, 5)
```

#### 6-6、对象的简易书写

```javascript
function person(name, age, sex) {
            let obj = {
                // name: name,
                // age: age,
                // sex: sex,
                // 下面的属性就是 简易书写
                // 当对象的属性 和属性值 名字一样的时候，可以省略属性不写
                name,
                age,
                sex,
                info: { ...info }
            }
            return obj
        }
        let p1 = person('老谢', 58, '男');
        let p2 = person('田田', 48, '女');
        console.log(p1, p2);
```



### 7、for of 循环 

+ 只能遍历可迭代(`Symbol.iterator`,可以一个个取出来的，可以遍历的)的数据
+ 可迭代 ：数组，字符串，set集合
+ 优点：可以终止循环，不需要知道循环的次数

```javascript
// for in 遍历数组key得到的是索引
let arr = [10,20,30];
for(let key in arr){
    console.log(key); // 0,1,2
    console.log(arr[key]); // 10,20,30
}
//for of 遍历数组key得到的是值
let arr = [10,20,30];
for(let key of arr){
    console.log(key); // 10,20,30
}
```
```javascript
let lis = document.getElementsByTagName('li'); //也可以迭代
for (let key of lis){
    key.onclick = function(){
        console.log(this);
    }
}
//对比于for,forEach循环，不能添加break 或者continue. for of 可以添加break和continue，可以随意终止循环，也不需要知道数组的长度
```


## 五、代码片段

### 提高写代码效率

- 【1】设置--用户代码片段--新建全局代码片段
- 【2】在打开的文件中设置你的代码块
- 【3】把Example 后面代码注释去掉
- 【4】scope 设置使用代码块的区域
- 【5】prefix 设置打开代码片段的关键字
- 【6】body 设置代码片段
- 【7】description 代码片段的描述
- 注意点：

​          \$ 1 表示第一个变量 生成代码片段的时候 光标默认会在$1 的位置

​          \$ 2 表示变量2 ，变量1写完按tab 键光标去到$2的位置

```javascript
//一段for循环的快速生成
// Example:
	"Print to console": {
		"scope": "javascript,typescript",
		"prefix": "for",
		"body": [
			"for(let $1 = 0; $1 < arr.length; $1++);{}"
		],
		"description": "forquickly"
	}
```

## 六、ES6新增字符串方法

### 1、`includes(字符) `

- 字符串和数组都有的

- 判断字符串中是否包含某个字符(是数组的方法也是字符串的方法) 

- 返回值：布尔值，如果存在返回true，不存在返回false 

### 2、`str.endsWith(字符)`
- 判断字符串是否执行的字符结尾
### 3、`str.startsWith(字符)`
- 判断字符串是否以指定字符开头

### 4、`Object.prototype.toString.call(数据) `

- 判断这个数据的数据类型 

```javascript
 <script>       
	    console.log(Object.prototype.toString.call(123));
        console.log(Object.prototype.toString.call('123'));
        console.log(Object.prototype.toString.call(null));
        console.log(Object.prototype.toString.call([1, 2, 3]));
        console.log(Object.prototype.toString.call(function () { }));
        console.log(Object.prototype.toString.call(true));
</script>	
//结果
         [object Number]
         [object String]
         [object Null]
         [object Array]
         [object Function]
         [object Boolean]
```

### 5、`set`

```javascript
    // set 集合，类似于数组的集合
        // 但是set的值是唯一
        let arr = [1, 2, 3, 4, 5, 1, 2];
        // console.log(arr);

        // 创建一个set集合
        let s1 = new Set(arr);
        // s1 是一个set集合，不是一个真正的数组
        console.log([...s1]);
```

- 类似数组去重

