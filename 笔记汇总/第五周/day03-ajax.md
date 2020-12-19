# ajax
## 1.概念：

- AJAX = Async  JavaScript and XML（异步的 JavaScript 和 XML）。
- **概念：**AJAX 不是新的编程语言，而是一门**异步的用于发送http请求的技术**
-  **简单说明：**ajax这个概念是由 Jesse James garret（杰西·詹姆斯·加勒特 ）在2005年发明的。它本身不是单一的技术，而是一串技术的集合
- **技术说明：**通常情况，每次提交的表单的时候，都会刷新这个页面，而使用ajax发送请求可以实现 异步发送请求获取数据而不需要刷新这个页面

## 2.ajax的优点

- 无需刷新页面 （如果不使用ajax,form表单发送请求，会跳到相应的php文件，结果只能在php页面。ajax直接把结果返回到前端页面）
- 按需加载，减轻服务器的压力（不刷新页面的情况下，更新局部内容）
- 实时更新（实时数据请求）
- 提高用户体验（新的数据直接显示在前端页面）

## 3.应用步骤:deciduous_tree: 

- 在 js 中有内置的构造函数来创建 ajax 对象
- 创建 ajax 对象以后，我们就使用 ajax 对象的方法去发送请求和接受响应

### 【1】创建一个异步请求对象

- 使用js中内置构造函数 XMLHttpRequest 来创建**ajax对象**

- 所有现代浏览器均支持 XMLHttpRequest 对象,但是 ie5 和ie6不支持

- 创建语法：

  ``` javascript
  // ie5 和ie6以外的所有浏览器创建方式
  let xmlhttp = new XMLHttpRequest();
  
  //ie5 和 ie6浏览器创建
  let xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  ```

### 【2】连接服务器

- 需要跟我需要请求数据存放的服务器进行连接

- `xmlhttp.open('methon','url',async）`
  - methon:请求的类型 ，GET或者POST...
  - url:数据请求的地址
  - async:true（异步）或 false（同步） （一般不去改默认值，都为true异步）

### 【3】发送请求

- `xmlhttp.send()`

- 一个最基本的 ajax 请求就是上面三步

- 但是光有上面的三个步骤，我们确实能把请求发送的到服务端

- 如果服务端正常的话，响应也能回到客户端

- 但是我们拿不到响应

- 如果想拿到响应，我们有两个前提条件

  1. 本次 HTTP 请求是成功的，也就是我们之前说的 http 状态码为 200 ~ 299
  2. ajax 对象也有自己的状态码，用来表示本次 ajax 请求中各个阶段

  

### 【4】接收服务器返回来的响应

- 如果想要拿到服务器返回的响应，需要涉及到 三个 ajax对象的三个几个属性和方法
  - `readyState  `  ajax状态码
  - `onreadystatechange ` 事件
  - `status http` 状态码
  - `responseText `  存储服务端返回的响应体

#### （1）`onreadystatechange `事件

- 在 ajax 对象中有一个事件，叫做 `readyStateChange` 事件
- 这个事件是专门用来**监听** ajax 对象的 `readyState` 值改变的的行为
- 也就是说只要 `readyState` 的值发生变化了，那么就会触发该事件
- 所以我们就在这个事件中来监听 ajax 的 `readyState` 是不是到 4 了

#### （2）ajax 状态码

- `readyState `:存有 XMLHttpRequest 的状态。从 0 到 4 发生变化 
  - `readyState === 0`：  表示未初始化完成，也就是 `open` 方法还没有执行
  - `readyState === 1`：  表示配置信息已经完成，也就是执行完 `open` 之后
  - `readyState === 2`：  表示 `send` 方法已经执行完成
  - `readyState === 3`：  表示正在解析响应内容
  - `readyState === 4`：  表示响应内容已经解析完毕，可以在客户端使用了

- 这个时候我们就会发现，当一个 ajax 请求的全部过程中，只有当 `readyState === 4` 的时候，我们才可以正常使用服务端给我们的数据
- 所以，配合 http 状态码为 200 ~ 299 
  - 一个 ajax 对象中有一个属性叫做 `xhr.status` 
  - 这个成员就是记录本次请求的 http 状态码的
- 两个条件都满足的时候，才是本次请求正常完成

```javascript
xmlhttp.onreadystatechange=function(){
    //使用正则判断是不是2开头，而不单单是200.
    
    // if(/^2\d{2}$/.test(xmlhttp.status)&& xmlhttp.readyState==4)
  	if (xmlhttp.readyState==4 && xmlhttp.status==200){
    }
 }

//xhr.onload方法
xmlhttp.onload = function(){
    //（3）拿到服务器返回的数据
    let res = xmlhttp.responseText;
    //转化为JS格式
    res = JSON.parse(res);
}
```

#### （3）接收服务器返回的数据

- ajax 对象中的 `responseText` 属性
- 就是用来记录服务端给我们的响应体内容的
- 所以我们就用这个成员来获取响应体内容就可以

```javascript
xmlhttp.onreadystatechange=function(){
  	if (xmlhttp.readyState==4 && xmlhttp.status==200){
   		console.log(xmlhttp.responseText)
    }
 }
```

#### 步骤汇总:shell: 

```javascript
 <script>
     //【1】创建ajax请求对象
        let xhr = new XMLHttpRequest();
     //【2】连接服务器
			//【2-1】若是get请求
        xhr.open('get','/api?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E6%89%8B%E5%B7%A5DIY&start=24&_=1598384754924');
  	 //【3】发送请求 
        xhr.send();
	 //【4】接收响应的数据    
        xhr.onload = function(){
            let res = JSON.parse(xhr.responseText);
            // console.log(res.data.object_list);
            res = res.data.object_list;
          console.log(res);
        }
        
        //【2-2】若是post请求(详见## 5)
        // open之后要设置请求头
        // 告诉一下服务端我给你的是一个什么样子的数据格式
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        // 发送请求需要携带参数
        xhr.send('携带的参数');            
        
    </script>

```



## 4.异步和同步

### 【1】简单程序的同步和异步

- 同步：简单来说就是 从上到下一行一行的代码执行，必须执行完前面的代码才可以执行后面的代码，如果前面的某一条代码出错了，后面的代码就不会再执行了

  ![同步](同步.PNG)

  缺点：如果一个程序需要执行时间太久，后续代码等待时间过长

- 异步：不会像同步那样从上到下执行代码，有可能同时执行两条或者一条以上的程序，也就是说当浏览器在执行某个程序的时候，也可以同时执行其他的程序

  ![异步](异步.PNG)

  缺点：拿不到异步程序的结果

### 【2】ajax的同步和异步

- 当 xmlhttp.open() 中的第三个参数为 true的时候表示异步，当参数为 false的时候 表示同步



## 5.使用 ajax 发送请求时携带参数

- 我们使用 ajax 发送请求也是可以携带参数的
- 参数就是和后台交互的时候给他的一些信息
- 但是携带参数 get 和 post 两个方式还是有区别的

### 【1】发送一个带有参数的 get 请求

get 请求的参数就直接在 url 后面进行拼接就可以

```javascript
const xhr = new XMLHttpRequest()
// 直接在地址后面加一个 ?，然后以 key=value 的形式传递
// 两个数据之间以 & 分割
xhr.open('get', './data.php?a=100&b=200')

xhr.send()
```

- 这样服务端就能接受到两个参数
- 一个是 a，值是 100
- 一个是 b，值是 200



### 【2】发送一个带有参数的 post 请求:deciduous_tree: 

- post 请求的参数是携带在请求体中的，所以不需要再 url 后面拼接

```javascript
const xhr = new XMLHttpRequest()
xhr.open('post', './data.php')

// 如果是用 ajax 对象发送 post 请求，必须要先设置一下请求头中的 content-type
// 告诉一下服务端我给你的是一个什么样子的数据格式
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

// 请求体直接在 send 的时候写在 () 里面就行
// 不需要问号，直接就是 'key=value&key=value' 的形式
xhr.send('a=100&b=200')
```

- `application/x-www-form-urlencoded` 表示的数据格式就是 `key=value&key=value`



## 6.同源策略

- **同源策略是由浏览器给的**
- 是浏览器提供的一种网络安全措施
- 浏览器不允许我们向别人发送请求，只能向自己的服务器发送请求
- 当我们想向别人的服务器发送请求的时候，就会被浏览器阻止了
- 什么是 “别人的服务器” 呢？
  - **当 请求协议/域名/端口号 有任意一个不同的时候，那么就算是别人的服务器**
  - 这个时候就会触发同源策略
- 我们管触发了 **同源策略** 的请求叫做跨域请求



## 7.实现一个跨域请求

- 有的时候我们是需要实现跨域请求的
- 我们需要多个服务器给一个页面提供数据
- 那么这个时候我们就要想办法解决跨域问题
- 同源策略只会限制**浏览器**的请求，不会限制**服务端**的请求。

### 【1】JSONP

- `jsonp` 是我们实现跨域请求的手段，是把我们之前的东西组合在一起使用的技术手段而已
- 在HTML中有一些元素不受同源策略的影响，如
  + `script`标签，以JS数据类型返回
  + `link`标签，以css格式返回
  + `img`
  + `iframe`以HTML结构形式返回。
- 利用的是 script 标签来实现



#### （1）script 标签的本质

- 浏览器给我们提供了一个 `script` 标签
- 它的本质就是请求一个外部资源，是不受到同源策略的影响的
- 同时 `script` 标签的 `src` 属性，也是一种请求，也能被服务器接收到
- 并且：
  - **script标签的src属性请求回来的东西是一个字符串，浏览器会把这个字符串当作 js 代码来执行**
- 所以我们就可以利用这个 `script` 标签的 `src` 属性来进行跨域请求了

 #### （2）JSONP代理流程

- 声明一个函数，这个函数有一个形参（会拿到想要下载的数据）
- 下载数据时，动态创建`script`标签，src链接设置为下载数据的链接。
- 当`script`插入到页面上，就会调用已经封装好的函数，将需要的数据传过来。

```javascript
//（1）声明一个函数
<script>
    function fun(res){
    
}   
 </script>
//（2）（3）这里就调用封装好的函数
<script src ='请求数据的那个地址？cb=函数名'> </script>
```



### 【2】配置代理（了解）

- 代理，分成两种，正向代理和反向代理



#### （1）正向代理（几乎不用，服务器压力过大）

- 有一个客户端需要向一个非同源的服务器B发送请求
- 我们搭建一个和客户端同源的服务器A
- 当客户端发送请求的时候，由服务器A来接受
- 再由服务器A向服务器B发送请求，因为 **同源策略是由浏览器给的**，服务器之间没有
- 服务器B接受到请求以后，会处理请求，并把响应返回给服务器A
- 再由服务器A把响应给到客户端就可以了
- 我们就可以用这个方式来进行跨域请求了



#### （2）反向代理

- 反向代理一般是用来做负载均衡的
- 当我请求一个服务器的时候，其实请求的是服务器端设置的代理服务器
- 由代理服务器把若干大量的请求分发给不同的服务器进行处理
- 再由服务器把响应给到代理服务器
- 代理服务器返回给客户端
- 反向代理的优点：负载均衡 和 网络安全

#### （3）反向代理步骤

- 【1】更改要请求跨域的地址（网站）的配置文件（哪个域要求接口就哪个域配置）。

  + 【1-1】设置===》文件位置===》Nginx===》conf===》vhosts===》找到对应的域名的配置文件

- 【2】添加

  ```javascript
  //【2-1】这个关键字（/api）可以自己命名，但是一定要有/
  location /api{
      proxy_pass '代替的这个目标地址（代理地址）';
  }
  //【2-2】？之前的是代理地址，？之后的是参数，参数不需要代理（协议、域名、端口号）。
  ```

- 【3】重启服务器

## 8、堆糖瀑布流案例:deciduous_tree: 

### 遇见问题及解决方法

#### 1、图片防盗问题（403）

- （1）在HTML头部添加` <meta name="referrer" content="no-referrer">`(推荐)
- （2）在配置文件中添加（此方法待补充，未拿到婧姐的配置文件）
#### 2、重定向过多问题
- 解决：在配置文件中将要求注释的代码恢复。

#### 3、点击会下载PHP文件的问题
- 解决：在配置文件中添加一段代码（待添加）


```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <!--【注意点】 解决图片防盗问题 -->
  <meta name="referrer" content="no-referrer">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    ul,
    li {
      list-style: none;
    }

    a,
    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .box {
      width: 1200px;
      margin: 0 auto;
    }

    ul {
      width: 260px;
      float: left;
      margin-right: 30px;
    }

    ul>li {
      width: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid #333;
      margin-top: 10px;
    }

    ul>li>.imgBox {
      width: 100%;
    }

    ul>li>.contentBox {
      height: 160px;
      box-sizing: border-box;
      padding: 10px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    ul>li>.contentBox>p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    ul>li>.contentBox>p:nth-child(1) {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      height: 40px;
      overflow: hidden;
    }

    ul>li>.contentBox>p:nth-child(2)>i {
      width: 10px;
      height: 10px;
      background-color: #bbb;
    }

    ul>li>.contentBox>p:nth-child(2)>span {
      color: #bbb;
      padding: 0 10px;
    }

    ul>li>.contentBox>p:nth-child(3)>span:nth-child(1) {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      overflow: hidden;
    }

    ul>li>.contentBox>p:nth-child(3)>span:nth-child(2) {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
    }

    ul>li>.contentBox>p:nth-child(3) .msg {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      height: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
    }
  </style>
</head>

<body>
  <div class="box">
    <ul></ul>
    <ul></ul>
    <ul></ul>
    <ul></ul>
  </div>

  <script> 
     /* 
            1、封装请求数据函数（ajax）
            2、渲染数据函数（渲染时判断哪个ul最短，添加到最短的ul）
            3、滚动条滚动事件，重新获取数据。实时更新。
    */
      
    // 请求数据，把得到结果循环渲染到ul结构中
    // 到底往哪个ul中添加数据，找到这4个ul中高度最小的元素
    // 往高度最小的这个ul中添加数据

    // 获取ul元素
    let uls = document.querySelectorAll('.box>ul');
    let num = 0; //获取数据条数
    let flag = true;
    //获取数据
    getData();

    // 设置滚动条滚动事件
    window.onscroll = function () {
      let y = scrollY + innerHeight;
      let minUl = uls[0];
      for (let i = 0; i < uls.length; i++) {
        if (uls[i].offsetHeight < minUl.offsetHeight) {
          minUl = uls[i];
        }
      };
      if (y + 100 >= minUl.offsetHeight) {
        //【注意点1】 如果flag  === true的时候，那么表示可以请求数据
        if (flag == true) {
          // flag == false 表示正在请求数据，下一次需要等我请求完后才能请求
          flag = false;
          getData();
        }
      }
    }

    function getData() {
      let xhr = new XMLHttpRequest();
        //【注意点2】地址的时间戳可以改为当前时间
      xhr.open('get', `/api?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=手工DIY&start=${num}&_=` + new Date().getTime());
      xhr.send();

      xhr.onload = function () {
        // 获取数据成功
        let res = JSON.parse(xhr.responseText);
        // 下一次请求的 start的值
        //【注意点3】num表示从数据中取出渲染页面的数据条数
        num = res.data.next_start;
        render(res.data.object_list);
        // 当数据渲染之后，那么说明这次的请求已经完成，可以进行下一次请求
        flag = true;
      }
    }

    function render(data) {
      data.forEach(item => {
        let str = `<li>
        <div class="imgBox">
          <a href="javascript:;">
            <img src="${item.photo.path}" alt="">
          </a>
        </div>
        <div class="contentBox">
          <p>${item.msg}</p>
          <p>
            <i></i>
            <span>${item.buyable}</span>
            <i></i>
            <span>${item.favorite_count}</span>
          </p>
          <p>
            <span>
              <a href="javascript:;">
                <img src="${item.sender.avatar}"
                  alt="">
              </a>
            </span>
            <span>
              <strong>${item.sender.username}</strong>
              <span>发布到 <strong class="msg">${item.album.name}</strong></span>
            </span>
          </p>
        </div>
      </li> `;
        // 【注意点4】获取ul高度最小的元素
        let minUl = uls[0];
        for (let i = 0; i < uls.length; i++) {
            //【注意点5】offsetHeight不要漏掉
          if (uls[i].offsetHeight < minUl.offsetHeight) {
            minUl = uls[i];
          }
        };
        minUl.innerHTML += str;
      })
    }
  </script>
</body>

</html>
```

