# Map 和 Set

- Map 和 Set 是 ES6 新增的两个数据类型
- 都是属于内置构造函数
- 使用 new 的方式来实例化使用



## Set

- 使用方式就是和 new 连用

  ```javascript
  const s = new Set()
  console.log(s)
  
  /*
  	Set(0) {}
          size: (...)
          __proto__: Set
          [[Entries]]: Array(0)
          length: 0
  */
  ```

- 就是一个数据集合

- 我们可以在 new 的时候直接向内部添加数据

  ```javascript
  // 实例化的时候直接添加数据要以数组的形式添加
  const s = new Set([1, 2, 3, {}, function () {}, true, 'hwllo'])
  console.log(s)
  
  /*
  	Set(7) {1, 2, 3, {…}, ƒ, …}
          size: (...)
          __proto__: Set
          [[Entries]]: Array(7)
          0: 1
          1: 2
          2: 3
          3: Object
          4: function () {}
          5: true
          6: "hwllo"
          length: 7
  */
  ```

- 看上去是一个类似数组的数据结构，但是不是，就是 **Set 数据结构**



### 常用方法和属性

- `size`  ： 用来获取该数据结构中有多少数据的

  ```javascript
  const s = new Set([1, 2, 3, {}, function () {}, true, 'hwllo'])
  console.log(s.size) // 7
  ```

  - 看上去是一个和数组数据类型差不多的数据结构，而且我们也看到了 length 属性
  - 但是不能使用，想要获取该数据类型中的成员数量，**需要使用 size 属性**

- `add` : 用来向该数据类型中追加数据

  ```javascript
  const s = new Set()
  s.add(0)
  s.add({})
  s.add(function () {})
  console.log(s.size) // 3
  ```

  - 这个方法就是向该数据类型中追加数据使用的

- `delete` : 是删除该数据结构中的某一个数据

  ```javascript
  const s = new Set()
  s.add(0)
  s.add({})
  s.add(function () {})
  
  s.delete(0)
  
  console.log(s.size) // 2
  ```

- `clear` ： 清空数据结构中的所有数据

  ```javascript
  const s = new Set()
  s.add(0)
  s.add({})
  s.add(function () {})
  
  s.clear()
  
  console.log(s.size) // 0
  ```

- `has` ： 查询数据解构中有没有某一个数据

  ```javascript
  const s = new Set()
  s.add(0)
  s.add({})
  s.add(function () {})
  
  console.log(s.has(0)) // true
  ```

- `forEach` : 用来遍历 Set 数据结构的方法

  ```javascript
  const s = new Set()
  s.add(0)
  s.add({})
  s.add(function () {})
  
  s.forEach(item => {
      console.log(item) // 0   {}   function () {}
  })
  ```

- 方法介绍的差不多了，有一个问题出现了，那就是

- 我们的方法要么是添加，要么是删除，要么是查询，没有获取

- 因为要获取 Set 结构里面的数据需要借助一个 `...` 展开运算符

- 把他里面的东西都放到一个数组里面去，然后再获取

  ```javascript
  const s = new Set([1, 2, 3, 4, 5, 6])
  const a = [...s]
  console.log(a) // (6) [1, 2, 3, 4, 5, 6]
  
  console.log(a[0]) // 1
  console.log([...s][0]) // 1
  ```

- 又一个问题出现了，new 的时候需要以数组的形式传递

- 然后获取的时候又要转成数组的形式获取

- 那么我为什么不一开始就定义数组，要这个 Set 数据类型干什么

- 这就不得不提到一个 Set 的特点

- **Set 不允许存储重复的数据**

  ```javascript
  const s = new Set([1, 2, 3])
  
  s.add(4)  // 此时 size 是 4
  s.add(1)  // 此时 size 是 4
  s.add(2)  // 此时 size 是 4
  s.add(3)  // 此时 size 是 4
  ```



## Map

- 也是要和 new 连用

- 是一个数据集合，是一个很类似于 对象 的数据集合

  ```javascript
  const m = new Map()
  console.log(m)
  
  /*
  	Map(0) {}
          size: (...)
          __proto__: Map
          [[Entries]]: Array(0)
          length: 0
  */
  ```

- 我们的对象中不管存储什么，key 一定是一个字符串类型

- 但是再 Map 里面，我们的 key 可以为任意数据类型

- 我们也管 Map 叫做 （值 = 值 的数据类型）

  ```javascript 
  const m = new Map([[{}, {}], [function () {}, function () {}], [true, 1]])
  console.log(m)
  
  /*
  	Map(3) {{…} => {…}, ƒ => ƒ, true => 1}
          size: (...)
          __proto__: Map
          [[Entries]]: Array(3)
          0: {Object => Object}
              key: {}
              value: {}
          1: {function () {} => function () {}}
              key: ƒ ()
              value: ƒ ()
          2: {true => 1}
              key: true
              value: 1
          length: 3
  
  */
  ```



### 常用方法和属性

- `size` ： 用来获取该数据类型中数据的个数

  ```javascript
  const m = new Map([[{}, {}], [function () {}, function () {}], [true, 1]])
  console.log(m.size) // 3
  ```

- `delete` : 用来删除该数据集合中的某一个数据

  ```javascript
  const m = new Map([[{}, {}], [function () {}, function () {}], [true, 1]])
  m.delete(true)
  
  console.log(m.size) // 2
  ```

- `set` : 用来向该数据集合中添加数据使用

  ```javascript
  const m = new Map()
  m.set({ name: 'Jack' }, { age: 18 })
  console.log(m.size) // 1
  ```

- `get` : 用来获取该数据集合中的某一个数据

  ```javascript
  const m = new Map()
  
  m.set({ name: 'Jack' }, { age: 18 })
  m.set(true, function () {})
  console.log(m.get(true)) // function () {}
  ```

- `clear` : 清除数据集合中的所有数据

  ```javascript
  const m = new Map()
  
  m.set({ name: 'Jack' }, { age: 18 })
  m.set(true, function () {})
  
  m.clear()
  
  console.log(m.size) // 0
  ```

- `has` ： 用来判断数据集合中是否存在某一个数据

  ```javascript
  const m = new Map()
  
  m.set({ name: 'Jack' }, { age: 18 })
  m.set(true, function () {})
  
  console.log(m.has(true)) // true
  ```



# jQuery

- `jQuery` 是一个前端库，也是一个方法库
- 他里面封装着一些列的方法供我们使用
- 我们常用的一些方法它里面都有，我们可以直接拿来使用就行了
- `jQuery` 之所以好用，很多人愿意使用，是因为他的几个优点太强大了
  1. 优质的选择器和筛选器
  2. 好用的隐式迭代
  3. 强大的链式编程
- 因为这些东西的出现，很多时候我们要做的事情被 “一行代码解决”
- 接下来我们就来认识一下 `jQuery`



## jQuery 的使用

- [jQuery官网](https://jquery.com/)

  - 官网是全英文的
  - 也没啥可看的，不过没事的时候可以看看了解一下

- [jQuery方法大全中文网](http://jquery.cuishifeng.cn/)

  - 这个网站可以多看看
  - 里面是 `jQuery` 的方法大全，而且是中文的

- 我们要使用 `jQuery` 首先要下载一个

  - 可以去官网下载，也可以直接百度搜索下载，都可以

- 然后就是再页面里面引入 `jQuery.js` 就行了

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <script src="./jquery/jquery.js"></script>
  </body>
  </html>
  ```

- 然后就可以开始使用了

- `jQuery` 向全局暴露的接口就是 `jQuery` 或者 `$` 都行



## 选择器和筛选器

- 选择器和筛选器就是用来帮我们获取 DOM 元素的



### 选择器

- `jQuery` 有着相当强大的选择器

  ```javascript
  // 按照 id 获取页面中的元素
  const ele = jQuery('#box') 
  const ele = $('#box')
  ```

  - 上面两个都可以按照 id 来获取元素

  ```javascript
  // 按照类名来选择
  const eles = jQuery('.a')
  const eles = $('.a')
  ```

  - 上面就是按照类名来选择元素，可以获取到一组元素

  ```javascript
  const lis = jQuery('li')
  const lis = $('li')
  ```

  - 上面就是按照标签名来获取元素，可以获取到一组元素

  ```javascript
  const eles = jQuery('ul > li')
  const eles = $('ul > li')
  ```

  - 上面就是按照选择器来获取元素，可以获取到一组元素



#### 特殊选择器

- 直接找到第一个

  ```javascript
  $('li:first') // 找到所有 li 中的第一个
  ```

- 直接找到最后一个

  ```javascript
  $('li:last') // 找到所有 li 中的最后一个
  ```

- 直接找到第几个

  ```javascript
  $('li:eq(3)') // 找到所有 li 中索引为 3 的那个
  ```

- 找到所有奇数个

  ```javascript
  $('li:odd') // 找到所有 li 中索引为 奇数 的
  ```

- 找到所有偶数

  ```javascript
  $('li:even') // 找到所有 li 中索引为 偶数 的
  ```

  

### 筛选器

- jQuery 的筛选器就是在选择器选择到一组元素以后

- 对元素进行筛选，也可以对准确的某一个元素进行判断和获取

  1. 找到所有元素中的第一个

     ```javascript
     $('li').first()
     ```

  2. 找到所有元素中的最后一个

     ```javascript
     $('li').last()
     ```

  3. 找到某一个元素的下一个兄弟元素

     ```javascript
     $('li:eq(3)').next()
     ```

  4. 找到某一个元素的上一个兄弟元素

     ```javascript
     $('li:eq(3)').prev()
     ```

  5. 找到某一个元素的后面的所有兄弟元素

     ```javascript
     $('li:eq(3)').nextAll()
     ```

  6. 找到某一个元素的前面的所有兄弟元素

     ```javascript
     $('li:eq(3)').prevAll()
     ```

  7. 找到某一个元素的父元素

     ```javascript
     $('li:eq(3)').parent()
     ```

  8. 找到某一个元素的所有结构父级，一直到 html

     ```javascript
     $('li:eq(3)').parents()
     ```

  9. 找到一组元素中的某一个

     ```javascript
     // 在 li 的所有父级里面找到所有 body 标签
     $('li').parents().find('body')
     
     // 找到 div 标签下所有后代元素中所有类名为 box 的元素
     $('div').find('.box')
     ```



## 属性操作

- 给一个元素添加某个属性

  ```javascript
  // 给 div 元素添加一个 id 属性，值是 box
  $('div').prop('id', 'box')
  // 获取 div 的 id 属性
  console.log($('div').prop('id'))
  ```

  - prop 这个方法只能添加元素自己本身就有的属性
  - 如果是添加的自定义属性，不会显示在标签上，但是可以使用

- 给一个元素添加某个自定义属性

  ```javascript
  // 给 div 添加一个 index 属性，值是 1
  $('div').attr('index', 1)
  // 获取 div 的 index 属性
  console.log($('div').attr('index'))
  ```

- 移除元素的某一个属性

  ```javascript
  // 移除元素自己本身的属性
  $('div').removeProp('id')
  // 移除元素的自定义属性
  $('div').removeAttr('index')
  ```

- 操作元素的类名

  ```javascript
  // 判断某一个元素有没有某一个 class
  $('div').hasClass('box') // true 表示该元素有 box 类名，false 表示该元素没有 box 类名
  
  // 给元素添加一个类名
  $('div').addClass('box2') // 给 div 元素添加一个 box2 类名
  
  // 移除元素的类名
  $('div').removeClass('box') // 移除 div 的 box 类名
  
  // 切换元素类名
  $('div').toggleClass('box3') // 如果元素本身有这个类名就移除，本身没有就添加
  ```

- 操作元素的内容

  ```javascript
  // 给元素的 innerHTML 赋值
  $('div').html('<span>hello world</span>')
  // 获取元素的 innerHTML
  $('div').html()
  
  // 给元素的 innerText 赋值
  $('div').text('hello world')
  // 获取元素的 innerText
  $('div').text()
  
  // 给元素的 value 赋值
  $('input').val('admin')
  // 获取元素的 value 值
  $('input').val()
  ```



## 操作样式

- jQuery 操作元素的样式就是一个方法 `css`

  ```javascript
  // 给元素设置一个 css 样式
  $('div').css('width', '100px')
  
  // 获取元素的某一个样式
  $('div').css('width')
  
  // 给元素设置一组样式
  $('div').css({
      width: '100px',
      height: '200px'
  })
  ```

  