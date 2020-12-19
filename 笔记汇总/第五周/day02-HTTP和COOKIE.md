# http 和 cookie

## 1.HTTP

- `http` 是我们前后台交互的时候的传输协议（即超文本传输协议）

### 【1】HTTP 的工作流程

1. 和服务器建立链接
2. 建立链接后，发送一个请求给服务器（请求）
3. 服务器接受到请求以后进行相应的处理并给出一个回应（响应）
4. 断开于服务器的链接 

#### （1）和服务器建立链接

- 怎么和服务器建立链接呢？

- 需要保证客户端的接受和发送正常，服务器端的接受和发送正常

- 这里就涉及到一个东西叫做 `TCP/IP` 协议

- 建立链接的主要步骤叫做 `三次握手`

  1. 客户端发送一个消息给到服务端

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     ```

  2. 服务端回给客户端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     ```

  3. 客户端再回给服务端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     	服务端知道了 服务端可以正常发送消息
     	服务端知道了 客户端可以正常接受消息
     ```

- 至此，依照 `TCP/IP` 协议的建立链接就建立好了

- 双方都知道双方可以正常收发消息

- 就可以进入到第二步，通讯了

  ![三次握手](三次握手.PNG)

#### （2）发送一个请求

- 建立完链接以后就是发送请求的过程

- 我们的每一个请求都要把我们的所有信息都包含请求

- 每一个请求都会有一个 `请求报文`

- 在 `请求报文` 中会包含我们所有的请求信息（也就是我们要和服务端说的话都在里面）

- 我们的请求报文中会包含几个东西

  1. 请求行

     ```shell
     POST /user HTTP/1.1
     # POST 请求方式
     # /user 请求URL（不包含域名）
     # HTTP/1.1 请求协议版本
     ```

  2. 请求头（请求头都是键值对的形式出现的）

     ```shell
     user-agent: Mozilla/5.0 # 产生请求的浏览器信息
     accept: application/json # 表示客户端希望接受的数据类型
     Content-Type: application/x-www-form-urlencoded # 客户端发送的实体数据格式
     Host: 127.0.0.1 # 请求的主机名（IP）
     ```

  3. 请求空行（请求头和请求主体之间要留一个空白行）

     ```shell
     # 就是一个空行
     ```

  4. 请求体（本次请求携带的数据）

     ```shell
     # GET 请求是没有请求体数据的
     # POST 请求才有请求体数据
     ```

- 接下来看一个完整的请求报文

  ```shell
  POST /user HTTP/1.1      # 请求行
  Host: www.user.com
  Content-Type: application/x-www-form-urlencoded
  accept: application/json
  User-agent: Mozilla/5.0.     # 以上是首部
  #（此处必须有一空行）  # 空行分割header和请求内容 
  name=world   # 请求体
  ```

  

#### （3）接受一个响应

- 客户端的请求发送到服务端以后

- 服务端进行对应的处理

- 会给我们返回一个响应

- 每一个响应都会有一个 `响应报文`

- 在 `响应报文` 中会包含我们所有的响应信息（也就是服务端在接受到客户端请求以后，给我们的回信）

- 我们的 `响应报文` 中会包含几个信息

  1. 状态行

     ```shell
     HTTP/1.1 200 OK
     # HTTP/1.1 服务器使用的 HTTP 协议版本
     # 200 响应状态码
     # OK 对响应状态码的简单解释
     ```

  2. 响应头

     ```shell
     Date: Jan, 14 Aug 2019 12:42:30 GMT # 服务器时间
     Server: Apache/2.4.23 (Win32) OpenSSL/1.0.2j PHP/5.4.45 # 服务器类型
     Content-Type: text/html # 服务端给客户端的数据类型
     Content-Length: 11 # 服务端给客户端的数据长度
     ```

  3. 响应体

     ```shell
     hello world
     # 服务端给客户端的响应数据
     ```



#### （4）断开与服务端的链接

- 之前我们的建立链接是基于 `TCP/IP` 协议的 `三次握手`
- 我们的断开链接是基于 `TCP/IP` 协议的 `四次挥手`
  1. 客户端发送一个我要断开的消息给服务端
  2. 服务端接受到以后发送一个消息告诉客户端我已经进入关闭等待状态
  3. 服务端再次发送一个消息告诉客户端，这个是我的最后一次消息给你，当我再接受到消息的时候就会关闭
  4. 客户端接受到服务端的消息以后，告诉服务器，我已经关闭，这个是给你的最后一个消息

![四次挥手](四次挥手.png)



#### （5）总结：完成一个 HTTP 请求

- 至此，一个 HTTP 请求就完整的完成了
- 一个 HTTP 请求必须要包含的四个步骤就是
  1. 建立链接
  2. 发送请求
  3. 接受响应
  4. 断开链接
- 在一个 HTTP 请求中，请求的部分有请求报文，接受响应的部分有响应报文
- 请求报文包含
  1. 请求行
  2. 请求头
  3. 请求空行
  4. 请求体
- 响应报文
  1. 状态行
  2. 响应头
  3. 响应体

### 【2】常见的 HTTP 响应状态码

- 在一个 HTTP 请求的响应报文中的状态行会有一个响应状态码
- 这个状态码是用来描述本次响应的状态的
- 通常会出现五种状态码
  1. 100 ~ 199
  2. 200 ~ 299
  3. 300 ~ 399
  4. 400 ~ 499
  5. 500 ~ 599

#### （1）100 ~ 199

- 一般我们看不到，因为表示请求继续

- 100：  继续请求，前面的一部分内容服务端已经接受到了，正在等待后续内容
- 101： 请求者已经准备切换协议，服务器页表示同意



#### （2）200 ~ 299

- 2 开头的都是表示成功，本次请求成功了，只不过不一样的状态码有不一样的含义（语义化）
- 200： 标准请求成功（一般表示服务端提供的是网页）
- 201： 创建成功（一般是注册的时候，表示新用户信息已经添加到数据库）
- 203： 表示服务器已经成功处理了请求，但是返回的信息可能来自另一源
- 204： 服务端已经成功处理了请求，但是没有任何数据返回



#### （3）300 ~ 399

- 3 开头也是成功的一种，但是一般表示重定向
- 301： 永久重定向
- 302： 临时重定向
- 304： 使用的是缓存的数据
- 305： 使用代理



#### （4）400 ~ 499

- 4 开头表示客户端出现错误了
- 400： 请求的语法服务端不认识
- 401： 未授权（你要登录的网站需要授权登录）
- 403： 服务器拒绝了你的请求
- 404： 服务器找不到你请求的 URL
- 407： 你的代理没有授权
- 408： 请求超时
- 410： 你请求的数据已经被服务端永久删除



#### （5）500 ~ 599

- 5 开头的表示服务端出现了错误
- 500： 服务器内部错误
- 503： 服务器当前不可用（过载或者维护）
- 505： 请求的协议服务器不支持 

### 【3】常见的 HTTP 请求方式

- 每一个 HTTP 请求在请求行里面会有一个东西叫做请求方式
- 不同的请求方式代表的含义不同
  1. GET： 一般用于获取一些信息使用（获取列表）
  2. POST： 一般用于发送一些数据给服务端（登录）
  3. PUT： 一般用于发送一些数据给服务当让其添加新数据（注册）
  4. DELETE： 一般用域删除某些数据
  5. HEAD： 类似于 GET 的请求，只不过一般没有响应的具体内容，用于获取报文头
  6. CONNECT： HTTP/1.1 中预留的方式，一般用于管道链接改变为代理的时候使用
  7. PATCH： 是和 PUT 方式类似的一个方式，一般用于更新局部数据
  8. OPTIONS： 允许客户端查看服务端性能
- 我们比较常用的就是 GET 和 POST



#### （1）GET 请求

- 参数以 `querystring` 的形式发送，也就是直接拼接在 请求路径的后面
- GET 请求会被浏览器主动缓存
- GET 请求根据不同的浏览器对长度是有限制的
  - IE： 2083 个字符
  - FireFox： 65536 个字符
  - Safari： 80000 个字符
  - Opera： 190000 个字符
  - Chrome： 8182 个字符
  - APACHE(server)： 理论上接受的最大长度是 8192 个字符（有待商榷）
- 对参数的类型有限制，只接受 ASCII 码的格式
- GET 请求是明文发送，相对不安全



#### （2）POST 请求

- 参数以 `request body`的形式发送，也就是放在请求体中
- POST 请求不会被浏览器主动缓存，除非手动设置
- POST 请求理论上是没有限制的，除非服务端做了限制
- 对参数类型没有限制，理论上可以传递任意数据类型，只不过要和请求头对应
- POST 请求是密文发送，相对安全



## 2.COOKIE

- `cookie` 是一个以字符串的形式存储数据的位置
- 每一个 HTTP 请求都会在请求头中携带 cookie 到服务端
- 每一个 HTTP 响应都会在响应头中携带 cookie 到客户端
- 也就是说，cookie 是不需要我们手动设置，就会自动在 客户端 和 服务端之间游走的数据
- 我们只是需要设置一下 cookie 的内容就可以



### 【1】COOKIE 的存储形式

- cookie 是以字符串的形式存储，在字符串中以 `key=value` 的形式出现

- 每一个 `key=value` 是一条数据

- 多个数据之间以 `;` 分割

  ```javascript
  // cookie 的形态
  'a=100; b=200; c=300;'
  ```

  

### 【2】COOKIE 的特点

1. 存储大小有限制，一般是 4 KB 左右
2. 数量有限制，一般是 50 条左右
3. 有时效性，也就是有过期时间，一般是 **会话级别**（也就是浏览器关闭就过期了）
4. 有域名限制，也就是说谁设置的谁才能读取



### 【3】PHP操作cookie

- `setcookie()` 设置cookie，有三个参数

  - 参数1：设置cookie的名字
  - 参数2：设置cookie 的值
  - 参数3：设置cookie的过期时间（默认是浏览器打开到浏览器结束，cookie就过期了）

- `$_COOKIE[cookie名字]`  读取cookie

- 修改cookie，只需要在执行一遍 `setcookie()`这个方法即可

- 删除cookie

  - cookie 里面的东西是不能删除的
  - 如果想要删除 只能设置cookie的过期时间
  - 将cookie的过期时间设置为当前时间之前，浏览器就会自动清除过期的cookie
  - time() 表示当前时间，那么time()-1 就是当前时间前一秒的时间

  ```php
  setcookie('a',100,time()-1)
  ```

  

  

### 【4】前端使用cookie

- 读取 cookie 的内容使用 `document.cookie`

  ```javascript
  const cookie = document.cookie
  console.log(cookie) // 就能得到当前 cookie 的值
  ```

- 设置 cookie 的内容使用 `document.cookie`

  ```javascript
  // 设置一个时效性为会话级别的 cookie
  document.cookie = 'a=100'
  
  // 设置一个有过期时间的 cookie
  document.cookie = 'b=200;expires=Thu, 18 Dec 2043 12:00:00 GMT";'
  // 上面这个 cookie 数据会在 2043 年 12 月 18 日 12 点以后过期，过期后会自动消失
  ```

- 删除 cookie 的内容使用 `document.cookie`

  ```javascript
  // 因为 cookie 不能直接删除
  // 所以我们只能把某一条 cookie 的过期时间设置成当前时间之前
  // 那么浏览器就会自动删除 cookie
  document.cookie = 'b=200;expires=Thu, 18 Dec 2018 12:00:00 GMT";'
  ```



### 【5】COOKIE 操作封装

- 因为 js 中没有专门操作 COOKIE 增删改查的方法
- 所以需要我们自己封装一个方法



#### （1）设置 cookie

```javascript
/**
 * setCookie 用于设置 cookie
 * @param {STRING} key  要设置的 cookie 名称
 * @param {STRING} value  要设置的 cookie 内容
 * @param {NUMBER} expires  过期时间
 */
function setCookie (key, value, expires) {
  const time = new Date();
  time.setTime(time.getTime() - 1000 * 60 * 60 * 24 * 8 + expires); // 用于设置过期时间

  document.cookie = `${key}=${value};expires=${time};`
}
```

```javascript
//婧姐上课封装
/**
 * @param {string} key  cookie的属性
 * @param {string} value cookie属性对应的值
 * @param {number } expires 过期时间的 秒数 当expires的值为负数的时候，那么就表示是删除
 */
function setCookie(key, value, expires) {
    /* 当前的+8时区的当前时间 */
    let time = new Date();
    // 0时区的时间
    let t = time.getTime() - 8 * 60 * 60 * 1000 + expires * 1000;
    // 把时间改变为0时区时间
    time.setTime(t);
    document.cookie = `${key}=${value};expires=` + time;
}
```



#### （2）读取 cookie

```javascript
/**
 * getCookie 获取 cookie 中的某一个属性
 * @param {STRING} key 你要查询的 cookie 属性
 * @return {STRING} 你要查询的那个 cookie 属性的值
 */
function getCookie(key) {
  const cookieArr = document.cookie.split(';')

  let value = ''

  cookieArr.forEach(item => {
    if (item.split('=')[0] === key) {
      value = item.split('=')[1]
    }
  })

  return value
}
```

```javascript
//婧姐上课封装
/**
 * @param {string} key  你要获取cookie那哪个属性的属性值
 */
function getCookie(key) {
    //这里有三个cookie中间是用;隔开的，所以一开始要用封号分割
    // setCookie('b', 10, 10);
    // setCookie('a', 20, 10);
    // setCookie('c', 30, 10);
    let str = document.cookie.split('; ');
    // ["b=10", "a=20", "c=30"]
    let value = '';
    //如果有属性等于传入的属性，把属性值赋值给value，再return
    str.forEach(item => {
        let arr = item.split('=');
        // ["a",10]
        if (arr[0] === key) {
            value = arr[1];
        }
    })

    return value;
}

```



#### （4）删除 cookie

```javascript
/**
 * delCookie 删除 cookie 中的某一个属性
 * @param {STRING} name 你要删除的某一个 cookie 属性的名称
 */
function delCookie(name) {
  setCookie(name, 1, -1)
}
```

## 3、购物车登录界面的案例
- 通过cookie判断登录状态，如果未登录就跳转到登录界面。登录了就直接跳转到购物车界面。
```javascript
    //【1】点击按钮，判断进入哪个界面
    //此做法可以优化为button外套form，用action进入其他页面，可不用window.open方法
    <button>点我就到购物车</button>
    <script src="./tool.js"></script>
    <script>
        let btn = $('button');
        btn.onclick = () => {
            //获取cookie的状态，看看是否登录
            let judge = getCookie("flag");
            //如果登入就进入到购物车界面，没有就进入到登录界面
            if(judge){
                window.open('../car/html/shop.html','_blank');
            }else{
                window.open('./loginOut.html','_blank');
            }
        }
    </script>
```


```javascript
//【2】loginOut.html 登录或注册页面
<body>
    <!-- 
        - 注意点1：input内使用name使得值可以传递
        - 注意点2：form action="./login.php"，action把数据传递到什么位置
        - 注意点3：method :POST 与GET 提交方式使得后端接收数据会有差别。
     -->
    <form action="" method="get">
        <div id="box">
            <p><label for="username">用户名：</label>
                <input type="text" id="username" name="username"></p>
            <p><label for="password">密码：</label>
                <input type="password" id="password" name="password"></p>
            <p><label for="tele">手机号：</label>
                <input type="text" id="tele" name="tele"></p>
            <p><button id="btn1">登录</button>
                <button id="btn2">注册</button></p>

        </div>
    </form>


    <script>
        let btn1 = document.querySelector('#btn1');
        let btn2 = document.querySelector('#btn2');
        let form = document.querySelector('form');

        btn1.onclick = function () {
            form.action = './login.php';
            console.log(form.action);
        }

        btn2.onclick = function () {
            form.action = './register.php';
            console.log(form.action);
        }
    </script>
</body>
```
```php
//php界面，与第一天不同的只是在登录成功的时候添加cookie，且把时间设置为七天。
<?php
    # 1、连接数据库
    $con = mysqli_connect('localhost','root','123456','students');

    # 2、input传过来的数据
    $username = $_GET['username'];
    $password = $_GET['password'];
    $tele = $_GET['tele'];

    # 3、在哪个表里匹配
    $sql = "SELECT * FROM `registers` WHERE `username`='$username' AND `password` = '$password'";

    # 4、数据库SQL操作
    $res = mysqli_query($con,$sql);
    
    # 5、纠错首选(出现错误不会报错，使用此项)
    if(!$res){
        die('error'.mysqli_error());
    }

    # 6、结果处理为json数据
    $row = mysqli_fetch_assoc($res);

    # 7、判断数据库是否存在此用户，不存在就回到登录界面，存在就到首页。

    #购物车，如果存在，就跳转到购物车页面，且把登录状态cookie添加
    if($row){
        echo '用户不存在';
    }else{
        $time1 = 7*24*60*60;
        # 【注意】在php里，添加cookie不是用封装的函数噢
        setcookie('flag','1',time()+$time1);
        header("location:../car/html/shop.html");
    }
    # 8、关闭数据库
    mysqli_close($con);
  
?>
    
```





