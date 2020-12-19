# 数组常用的方法

- 数组是一个复杂的数据类型，所以我们早操作数组的时候就不能像基本数据类型那样操作。
- 比如我们想改变一个数组

```javascript
    //创建一个数组
    var arr = [1,2,3];

    //我们想把数组改变为 只有 1 和 2
    arr = [1,2]

```

- 这样的是不合理的，因为这样不是在改变之前的数组，而是相当于重新弄了一个数组给到 arr 这个变量了
- 相当于把 arr 里面存储的地址给换了，也就是把存储空间换掉了，而不是在之前的空间里面修改
- 所以我们就需要借助一些方法，在不改变存储空间的情况下，把存储空间里面的数据改变了

### 1、`push` 方法

- `push` 是用来 在数组 的末尾添加一个元素的

```javascript
    var arr = [1, 2, 3]

    // 使用 push 方法追加一个元素在末尾
    arr.push(4)

    console.log(arr) // [1, 2, 3, 4]
    
	//返回值：数组新长度

```

### 2、`pop` 方法

- `pop` 是用来删除数组末尾的一个元素

```javascript
    var arr = [1, 2, 3]

    // 使用 pop 方法删除末尾的一个元素
    arr.pop()  //无参数，返回值为被删除的数据

    console.log(arr) // [1, 2]

```

### 3、`unshift` 方法

- `unshift` 是在数组的最前面添加一个元素

```javascript
    var arr = [1, 2, 3]

    // 使用 unshift 方法想数组的最前面添加一个元素
    arr.unshift(4)

    console.log(arr) // [4, 1, 2, 3]
	
	//返回值：数组新长度
```

### 4、`shift` 方法

- `shift` 方法是删除数组最前面的一个元素

```javascript
    var arr = [1, 2, 3]

    // 使用 shift 方法删除数组最前面的一个元素
    arr.shift()

    console.log(arr) // [2, 3]
     //无参数，返回值为被删除的数据
```

### 5、`splice` 方法

- `splice` 是截取数组中某些内容，按照数组的索引来截取

- 语法：`arr.splice(idx,num,value)`

  > splice总共有 3 个参数，但是第三个参数可以不写
  >
  > - idx  ：从哪个索引位置开始
  > - num  ：截取多少个
  > - value：替换的新元素

  ```javascript
      var arr = [1, 2, 3, 4, 5]
  
      // 使用 splice 方法截取数组
      arr.splice(1, 2)    //返回值是截取下来的数组
  
      console.log(arr) // [1, 4, 5]
  ```

  - `arr.splice(1, 2)` 表示从索引 1 开始截取 2 个内容
  - 第三个参数没有写，就是没有新内容替换掉截取位置

  ```javascript
      var arr = [1, 2, 3, 4, 5]
  
      // 使用 splice 方法截取数组
      arr.splice(1, 2, '我是新内容')
  
      console.log(arr) // [1, '我是新内容', 4, 5]
  ```

  - arr.splice(1, 2, '我是新内容')` 表示从索引 1 开始截取 2 个内容
  - **splice(index,0,value) 表示在索引为index的位置添加一个数据。**
  - 然后用第三个参数把截取完空出来的位置填充

### `slice()`方法

- 不改变原数组。 
- . slice（start,end）得到的是[start,end)不包含end的数据。
  - 若只有开始索引而没有结束索引，则会从开始一直截取到结束
  - end如果为负数，表示结束的索引从后往前数
- 返回值为新的数组（截取出来的数据）

### 6、`reverse `方法

- `reverse` 是用来反转数组的

```javascript
    var arr = [1, 2, 3]

    // 使用 reverse 方法来反转数组
    arr.reverse()

    console.log(arr) // [3, 2, 1]
```

### 7、 `sort` 方法

- `sort` 方法是用来给数组排序的 （默认从小到大排序，按照字符串排序）

- 数字排序方法：给`sort()`传一个参数，这个参数是一个函数，代表怎么样进行排序。

  ```javascript
  var arr = [2, 3, 1];
  arr.sort(function(value1,value2)){
      return value1 - value2;  //从小到大（升序），若要从大到小则 value2-value1; 
  }
  alert(arr);
  ```

  

```javascript
    var arr = [2, 3, 1]

    // 使用 sort 方法给数组排序
    arr.sort()

    console.log(arr) // [1, 2, 3]

```

### 8、`concat` 方法

- `concat` 方法是把多个数组进行拼接

- 和之前的方法有一些不一样的地方，就是 `concat` 不会改变原数组，而是返回一个新的数组

  ```javascript
      var arr = [1, 2, 3]
  
      // 使用 concat 方法拼接数组
      var newArr = arr.concat([4, 5, 6])
  
      console.log(arr) // [1, 2, 3]
      console.log(newArr) // [1, 2, 3, 4, 5, 6]
  
  ```

  - 注意： **concat 方法不会改变原始数组

### 9、`join `方法

- `join` 方法是把数组里面的每一项内容链接起来，编程一个字符串

- 可以自己定义每一项之间链接的内容 `join（要用什么内容链接）`

- 不会改变原数组，而是把一个链接好的字符串返回

  ```javascript
      var arr = [1, 2, 3]
  
      // 使用 join 链接数组
      var str = arr.join('-')
  
      console.log(arr) // [1, 2, 3]
      console.log(str) // 1-2-3
  ```

  - 注意： **`jion`方法不会改变原数组，而是返回链接好的额字符串

### 10、`indexOf()`方法

- 判断数组中是否存在某个数据
- 语法： 数组.indexOf(数据)
- 返回值：存在就返回数据的索引，不存在就返回 -1 

```javascript
	var arr = [1,2,3,4,5];
    if(arr.indexOf(10) === -1 ){
        console.log("不存在")；
    }else{
        console.log("存在")；
    }
```

### 是否改变原数组汇总

- 改变原数组的：
  - shift：将第一个元素删除并且返回删除元素，空即为undefined
  - unshift：向数组开头添加元素，并返回新的长度
  - pop：删除最后一个并返回删除的元素
  - push：向数组末尾添加元素，并返回新的长度
  - reverse：颠倒数组顺序
  - sort：对数组排序
  - splice:splice(start,length,item)删，增，替换数组元素，返回被删除数组，无删除则不返回
- 不改变原数组的：
  - concat：连接多个数组，返回新的数组
  - join：将数组中所有元素以参数作为分隔符放入一个字符
  - slice：slice(start,end)，返回选定元素
  - map,filter,some,every等不改变原数组
- splice和slice的区别：
  - splice(i,j,”a”) 删除，添加元素，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。从i开始删j个(包括i),并将”a”插入到i处。
  - slice(start,end) 从某个已有的数组返回选定的元素，从start位开始返回到end（包括start不包括end）如果是负数，表示从数组尾部进行计算（同样：包括start不包括end）,请注意，该方法并不会修改数组，而是返回一个子数组。

## ES5 中常见的数组常用方法

- 之前我们讲过数组常用方法 都是 ES3的方法，接下来讲一些ES5的方法

### 1、`indexOf `方法

- `indexOf` 用来找到数组中某一项的索引

- 语法：`indexOf（idx）`

  > idx：你要找的数组中的想

  ```javascript
      var arr = [1, 2, 3, 4, 5]
  
      // 使用 indexOf 超找数组中的某一项
      var index = arr.indexOf(3)
  
      console.log(index) // 2
  
  ```

  - 我们要找的事数组中的值为 3 的那一项
  - 返回的就是值为 3 的那一项在数组中的索引

- 如果你要找的内容在数组中没有，那么就会返回 -1

  ```javascript
      var arr = [1, 2, 3, 4, 5]
  
      // 使用 indexOf 超找数组中的某一项
      var index = arr.indexOf(10)
  
      console.log(index) // -1
  ```

  - 你要找的值在书中不存在，那么久会返回 -1

### 2、`forEach` 方法

- 和 `for`循环一个作用，就是用来遍历数组的

- 语法：`arr.forEach(function(item,index,arr){})`

  ```javascript
      var arr = [1, 2, 3]
  
      // 使用 forEach 遍历数组
      arr.forEach(function (item, index, arr) {
          // item 就是数组中的每一项
          // index 就是数组的索引
          // arr 就是原始数组
          console.log('数组的第 ' + index + ' 项的值是 ' + item + '，原始数组是', arr)
      })
  
  ```

  - `forEach()`的时候传递的那个函数，会根据数组的长度执行
  - 数组的长度是多少，这个函数就会执行多少回

### 3、`map` 方法

- 和forEach 类似，只不过可以对数组中的每一项进行操作，返回一个新的数组

  ```javascript
      var arr = [1, 2, 3]
  
      // 使用 map 遍历数组
      var newArr = arr.map(function (item, index, arr) {
          // item 就是数组中的每一项
          // index 就是数组的索引
          // arr 就是原始数组
          return item + 10
      })
  
      console.log(newArr) // [11, 12, 13]
  
  ```

### 4、`filter` 方法

- 和 `map` 的使用方法类似，按照我们的条件来筛选数组
- 把原始数组中满足条件的筛选出来，组成一个鑫的数组返回

```javascript
    // 使用 filter 过滤数组
    var newArr = arr.filter(function (item, index, arr) {
    // item 就是数组中的每一项
    // index 就是数组的索引
    // arr 就是原始数组
    return item > 1
    })

    console.log(newArr) // [2, 3]
    ````
    -   我们设置的条件就是 `>-1`
	-   返回的新数组就会是原始数组中所有 `>1`的项
```

### 5、`some()`方法

- 部分满足，判断原始数组中有无满足表达式的元素，只要有一个则返回true，否则返回false。

  ```javascript
  var arr = [10, 2, 3, 4, 20, 5, 70, 50, 30, 4, 6];
  var res = arr.some(
      function (item, index) {
          return item === 60;    ==》原始数组没有60，不满足，返回false
          return item > 10;    ==》原始数组有>10的值，满足，返回true
      注意：return返回值只能写一个
      })
  console.log(res);
  ```

### 6、`every方法`
- 全部满足，表示数组中所有数据都要满足条件，才会返回true，否则只要有一个不满足都返回false。
```javascript
	var arr = [10, 2, 3, 4, 20, 5, 70, 50, 30, 4, 6];
	var res = arr.every(
    function (item, index) {
        return item > 10;    ==》有部分数据没有>10，不满足，返回false
        return item > 0;    ==》所有数据都>0，满足，返回true
    })
console.log(res);
```

### 7、`reduce累加器`
```javascript
	array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)
```
- 1.**initialValue** [ɪˈnɪʃl][ˈvæljuː] 初始值

	initialValue 表示reduce方法第一次执行时的初始值，是一个可选值。

- 2.**accumulator** [əˈkjuːmjəleɪtər] 累加器；积聚者 (pre)

	accumulator 正如翻译的那样，它是 reduce 方法多次执行的累积结果，accumulator 的初始值分两种情况：

	+ 若有提供 initialValue 初始值，第一次循环时 accumulator 的值便为 	initialValue，后续循环时 accumulator 为上次循环的返回值。

	+ 若未提供initialValue，第一次循环时 accumulator 的值为数组第一项arr[0]，后续循环时为上次循环的返回值。

- 3.**currentValue** [ˈkɜːrənt][ˈvæljuː] 当前值  (cur)

	这个应该不难理解，数组循环当前处理的值。currentValue 的初始值也受到initialValue的影响：

	+ 若有提供 initialValue 初始值，第一次循环currentValue 的值为数组第一项arr[0]，后续变化随索引递增变化。

	+ 若未提供initialValue，第一次循环由于arr[0]成了accumulator 的值，所以currentValue 只能从arr[1]开始，后续变化随索引递增。

- 4.**currentIndex**  (很少写)

	数组循环当前处理值的索引，currentValue 与 currentIndex是同步变化的。

- 5.**array** (很少写)

	当前正在被循环的数组。