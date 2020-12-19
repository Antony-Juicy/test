# Math 和 Date 对象、函数中的this
-   Math 是js的一个内置对象，提供了一堆方法帮助我们操作 **数字**
-   Date 是js的一个内置对象，提供了一堆方法帮助我们操作 **时间**

# 一、函数中的this

    this是函数中的一个对象 只能够通过点语法和方括号语法修改或者访问 不能够通过 = 修改 因为它直接指向内存

## this的特点

+ 在函数定义的时候，无法确定指向

+ 只有在函数调用的时候，才可以确定指向

+ 指向规则：

  + 谁调用 this就指向谁

  + 当没有明确的调用者时，指向window

    

  ```JavaScript
      var fun = function() {
          console.log(this);
      }
      var obj = {};
      obj.demo = fun;
      
      // 设置为元素的事件
      btn.onclick = fun;
  ```


```javascript
    fun(); // 指向window 因为没有明确的调用者
    obj.demo(); // 指向obj 因为是obj在调用
    // 当点击btn时 this指向 btn 因为是触发了 btn的该事件

  
```

```javascript
   <div id="fou1">今天可以</div> 
```

```javascript
// 获取元素
        var fou1 = document.getElementById('fou1');
        
           // 绑定点击事件
        // fou1.onclick = function () {
        //     alert(fou1.innerHTML);
        // }
        
innerHTML（属性可以设置或者返回指定元素的HTML内容）、innerText（获取或设置指定元素标记内的文本的值，）
```

```javascript
// 通过this来复用函数
     function fun() {    
         alert(this.innerText)
      }

    fou1.onclick = fun;
```

```javascript
 // 事件函数中的this 就是绑定事件的元素
        // 函数自己执行this是window
        // fun();
```

```javascript
// 对象的属性值 可以是函数 当它是函数的时候我们管这个属性叫 "方法"
        var obj={
            name:'今天怎么样？',
            gae:fun
        }
        // 对象的方法里面的this是对象本身
        obj.gae();
        
        
// 判定函数中的this的方法： 1 谁调用 就是谁 2 当调用者不明确时 默认指向window

		 	// 如何判定谁在调用？
		 	// 点前面是谁 就是谁
		 	
```

# 二、Math中的方法

### 1、 `Math.random` 方法
-   `Math.random()`这个方法是用来 生成一个 `0-1`之间的随机数
-   每次执行生成的数字都不一样，但是一定是`0-1`之间的数
-   生成的随机数字包含0，但是不包含 1
```javascript
    var num = Math.random()
    console.log(num) // 得到一个随机数
```

### 2、`Math.abs` 方法
-   `Math.abs()` 返回一个数的绝对值
    ```javascript
        var num = -10
        console.log(math.abs(num)) // 10
    ```

### 3、`Math.ceil`方法
-   `Math.ceil()` 是将一个小数 **向上取整** 得到一个整数
    ```javascript
        var num = 10.1
        console.log(Math.ceil(num)) // 11

        var num2 = 10.9
        console.log(Math.ceil(num2)) // 11
    ```

### 4、`Math.floor` 方法
-   `Math.floor()`  是将一个小数 **向下取整** 得到的整数
    ```javascript
        var num = 10.1
        console.log(Math.floor(num)) // 10

        var num2 = 10.9
        console.log(Math.floor(num2)) // 10

    ```

### 5、`Math.max` 方法
-  `Math.max()` 得到的事你传入的几个数字之中最大的那个数字
    ```javascript
        console.log(Math.max(1, 2, 3, 4, 5)) // 5  
    ```

### 6、`Math.min` 方法
-   `Math.min` 得到的是你传入的几个数字之中最小的那个数字
    ```javascript
        console.log(Math.min(1, 2, 3, 4, 5)) // 1
    ```

### 7、`Math.pI` 方法
-   `Math.pI`你得到的事 `π`的值，也就是 3.1415936...
    ```JavaScript
        console.log(Math.PI) // 3.141592653589793
    ```
    - 因为计算机的计算精度问题，只能得到小数点后 15 位
    - **使用 Math.PI 的时候，是不需要加 () 的**

## 二、数字转换进制

1. `toString()` 方法可以在数字转成字符串的时候给出一个进制数

   - 语法： `toString(你要转换的进制)`

     ```javascript
        var num = 100
        console.log(num.toString(2)) // 1100100
        console.log(num.toString(8)) // 144
        console.log(num.toString(16)) // 64
     ```

2. `parseInt()` 方法可以在字符串转成数字的时候把字符串当成多少进制转成十进制

   - 语法： `parseInt(要转换的字符串，当作几进制来转换)`

     ```javascript
        var str = 100
        console.log(parseInt(str, 8)) // 64 把 100 当作一个 八进制 的数字转换成 十进制 以后得到的
        console.log(parseInt(str, 16)) // 256 把 100 当作 十六进制 的数字转换成 十进制 以后得到的
        console.log(parseInt(str, 2)) // 4 把 100 当作 二进制 的数字转换成 十进制 以后得到的
     ```

## 三、Date中的方法

-   js提供的内置构造函数，专门用来获取时间的
-   日期是咧独享通常通过 Date 构造函数来创建

### new Date()

- `new Date()` 在不传递参数的情况下是默认返回当前时间

  ```javascript
  var time = new Date()
  console.log(time) // 当前时间 Fri Mar 01 2019 13:11:23 GMT+0800 (中国标准时间)
  ```

- `new Date()` 在传入参数的时候，可以获取到一个你传递进去的时间

  ```javascript
  var time = new Date('2019-03-03 13:11:11')
  console.log(time) // Sun Mar 03 2019 13:11:11 GMT+0800 (中国标准时间)
  ```

- `new Date()` 传递的参数有多种情况

  1. 传递两个数字，第一个表示年，第二个表示月份

     ```javascript
     var time = new Date(2019, 00) // 月份从 0 开始计数，0 表示 1月，11 表示 12月
     console.log(time) // Tue Jan 01 2019 00:00:00 GMT+0800 (中国标准时间)
     ```

  2. 传递三个数字，前两个不变，第三个表示该月份的第几天，从 1 到 31

     ```javascript
     var time = new Date(2019, 00, 05) 
     console.log(time) // Sat Jan 05 2019 00:00:00 GMT+0800 (中国标准时间)
     ```

  3. 传递四个数字，前三个不变，第四个表示当天的几点，从 0 到 23

     ```javascript
     var time = new Date(2019, 00, 05, 22) 
     console.log(time) // Sat Jan 05 2019 22:00:00 GMT+0800 (中国标准时间)
     ```

  4. 传递五个数字，前四个不变，第五个表示的是该小时的多少分钟，从 0 到 59

     ```javascript
     var time = new Date(2019, 00, 05, 22, 33) 
     console.log(time) // Sat Jan 05 2019 22:33:00 GMT+0800 (中国标准时间)
     ```

  5. 传递六个数字，前五个不变，第六个表示该分钟的多少秒，从 0 到 59

     ```javascript
     var time = new Date(2019, 00, 05, 22, 33, 55) 
     console.log(time) // Sat Jan 05 2019 22:33:55 GMT+0800 (中国标准时间)
     ```

  6. 传入字符串的形式

     ```javascript
     console.log(new Date('2019')) 
     // Tue Jan 01 2019 08:00:00 GMT+0800 (中国标准时间)
     console.log(new Date('2019-02')) 
     // Fri Feb 01 2019 08:00:00 GMT+0800 (中国标准时间)
     console.log(new Date('2019-02-03')) 
     // Sun Feb 03 2019 08:00:00 GMT+0800 (中国标准时间)
     console.log(new Date('2019-02-03 13:')) 
     // Sun Feb 03 2019 13:00:00 GMT+0800 (中国标准时间)
     console.log(new Date('2019-02-03 13:13:')) 
     // Sun Feb 03 2019 13:13:00 GMT+0800 (中国标准时间)
     console.log(new Date('2019-02-03 13:13:13')) 
     // Sun Feb 03 2019 13:13:13 GMT+0800 (中国标准时间)
     ```

## 四、将日期字符串格式化成指定内容

- 比如我们得到的时间字符串是 `Sun Feb 03 2019 13:13:13 GMT+0800 (中国标准时间)`
- 我指向得到这个日期中是那一年，我们就要靠截取字符串的形式得到
- 但是现在 js 为我们提供了一系列的方法来得到里面的指定内容



### 1、`getFullYear` 方法

- `getFullYear()` 方式是得到指定字符串中的哪一年

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getFullYear()) // 2019
  ```



### 2、`getMonth`方法

- `getMonth()` 方法是得到指定字符串中的哪一个月份 

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getMonth()) // 3
  ```

  - 这里要有一个注意的地方
  - 月份是从 0 开始数的
  - 0 表示 1月，1 表示 2月，依此类推



### 3、`getDate` 方法

- `getDate()` 方法是得到指定字符串中的哪一天

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getDate()) // 3
  ```



### 4、`getHours`方法

- `getHours()` 方法是得到指定字符串中的哪小时

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getHours()) // 8
  ```



### 5、`getMinutes`方法

- `getMinutes()` 方法是得到指定字符串中的哪分钟

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getMinutes()) // 0
  ```



### 6、`getSeconds`方法

- `getSeconds()` 方法是得到指定字符串中的哪秒钟

  ```javascript
    var time = new Date(2019, 03, 03, 08, 00, 22)
    console.log(time.getSeconds()) // 22
  ```

  

### 7、`getDay`方法

- `getDay()` 方法是得到指定字符串当前日期是一周中的第几天（周日是 0，周六是 6）

  ```javascript
    var time = new Date(2019, 03, 08, 08, 00, 22)
    console.log(time.getDay()) // 1
  ```



### 8、`getTime`方法

- `getTime()` 方法是得到执行时间到 `格林威治时间` 的毫秒数

  ```javascript
  var time = new Date(2019, 03, 08, 08, 00, 22)
  console.log(time.getTime()) // 1554681622000
  ```

  

## 五、获取时间差 

- 是指获取两个时间点之间相差的时间
- 在 js 中是不能用时间直接做 减法 的
- 我们需要一些特殊的操作
- 在编程的世界里面，有一个特殊的时间，是 `1970年01月01日00时00分00秒`
- 这个时间我们叫做 `格林威治时间`
- 所有的编程世界里面，这个时间都是一样的，而且 `格林威治时间` 的数字是 0
- 从 `格林威治时间` 开始，每经过1毫秒，数字就会 + 1
- 所以我们可以获取到任意一个时间节点到 `格林威治时间` 的毫秒数
- 然后在用两个毫秒数相减，就能得到两个时间点之间相差的毫秒数
- 我们在通过这个毫秒数得到准确的时间



### 计算时间差

- 例如：我们现在计算一下 `2019-01-01 00:00:00` 到 `2019-01-03 04:55:34` 的时间差

1. 先获取两个时间点到 `格林威治时间` 的毫秒数

   ```javascript
   var time1 = new Date('2019-01-01 00:00:00')
   var time2 = new Date('2019-01-03 04:55:34')
   
   time1 = time1.getTime()
   time2 = time2.getTime()
   
   console.log(time1) // 1546272000000
   console.log(time2) // 1546462534000
   ```

2. 两个时间相减，得到两个时间点之间相差的毫秒数

   ```javascript
   var differenceTime = time2 - time1
   console.log(differenceTime) // 190534000
   ```

   - 现在我们计算出了两个时间点之间相差的毫秒数

3. 把我们计算的毫秒数换算成时间

   - 先计算出有多少天

   - 以为一天是 `1000 * 60 * 60 * 24` 毫秒

   - 用总的毫秒数除以一天的毫秒数，就能得到多少天了

     ```javascript
     var time1 = new Date('2019-01-01 00:00:00')
     var time2 = new Date('2019-01-03 04:55:34')
     time1 = time1.getTime()
     time2 = time2.getTime()
     var differenceTime = time2 - time1
     
     // 计算整的天数
     var day = differenceTime / (1000 * 60 * 60 * 24) // 2.20525462962963
     day = Math.ceil(day) // 2
     ```

     - 因为得到的是有小数的天数，我们向下取整，得到有多少个整的天数

   - 使用 `differenceTime` 减去两天所包含的毫秒数，剩下的就是不够一天的毫秒数

   - 用不够一天的毫秒数计算出有多少个小时

   - 因为一个小时是 `1000 * 60 * 60` 毫秒

   - 用不够一天的毫秒数除以一小时的毫秒数，就能得到多少小时了

     ```javascript
     var time1 = new Date('2019-01-01 00:00:00')
     var time2 = new Date('2019-01-03 04:55:34')
     time1 = time1.getTime()
     time2 = time2.getTime()
     var differenceTime = time2 - time1
     
     // 计算整的天数
     var day = differenceTime / (1000 * 60 * 60 * 24) // 2.20525462962963
     day = Math.floor(day) // 2
     
     // 计算整的小时数
     var afterHours = differenceTime - (1000 * 60 * 60 * 24 * 2)
     var hours = afterHours / (1000 * 60 * 60)
     hours = Math.floor(hours) // 4
     ```

     - 和刚才一样的道理，我们需要向下取整

   - 同理，使用 `afterHours` - 4个小时包含的毫秒数，剩下的就是不够一个小时的毫秒数

   - 用不够一个小时的毫秒数计算出有多少分钟

   - 因为一分钟是 `1000 * 60` 毫秒

   - 用不够一个小时的毫秒数除以一分钟的毫秒数就能得到多少分钟了

     ```javascript
     var time1 = new Date('2019-01-01 00:00:00')
     var time2 = new Date('2019-01-03 04:55:34')
     time1 = time1.getTime()
     time2 = time2.getTime()
     var differenceTime = time2 - time1
     
     // 计算整的天数
     var day = differenceTime / (1000 * 60 * 60 * 24) // 2.20525462962963
     day = Math.floor(day) // 2
     
     // 计算整的小时数
     var afterHours = differenceTime - (1000 * 60 * 60 * 24 * 2)
     var hours = afterHours / (1000 * 60 * 60)
     hours = Math.floor(hours) // 4
     
     // 计算整分钟数
     var afterMinutes = afterHours - (1000 * 60 * 60 * 4)
     var minutes = afterMinutes / (1000 * 60)
     minutes = Math.floor(minutes) // 55
     ```

   - 和之前一样的道理计算出秒

     ```javascript
     var time1 = new Date('2019-01-01 00:00:00')
     var time2 = new Date('2019-01-03 04:55:34')
     time1 = time1.getTime()
     time2 = time2.getTime()
     var differenceTime = time2 - time1
     
     // 计算整的天数
     var day = differenceTime / (1000 * 60 * 60 * 24) // 2.20525462962963
     day = Math.floor(day) // 2
     
     // 计算整的小时数
     var afterHours = differenceTime - (1000 * 60 * 60 * 24 * 2)
     var hours = afterHours / (1000 * 60 * 60)
     hours = Math.floor(hours) // 4
     
     // 计算整分钟数
     var afterMinutes = afterHours - (1000 * 60 * 60 * 4)
     var minutes = afterMinutes / (1000 * 60)
     minutes = Math.floor(minutes) // 55
     
     // 计算整秒数
     var afterSeconds = afterMinutes - (1000 * 60 * 55)
     var seconds = afterSeconds / 1000
     seconds = Math.floor(seconds) // 34
     ```

   - 最后，同理减去整秒的数，剩下的就是毫秒数

     ```javascript
     var time1 = new Date('2019-01-01 00:00:00')
     var time2 = new Date('2019-01-03 04:55:34')
     time1 = time1.getTime()
     time2 = time2.getTime()
     var differenceTime = time2 - time1
     
     // 计算整的天数
     var day = differenceTime / (1000 * 60 * 60 * 24) // 2.20525462962963
     day = Math.floor(day) // 2
     
     // 计算整的小时数
     var afterHours = differenceTime - (1000 * 60 * 60 * 24 * 2)
     var hours = afterHours / (1000 * 60 * 60)
     hours = Math.floor(hours) // 4
     
     // 计算整分钟数
     var afterMinutes = afterHours - (1000 * 60 * 60 * 4)
     var minutes = afterMinutes / (1000 * 60)
     minutes = Math.floor(minutes) // 55
     
     // 计算整秒数
     var afterSeconds = afterMinutes - (1000 * 60 * 55)
     var seconds = afterSeconds / 1000
     seconds = Math.floor(seconds) // 34
     
     // 计算毫秒数
     var milliSeconds = afterSeconds - (1000 * 34) // 0
     ```

   - 最后我们把结果输出一下就可以了

     ```javascript
     document.write('2019-01-01 00:00:00 和 2019-01-03 04:55:34 之间相差')
     document.write(day + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒' + milliSeconds + '毫秒')
     ```
## 六、定时器 和 延时执行

- JavaScript中提供了专门的定时器 和 延时执行的方法，接下来我们简单的介绍他们的基本语法

### 1、延迟执行函数
  - **语法：**`setTimeout(fn,millisec)`
    >fn:是一个需要执行的代码函数              
    millisec:多少时间之后去执行这个延迟执行函数
  - **作用：**`setTimeout()`方法用于在指定的毫秒数后调用函数 或者 计算表达式
  - **说明：**`setTimeout()` 方法只会执行`fn`代码一次
  - **取消：**当延迟执行函数启动后可以通过调用对应的 `clearTimeout()` 方法传入参数来关闭延时执行
  ```javascript
    /*01-延迟执行函数的基本用法 */
    console.log("start",new Date());
    setTimeout(function () {
    /*1 秒后才执行回调函数中的代码*/
      console.log("task",new Date());
    },1000)
     console.log("start",new Date());

  ```

### 2、定时器函数
- **语法：**`setInterval(fn,millsec)`
- **作用：**`setInterval()` 方法会按照指定的周期（以毫秒计算）来调用函数或者计算表达方法式。
- **说明：** `setInterval()` 方法会不停地调用函数，直到`clearInterval（）`被调用或者 窗口关闭为止
- **取消：**当定时器开启后可以通过对应的`clearInterval()`方法传入参数关闭定时器
- **场景：** 定时器函数常用来处理一些需要长时间执行的重复性的工作，例如：轮播图
  ```javascript
    var timer = setInterval(function(){
      cosnole.log('11');
    },1000)

    //取消定时器
    clearInterval(timer);

  ```

     



