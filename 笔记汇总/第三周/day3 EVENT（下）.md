# EVENT（下）

- 今天来聊一聊事件的执行机制

- 什么是事件的执行机制呢？

  - 思考一个问题？

  - 当一个大盒子嵌套一个小盒子的时候，并且两个盒子都有点击事件

  - 你点击里面的小盒子，外面的大盒子上的点击事件要不要执行

    ![](./assets/event传播.jpg)



## 一、事件的传播

- 就像上面那个图片一样，我们点击在红色盒子身上的同时，也是点击在了粉色盒子上
- 这个是既定事实，那么两个盒子的点击事件都会触发
- 这个就叫做 **事件的传播**
  - **当元素触发一个事件的时候，其父元素也会触发相同的事件，父元素的父元素也会触发相同的事件**
  - 就像上面的图片一样
  - 点击在红色盒子上的时候，会触发红色盒子的点击事件
  - 也是点击在了粉色的盒子上，也会触发粉色盒子的点击事件
  - 也是点击在了 body 上，也会触发 body 的点击事件
  - 也是点击在了 html 上，也会触发 html 的点击事件
  - 也是点击在了 document 上，也会触发 document 的点击事件
  - 也是点击在了 window 上，也会触发 window 的点击事件
  - 也就是说，页面上任何一个元素触发事件，都会一层一层最终导致 window 的相同事件触发，前提是各层级元素得有注册相同的事件，不然不会触发
- 在事件传播的过程中，有一些注意的点：
  1. **只会传播同类事件**
  2. 只会从点击元素开始按照 html 的结构逐层向上元素的事件会被触发
  3. 内部元素不管有没有该事件，只要上层元素有该事件，那么上层元素的事件就会被触发
- 到现在，我们已经了解了事件的传播，我们再来思考一个问题
  - 事件确实会从自己开始，到 window 的所有相同事件都会触发
  - 是因为我们点在自己身上，也确实逐层的点在了直至 window 的每一个元素身上
  - 但是到底是先点在自己身上，还是先点在了 window 身上呢
  - 先点在自己身上，就是先执行自己的事件处理函数，逐层向上最后执行 window 的事件处理函数
  - 反之，则是先执行 window 的事件处理函数，逐层向下最后执行自己身上的事件处理函数



## 二、事件执行机制

### 1、目标（`target`）

- 你是点击在哪个元素身上了，那么这个事件的 **目标** 就是什么

### 2、事件冒泡

- 就是从事件 **目标** 的事件处理函数开始，这个目标的所有父级元素同类型的事件都会被触发 ，依次向外，直到 window 的事件处理函数触发
- e.path  事件冒泡的传播路径 
- 用事件监听的形式绑定事件，第三个参数为false是事件冒泡，第三个参数的默认值是false 
- 也就是**从下向上**的执行事件处理函数

### 3、事件捕获

- 就是从 window 的事件处理函数开始，依次向内，只要事件 **目标** 的事件处理函数执行
- 也就是**从上向下**的执行事件处理函数
- 事件监听第三个参数 是true就表示事件捕获 

### 4、冒泡和捕获的区别

- 就是在事件的传播中，多个同类型事件处理函数的执行顺序不同

## 三、事件委托

- 就是把我要做的事情委托给别人来做
- 因为我们的冒泡机制，点击子元素的时候，也会同步触发父元素的相同事件
- 所以我们就可以把子元素的事件委托给父元素来做

### 1、事件触发

- 点击子元素的时候，不管子元素有没有点击事件，只要父元素有点击事件，那么就可以触发父元素的点击事件

  ```html
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <script>
    	var oUl = docuemnt.querySelector('ul')
      
      oUl.addEventListener('click', function (e) {
        console.log('我是 ul 的点击事件，我被触发了')
      })
    </script>
  </body>
  ```

  - 像上面一段代码，当你点击 ul 的时候肯定会触发
  - 但是当你点击 li 的时候，其实也会触发

### 2、target

- target 这个属性是事件对象里面的属性，表示你点击的目标

- 当你触发点击事件的时候，你点击在哪个元素上，target 就是哪个元素

- 这个 target 也不兼容，在 IE 下要使用 srcElement

  ```html
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <script>
    	var oUl = docuemnt.querySelector('ul')
      
      oUl.addEventListener('click', function (e) {
        e = e || window.event
        var target = e.target || e.srcElement
        console.log(target)
      })
    </script>
  </body>
  ```

  - 上面的代码，当你点击 ul 的时候，target 就是 ul
  - 当你点击在 li 上面的时候，target 就是 li



### 3、委托

- 这个时候，当我们点击 li 的时候，也可以触发 ul 的点事件

- 并且在事件内不，我们也可以拿到你点击的到底是 ul 还是 li

- 这个时候，我们就可以把 li 的事件委托给 ul 来做

  ```html
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <script>
    	var oUl = docuemnt.querySelector('ul')
      
      oUl.addEventListener('click', function (e) {
        e = e || window.event
        var target = e.target || e.srcElement
       
        // 判断你点击的是 li
        if (target.nodeName.toUpperCase === 'LI') {
        	// 确定点击的是 li
          // 因为当你点击在 ul 上面的时候，nodeName 应该是 'UL'
          // 去做点击 li 的时候该做的事情了
          console.log('我是 li，我被点击了')
        }
      })
    </script>
  </body>
  ```

  - 上面的代码，我们就可以把 li 要做的事情委托给 ul 来做



### 4、总结

- 为什么要用事件委托
  - 通过JS动态添加的元素，无法实现之前原有元素的点击等事件。
  - 而新加进来的 li 也是 ul 的子元素，点击的时候也可以触发 ul 的点击事件，把点击事件委托给父元素，使得**新加入的元素也能完成事件**
- 事件委托的书写
  - 元素的事件只能委托给结构父级或者再结构父级的同样的事件上
  - li 的点击事件，就不能委托给 ul 的鼠标移入事件
  - li 的点击事件，只能委托给 ul 或者在高父级的点击事件上



## 四、默认行为

- 默认行为，就是不用我们注册，它自己就存在的事情
  - 比如我们点击鼠标右键的时候，会自动弹出一个菜单
  - 比如我们点击 a 标签的时候，我们不需要注册点击事件，他自己就会跳转页面
- 这些不需要我们注册就能实现的事情，我们叫做 **默认事件**

### 1、阻止默认行为

#### `e.preventDefault()` : 非 IE 使用  

#### `e.returnValue = false` ：IE 使用

- 冒泡/捕获事件阻止

#### `e.cancelBubble = true`  取消冒泡 

#### `e.stopPropagation() ` 停止传播

####  

- 我们阻止默认事件的时候也要写一个兼容的写法

  ```html
  <a href="https://www.baidu.com">点击我试试</a>
  <script>
  	var oA = document.querySelector('a')
    
    a.addEventListener('click', function (e) {
      e = e || window.event
      
      console.log(this.href)
      
      e.preventDefault ? e.preventDefault() : e.returnValue = false
    })
  </script>
  ```

  - 这样写完以后，你点击 a 标签的时候，就不会跳转链接了
  - 而是会在控制台打印出 a 标签的 href 属性的值
## 五、案例
### 1、拖拽及实现回放功能案例
```javascript
<script>
        // 【1】鼠标在h2标签按下，在window中移动的时候让这个盒子跟随一起移动
        // 【2】在移动的过程中 Drag的状态需要改变
        // 【3】把响应的坐标值 写入 offsetLeft 和 offsetTop
        // 【4】点击回放(a标签)的时候，把原来移动的路径重复移动一遍

        // 获取需要的元素
        var box = document.querySelector('#box');  //整个box
        var h2 = document.querySelector('#box h2'); //头部h2
        var btn = document.querySelector('#box h2 a');  //回放轨迹的a
        var drag = document.querySelectorAll('#box p span')[0];  //记录拖动状态
        var offsetLeft = document.querySelectorAll('#box p span')[1]; //记录左偏移量
        var offsetTop = document.querySelectorAll('#box p span')[2]; //记录上偏移量
        // 存放盒子移动路径 【注意点1】(在外部创建arr，内部创建obj，把obj添加到数组中，这样后面就可以用arr.length获取最后一个数据)
        var arr = [];

        // 给h2绑定鼠标按下事件
        h2.onmousedown = function (event) {
            var event = event || window.event;
            // 【注意点2】获取按下时候鼠标在元素上的位置（若x = e.clientX - h2.offsetWidth / 2;鼠标就会一直在h2的中间）
            var ox = event.offsetX;
            var oy = event.offsetY;
            // 在window中绑定移动事件
            window.onmousemove = function (e) {
                var e = e || window.event;
                drag.innerHTML = true;
                //得到光标的位置
                var x = e.clientX - ox;
                var y = e.clientY - oy;
                //把盒子移动的路径存起来
                var obj = {};
                obj.x = x;
                obj.y = y;
                arr.push(obj);
                box.style.left = x + 'px';
                box.style.top = y + 'px';
                offsetLeft.innerHTML = x;
                offsetTop.innerHTML = y;
            }
        }

        // 点击回放 重新执行一遍之前的路径
        btn.onmousedown = function (e) {
            var e = e || window.event;
            e.cancelBubble = true;
            //【注意点3】index用于停止定时器，而left的值从数组的第一个对象开始。
            var index = 0
            var timer = setInterval(function () {
                box.style.left = arr[index].x + 'px';
                box.style.top = arr[index].y + 'px';
                index++;
                // 停止定时器 index >= arr.length 就停止定时器
                if (index >= arr.length) {
                    clearInterval(timer);
                    // 【注意点4】当回放就完成 那么就清空数组里面的数据，不然会从初始位置开始回放那个，而不是每段开始位置回放
                    arr = [];
                }
            }, 10);
        }
        // 在window中抬起鼠标之后，移动事件停止
        window.onmouseup = function () {
            window.onmousemove = null;
            drag.innerHTML = false
        }
```

### 2、下拉菜单案例
```javascript
 <script>
        /*
            实现的功能：
                【1】搜索框获取焦点的时候 显示下拉下单
                    【1】获取元素
                【2】搜索框失去焦点时候 隐藏下拉菜单
                一下两个功能只有在获取焦点的时候才会有用
                【3】按下鼠标的上下键 可以动态选中 li元素（给li元素添加 active 这个class名）
                【4】当按下 enter键的时候，把拥有 activeclass名的元素的内容 赋值给搜索框
         */

        // 获取元素
        var keyword = document.querySelector('#keyword');  //下拉的input
        var list = document.querySelector('.list');  //ul
        var lis = list.querySelectorAll('li');  

        // 定义li高亮的索引
        var index = 0;

        // 点击(获取焦点) keyword 显示 list元素
		//【注意点1】这里使用的是keyword.onclick，而不是keyword.onfocus。因为下面有window点击事件，如果用focus则无法阻止冒泡事件
        keyword.onclick = function (e) {
            var e = e || window.event;
            //【注意点1-1】点击这个下拉input的时候，阻止事件冒泡，如果不阻止会把window的点击事件触发
            e.cancelBubble = true;
            list.style.display = 'block';
            lis[index].classList.add('active');
            // 当list显示的时候，键盘按下上下键的可以切换li的高亮
            keyword.onkeydown = function (event) {
                var event = event || window.event;
                // 鼠标按下上键
                if (event.keyCode === 38) {
                    index--;
                    //【注意点2】当小于0的时候回到最下面的li
                    if (index < 0) {
                        index = lis.length - 1;
                    }
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].classList.remove('active');
                    }
                    lis[index].classList.add('active');
                    //鼠标按下下键 
                } else if (event.keyCode === 40) {
                    index++;
                    //【注意点2-2】当到最后一个li时回到第一个li
                    if (index >= lis.length) {
                        index = 0;
                    }
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].classList.remove('active');
                    }
                    lis[index].classList.add('active');
                } else if (event.keyCode == 13) {
                    // 把有className 为 active的元素的内容赋值给 keyword
                    var res = document.querySelector('.active');
                    keyword.value = res.innerHTML;
                    // 隐藏list元素
                    list.style.display = 'none';
                }
            }
        }

        // 点击list中的li时候把当前的li内容赋值给 keyword
        list.onclick = function (e) {
            var e = e || window.event;
            keyword.value = e.target.innerHTML;
        }

        // 点击window的时候隐藏 list
        window.onclick = function () {
            list.style.display = 'none'
        }

    </script>
```