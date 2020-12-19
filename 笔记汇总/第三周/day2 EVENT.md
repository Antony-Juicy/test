# EVENT（上）

- 之前我们简单的了解过一些事件，比如 `onclick` / `onload` / `onscroll` / ...
- 今天开始，我们详细的学习一些 **事件**



## 一、事件

- 事件就是浏览器响应用户操作的一个机制

### 1、事件的组成 

- 谁触发的事件：事件源 （eg:button）
- 触发什么事件：事件类型
- 触发以后做什么：事件处理函数
- 事件源.事件类型 = 事件处理函数

```javascript
var oDiv = document.querySelector('div')
oDiv.onclick = function () {}
// 谁来触发事件 => oDiv => 这个事件的事件源就是 oDiv
// 触发什么事件 => onclick => 这个事件类型就是 click
// 触发之后做什么 => function () {} => 这个事件的处理函数
```

- 我们想要在点击 div 以后做什么事情，就把我们要做的事情写在**事件处理函数**里面

```javascript
var oDiv = document.querySelector('div')

oDiv.onclick = function () {
  console.log('你点击了 div')
}
```

- 当我们点击 div 的时候，就会执行事件处理函数内部的代码
- 每点击一次，就会执行一次事件处理函数



### 2、 事件对象

- 事件对象：记录一个事件中包含的一些信息

- 就是当你触发了一个事件以后，对该事件的一些描述信息

- 例如：
  + 你触发一个点击事件的时候，你点在哪个位置了，坐标是多少
  + 你触发一个键盘事件的时候，你按的是哪个按钮

- 每一个事件都会有一个对应的对象来描述这些信息，我们就把这个对象叫做 **事件对象**

- 浏览器给了我们一个 **黑盒子**，叫做 `window.event`，就是对事件信息的所有描述

  ```javascript
  oDiv.onclick = function () {
    console.log(window.event.X轴坐标点信息)
    console.log(window.event.Y轴坐标点信息)
  }
  ```

- 这个玩意很好用，但是一般来说，好用的东西就会有 **兼容性问题**

- 在 `IE低版本` 里面这个东西好用，但是在 `高版本IE` 和 `Chrome` 里面不好使了

- 在每一个事件处理函数的行参位置，默认第一个就是 **事件对象**

- `兼容写法`

  ```javascript
  	var btn = document.querySelector('#btn');
       		// 事件对象：记录一个事件中包含的一些信息
  	btn.onclick = function (event) {
       		// 因为ie8及以下的浏览器不识别 参数 e	
       		// ie8及以下的浏览器 查看事件对象 使用 window.event
       		//如果 event存在就把 event赋值给e，如果不存在就把 window.event 赋值给 e
            var e = event || window.event; //兼容写法
            console.log(e);
        }
  ```

  

  

### 3、点击事件的`光标坐标点`获取

#### 3-1相对于你点击的元素来说

##### `offsetX` 和 `offsetY`

- `offsetX `光标在事件源上面的 水平位置 

- `offsetY` 光标在事件源上面的 垂直位置 

- 是相对于你点击的元素的边框内侧开始计算

  ```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  
    div {
      width: 300px;
      height: 300px;
      padding: 20px;
      border: 10px solid #333;
      margin: 20px 0 0 30px;
    }
  </style>
  <body>
    <div></div>
  
    <script>
      var oDiv = document.querySelector('div')
      // 注册点击事件
      oDiv.onclick = function (e) {
        // 事件对象兼容写法
        e = e || window.event
        console.log(e.offsetX)
        console.log(e.offsetY)
      }
    </script>
  </body>
  ```


#### 3-2 相对于浏览器窗口你点击的坐标点

##### `clientX` 和 `clientY`

- 是相对于**浏览器窗口**来计算的，不管你页面滚动到什么情况，都是根据窗口来计算坐标

  ```html
  
    <script>
      var oDiv = document.querySelector('div')
  
      // 注册点击事件
      oDiv.onclick = function (e) {
        // 事件对象兼容写法
        e = e || window.event
        console.log(e.clientX)
        console.log(e.clientY)
      }
    </script>
  
  ```

  

#### 3-3相对于页面你点击的坐标点

##### `pageX` 和 `pageY`

- 是相对于整个页面的坐标点，不管有没有滚动，都是相对于页面拿到的坐标点

  ```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  
    body {
      width: 2000px;
      height: 2000px;
    }
  
    div {
      width: 300px;
      height: 300px;
      padding: 20px;
      border: 10px solid #333;
      margin: 20px 0 0 30px;
    }
  </style>
  <body>
    <div></div>
  
    <script>
      var oDiv = document.querySelector('div')
  
      // 注册点击事件
      oDiv.onclick = function (e) {
        // 事件对象兼容写法
        e = e || window.event
  
        console.log(e.pageX)
        console.log(e.pageY)
      }
    </script>
  </body>
  ```

- 根据页面左上角来说

  - margin-left 是 30
  - 左边框是 10
  - 左右 padding 各是 20
  - 内容区域是 300
  - **pageX : 300 + 20 + 20 + 10 + 30 = 380**
  - margin-top 是 20
  - 上边框是 10
  - 上下 padding 各是 20
  - 内容区域是 300
  - **pageY : 300 + 20 + 20 + 10 + 20 = 270**



## 二、点击按键信息（了解）

- 我们的鼠标一般都有两个按键，一个左键一个右键
- 我们的事件对象里面也有这个信息，确定你点击的是左键还是右键
- 我们使用 `事件对象.button` 来获取信息
- button 记录鼠标的按下的键
  - `e.button = 0` 表示按下的是 左键
  - `e.button = 1 `表示按下的是中间键
  - `e.button = 2` 表示按下的是 右键



## 三、常见的事件（了解）

- 我们在写页面的时候经常用到的一些事件
- 大致分为几类，**浏览器事件** / **鼠标事件** / **键盘事件** / **表单事件** / **触摸事件**
- 不需要都记住，但是大概要知道



### 1、浏览器事件

- `load` ： 页面全部资源加载完毕
- `scroll` ： 浏览器滚动的时候触发
- `resize` :浏览器改变事件



### 2、鼠标事件

- `click` ：点击事件
- `dblclick` ：双击事件
- `contextmenu` ： 右键单击事件
- `mousedown` ：鼠标左键按下事件
- `mouseup` ：鼠标左键抬起事件
- `mousemove` ：鼠标移动
- `mouseover` ：鼠标移入事件
- `mouseout` ：鼠标移出事件
- `mouseenter` ：鼠标移入事件
- `mouseleave` ：鼠标移出事件

  



### 3、键盘事件

- `keyup` ： 键盘抬起事件
- `keydown` ： 键盘按下事件
- `keypress` ： 键盘按下再抬起事件

### 4、表单事件

- `change` : 表单内容改变事件
- `input` : 表单内容输入事件
  + `change` ：内容改变事件
- `submit` : 表单提交事件

### 5、触摸事件

- `touchstart` ： 触摸开始事件
- `touchend` ： 触摸结束事件
- `touchmove` ： 触摸移动事件

### 6、常见按键

- key 记录按下的是键
- altKey 记录按下的是否是alt键
- ctrlKey 记录按下的是否是 ctrl
- shiftKey 记录按下的是否是shift键
- keyCode  如果触发的是 keydown 和 keyup 表示 键盘字符的键盘编码
- 如果触发的时候 keypress 表示的时候 这个字符的ASCII码



### 7、确定按键

- 我们的键盘上每一个按键都有一个自己独立的编码

- 我们就是靠这个编码来确定我们按下的是哪个按键的

- 我们通过 `事件对象.keyCode` 或者 `事件对象.which` 来获取

- 为什么要有两个呢，是因为 FireFox2.0 不支持 `keycode` 所以要用 `which`

  ```javascript
  document.keyup = function (e) {
    // 事件对象的兼容写法
    e = e || window.event 
   // 获取键盘码的兼容写法
    var keyCode = e.keyCode || e.which  
    console.log(keyCode)
  }
  ```



#### 7-1 常见的键盘码（了解）

- 8： 删除键（delete）
- 9： 制表符（tab）
- 13： 回车键（ebter）
- 16： 上档键（shift）
- 17： ctrl 键
- 18： alt 键
- 27： 取消键（esc）
- 32： 空格键（space）

### 8、组合按键

- 组合案件最主要的就是 `alt` / `shift` / `ctrl` 三个按键

- 在我点击某一个按键的时候判断一下这三个键有没有按下，有就是组合了，没有就是没有组合

- 事件对象里面也为我们提供了三个属性

  - `altKey` ：alt 键按下得到 true，否则得到 false
  - `shiftKey` ：shift 键按下得到 true，否则得到 false
  - `ctrlKey` ：ctrl 键按下得到 true，否则得到 false

- 我们就可以通过这三个属性来判断是否按下了

  ```javascript
  document.onkeyup = function (e) {
    e = e || window.event
    keyCode = e.keyCode || e.which
    
    if (e.altKey && keyCode === 65) {
      console.log('你同时按下了 alt 和 a')
    }
  }
  ```

  

## 四、事件的绑定方式

### 1、on + 事件类型

- 我们现在给一个注册事件都是使用 `onxxx` 的方式 (btn.onlick = funtion(){})

- 但是这个方式不是很好，只能给一个元素注册一个事件

- 使用这种绑定事件的方式 ，一个事件源绑定同一个事件 只能绑定一次，如果多次绑定的时候，那么最后一次绑定的会把前面的**覆盖**掉 

  ```javascript
  oDiv.onclick = function () {
    console.log('我是第一个事件')
  }
  
  oDiv.onclick = function () {
    console.log('我是第二个事件')
  }
  ```

  - 当你点击的时候，只会执行第二个，第一个就没有了(后者点击，将前者覆盖)

- 使用 `addEventListener` 的方式添加

  - 这个方法不兼容，在 IE 里面要使用 `attachEvent`

### 2、事件监听

- 使用 `addEventListener` 的方式添加，这个方法不兼容，在 IE 里面要使用 `attachEvent`

- `addEventListener` :  非 IE 7 8 下使用

- 语法： `元素.addEventListener('事件类型'， 事件处理函数， 冒泡还是捕获)`

- 第三个参数默认为冒泡，即false。事件捕获为true。

  ```javascript
  oDiv.addEventListener('click', function () {
    console.log('我是第一个事件')
  }, false)
  
  oDiv.addEventListener('click', function () {
    console.log('我是第二个事件')
  }, false)
  ```

  - 当你点击 div 的时候，两个函数都会执行，并且会按照你注册的顺序执行
  - 先打印 `我是第一个事件` 再打印 `我是第二个事件`
  - 注意： **事件类型的时候不要写 on，点击事件就是 click，不是 onclick**

- `attachEvent` ：IE 7 8 下使用

- 语法： `元素.attachEvent('事件类型'， 事件处理函数)`

  ```javascript
  oDiv.attachEvent('onclick', function () {
    console.log('我是第一个事件')
  })
  
  oDiv.attachEvent('onclick', function () {
    console.log('我是第二个事件')
  })
  ```

  - 当你点击 div 的时候，两个函数都会执行，并且会按照你注册的顺序倒叙执行
  - 先打印 `我是第二个事件` 再打印 `我是第一个事件`
  - 注意： **事件类型的时候要写 on，点击事件就行 onclick**



### 3、两个方式的区别

- 注册事件的时候事件类型参数的书写
  - `addEventListener` ： 不用写 on
  - `attachEvent` ： 要写 on
- 参数个数
  - `addEventListener` ： 一般是三个常用参数
  - `attachEvent` ： 两个参数
- 执行顺序
  - `addEventListener` ： 顺序注册，顺序执行
  - `attachEvent` ： 顺序注册，倒叙执行
- 适用浏览器
  - `addEventListener` ： 非 IE 7 8 的浏览器
  - `attachEvent` ： IE 7 8 浏览器

### 4、封装一个事件监听的函数（兼容）

   ```javascript
    // 参数：事件源，事件类型，回调函数
        function addEvent(ele, type, callback) {
            if (ele.addEventListener) {
                ele.addEventListener(type, callback);
            } else {
                ele.attachEvent('on' + type, callback)
            }
        }
        addEvent(btn, 'click', fun)
	//回调函数存放点击按钮实现什么功能
        function fun() {
            console.log(11111111111);
        }

   ```

## 五、新闻提示案例

```javascript
//css
<style>
        .details {
            display: none;
            position: absolute;
            padding: 10px;
            width: 200px;
            border: 1px solid #f60;
            background-color: #ffc;
        }

        .details::before,
        .details::after {
            content: '';
            position: absolute;
            top: -20px;
            left: 15px;
            border: 10px solid transparent;
            border-bottom-color: #f60;
        }

        .details::after {
            top: -18px;
            border-bottom-color: #ffc;
        }
    </style>

<body>
    <h1>新闻提示信息</h1>
    <ul class="newslist">
        <li> <a href="#" content="小明由于调戏女老师再次被滚粗教室">教室文化</a></li>
        <li><a href="#" content="iPhone10发布,屏幕高度亮瞎了所有小伙伴">iphone10发布会</a></li>
        <li><a href="#" content="为了弘扬乐于助人的精神，中国人大开会决定授予老王“中国好邻居”称号">关于老王</a></li>
    </ul>
		//div的位置随着划过a时的鼠标而变化
    <div class="details">为了弘扬乐于助人的精神，中国人大开会决定授予老王“中国好邻居”称号</div>

	//其实只调用了一个事件监听的函数（兼容）参数：事件源，事件类型，回调函数
    <script src="js/utils.js"></script>  
    <script>
        // 获取标签 
        var aBtn = document.querySelectorAll('a');
        var details = document.querySelector('.details'); 
        //循环 给a添加事件
        aBtn.forEach(function (item) {
            // mousemove 移动事件
            addEvent(item, 'mousemove', function (e) {
                // 当移动到a标签的时候，把a标签中的content属性值赋值给 details
                // 并且details 显示
                details.style.display = 'block';
                // this 是 触发这个事件的元素 
                var text = this.getAttribute('content');
                details.innerHTML = text;

                // 让details 跟随光标移动
                var e = e || window.event;
                //把光标在 浏览器可视窗口上的坐标值给到details left 和top
                
                details.style.left = e.clientX - 20 + 'px';
                details.style.top = e.clientY + 30 + 'px';
            })

            // 移出a的时候 隐藏 details
            addEvent(item, 'mouseout', function () {
                details.style.display = 'none'
            })
        })
    </script>
</body>
```

