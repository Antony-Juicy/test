# 函数（下）

## 一、递归

- 函数可以自己调用自己, 成为函数的递归调用

  递归调用的过程:

  1. 首先去找临界值，即无需计算，获得的值(一般是返回该值)。
  2. 找这一次和上一次的关系(一般从后往前找)
  3. 假设当前函数已经可以使用，调用自身计算上一次的运行结果，再写出这次的运行结果。

  > 注意点：
  > 1、递归函数中必须有跳出条件
  > 2、避免死递归



```javascript
function show(num){
	num--;
	// 当条件不满足的时候，跳出递归函数执行
	if(num<=0){
		return;
	}
	console.log(num);
	// 递归调用
	show(num);
	console.log(num);
}
show(5);
```

**【案例】封装一个函数，利用递归求5的阶乘**

```javascript
function fac(num){
	// 跳出条件
	if(num<=1){
		return 1;
	}
	// 递归计算阶乘
	return num*fac(num-1);
}
var res = fac(5);
```



## 二、函数中的this

 函数中的this是一个关键字，表示当前对象（而当前对象是谁，取决于这个函数的执行环境）

> 指向
>
> - 手动执行：window(全局作用域)
> - 事件驱动：绑定是事件的元素



## 三、回调函数

> 把函数作为参数 当成 函数的实参 

## 四、常见事件

- 鼠标事件
         - onclick---点击事件（单击事件），onmousedown+onmouseup组合
         - onmousedown---鼠标按下事件
         - onmouseup---鼠标抬起事件
         - ondblclick---双击事件，两次单击事件组成
- input 事件

         - oninput---表单输入事件,当在input元素输入值的时候触发
        
         - onchange---input内容改变事件，input的内容必须有所变化，并且要失去焦点的时候才会触发改变事件
        
         - onblur---失去焦点的事件，当input失去焦点的时候执行一个事件
        
         - onfocus---获取焦点事件 
         - css:autofocus自动获取焦点        js：num.focus() 

     
```javascript
//input事件案例：总价随商品个数变化
<body>
    价格：<span id="price">998</span>
    <br>
    数量：<input type="number" id="num" value="0" min="0">
    <br>
    总价：<span id="total">0</span>
    <script>
        // 当数量的在变化，需要获取 数量 * price 把这个值赋值给 total

        num.oninput = function () {
            // console.log(num.value);
            // console.log(price.innerHTML);
            total.innerHTML = num.value * price.innerHTML;
        }
    </script>
</body>
```

- 浏览器事件
         **- onload---等所有的资源都加载完成之后才会去执行的事件**
         - onscroll---滚动条滚动事件

         - onresize---浏览器可是窗口大小改变事件

## 五、案例

### 1、点击切换class名案例

- 通过js给元素添加class名
   - 语法：元素.className = 'class名' 
   -  btn1.className = 'active';
- 把btn2的class名去掉，实际上就是用 '' 覆盖原来的class名 btn2.className = '';
- 通过标签名来获取元素 
   - 获取到页面中所有的button元素，返回的是 **元素的集合**
   - var btn = document.getElementsByTagName('button'); //通过标签名获取元素
   - 如果想要拿到集合中某个元素 ，通过集合的**索引**来获取
```javascript
 var btn = document.getElementsByTagName('button');
        // btn.length btn这个集合中有的元素的长度
        // 通过循环给集合中每个元素绑定点击事件 
        for (var i = 0; i < btn.length; i++) {
            btn[i].onclick = function () {
                // 给点击的这个元素添加class名
                // 点我们手动点击按钮的时候，那么for已经结束 ，i =4
                // 没有索引为4 的这个元素
                // console.log(btn[i]); undefined 
                // btn[i] = btn[4]
                // btn[i].className = 'active';


                // 排他思想：其他元素都没有，只有当前点击的元素有
                // 先清空素有元素的class名，再给当前点击的元素 添加
                for (var j = 0; j < btn.length; j++) {
                    btn[j].className = ''
                }

                // this 指向就是当前点击的这个元素
                this.className = 'active';
            }
        }
```

### 2、用js给元素添加样式

```javascript
<div id="div1">1233</div>
    <script>
        // 通过元素的id名来获取元素
        //  document.getElementById('id名');

        var div1 = document.getElementById('div1');
        // 语法：元素.style.css属性 = css属性值
        div1.style.width = '200px';
        div1.style.height = '200px';
        div1.style.background = 'red';
        // 如果css属性是由多个单词组成的，那么第二个单词首字母为大写
        // css:font-size
        // js：fontSize
        div1.style.fontSize = '30px'

    </script>
```

###  3、tab切换

```javascript

<script>
        // 获取 button元素，然后循环绑定点击事件
        var btn = document.getElementsByTagName('button');

        // 获取 li元素
        var lis = document.getElementsByTagName('li');

        for (var i = 0; i < btn.length; i++) {

            // btn[i] = i 
            // console.log(btn[i].index);
            // 给每个元素绑定一个 index属性，index属性的属性值 为这个元素的索引
            btn[i].idx = i;

            btn[i].onclick = function () {
                // 通过循环把button元素的class都去掉
                for (var j = 0; j < btn.length; j++) {
                    btn[j].className = '';
                }

                // this指向当前点击的这个元素
                this.className = 'active';
                // console.log(this.index);
                // 显示点击元素 显示 lis这个集合中 对应 索引的元素
                // 获取点击这个元素的索引值 this.index
                // console.log(this.index);

                // 把所有li隐藏
                for (var k = 0; k < lis.length; k++) {
                    lis[k].style.display = 'none';
                }
                lis[this.idx].style.display = 'block';

            }
        }
    </script>
    
```








































