# 复习

## PHP

- php 写在一个 `.php` 后缀的文件里面
- php 代码要写在 `<?php 代码写在这里 ?>`
- php 的代码浏览器不认识，必须要借助 apache 服务器来运行
- 和 php 相关的代码都要写在 apache 的根目录下（WWW 目录）
- php 代码不能直接再浏览器打开
  + 要以 ip 的形式访问（localhost 或者 127.0.0.1）

- 变量
  + 定义变量就是 `$名字`
  + 使用变量也是 `$名字`

- php 的输出语法
  + echo 变量
  + print_r(变量)
  + var_dump(变量)

- 字符串
  + 单引号就是普通字符串
  + 双引号可以解析变量
  + 使用 `.` 来进行变量拼接

- 条件和循环语句
  + `if ($num > 100) { 要执行的代码 }`
  + `while ($num > 20) { 要执行的代码 }`
  + `for ($i = 0; $i < 3; $i++) { 要执行的代码 }`

- 数组
  + 索引型数组
    + `$arr = array(1, 2, 3, 4, 5);`
    + 就是我们 js 里面的 数组
  + 关联型数组
    + `$arr = array( 'name' => 'Jack', 'age' => 18 );`
    + 就是我们 js 里面的 对象
  + 获取数组中的内容，只能使用数组关联语法
    + `arr[0]`
    + `arr['name']`

- php 直接输出再页面上的内容不能显示中文
  + header()
  + `header('content-type:text/html;charset=utf-8;');`

- mysql 数据库
  + 是一个 sql 类的数据库
    + 以 "表" 的形式出现
  + 操作的时候使用 sql 语句进行操作

- php 操作数据库的几个步骤
  1. 建立链接
    + `$conn = mysql_connect('主机', '用户名', '密码');`
  2. 确定操作哪一个 库
    + `mysql_select_db('你要操作的库')`
  3. 使用 sql 语句去进行操作
    + `$res = mysql_query('你要执行的 sql 语句');`
  4. 解析结果
    + `mysql_fetch_row(你要解析的结果);`
      + 解析成一个索引型数组
    + `mysql_fetch_array(你要解析的结果);`
      + 解析成一个组合性数组
    + `mysql+fetch_assoc(你要解析的结果);`
      + 解析成一个关联型数组
    + 这三个方法只能解析一条数据
    + 我们要自己书写 while 循环来进行所有数据的解析
    + 象数组里面添加成员
      + `array_push(添加都哪个数组里面， 添加什么数据);`
  5. 关闭链接
    + `mysql_close(你要关闭的链接信息);`

- 常用的 sql 语句
  + 查
    1. `SELECT * FROM 表`
    2. `SELECT * FROM 表 WHERE 条件`
    3. `SELECT * FROM 表 WHERE 条件 AND 条件`
    4. `SELECT * FROM 表 WHERE 条件 OR 条件`
    5. `SELECT * FROM 表 WHERE 字段 LIKE '%关键字%'`
    6. `SELECT * FROM 表 WHERE ORDER BY 字段 ASC`
    7. `SELECT * FROM 表 WHERE ORDER BY 字段 DESC`
    8. `SELECT * FROM 表 WHERE LIMIT 开始索引, 查询多少个`
  + 增
    1. `INSERT INTO 表 VALUES(按照数据库中表的字段顺序书写);`
    2. `INSERT INTO 表 (字段1, 字段2) VALUES(值1, 值2);`
  + 删
    1. `DELETE FROM 表 WHERE 条件`
  + 改
    1. `UPDATE 表 SET 字段=值, 字段=值 WHERE 条件`


# 上午复习

- HTTP 传输协议的规则

- 链接步骤
  1. 建立链接
    + 基于 TCP/IP 协议的 三次握手
  2. 发送请求
    + 以一个请求报文的形式发送给服务端
  3. 接受响应
    + 以一个响应报文的形式发送给客户端
  4. 断开链接
    + 基于 TCP/IP 协议的 四次挥手

- 请求报文中的内容
  1. 请求行
    + GET 请求方式
    + /index.html 请求 URL（路径标识符）
    + HTTP/1.1 请求协议版本
  2. 请求头
    + 一些描述性的内容
    + User-Agent: 发送的浏览器版本
    + Content-Type: 表示我给你发送的数据是一个什么数据格式
    + Host: 主机地址
    + Cookie:
  3. 请求空行
    + 分离 请求头 和 请求体 的空行
  4. 请求体
    + GET 请求体不在这里（直接拼接在 URL 的后面）
    + POST 请求体在这里书写

- 响应报文中的内容
  1. 状态行
    + HTTP/1.1 传输协议版本
    + 200 http 响应状态码
    + OK 对响应状态码的简单描述信息
  2. 响应头
    + Date： 服务器时间（标准时间 0时区）
    + Server: 服务器版本
    + Content-Type: 响应的信息是什么数据格式的
    + Cookie：
  3. 响应体
    + 就是服务端给前端的数据

- 请求方式
  + HTTP/1.0 里面就包含的内容
    1. GET
    2. POST
    3. PUT
    4. DELETE
  + HTTP/1.1 增加的内容
    1. HEAD
    2. OPTION
    3. CONNECT
    4. PATCH

- GET 和 POST 的区别
  + GET
    1. 参数拼接在地址的后面
    2. 相对不安全
    3. 长度有限制（因为 IE 浏览器地址栏能传递的少 2M 左右）
    4. 发送的数据格式只能是 ASCII 码
    5. 会被浏览器主动缓存
  + POST
    1. 参数在请求体里面
    2. 相对安全
    3. 理论上没有长度限制（但是服务端可以做出一个限制）
    4. 理论上没有数据格式的限制（你要发送的数据要和请求头里面的 content-type 对应）
    5. 不会被浏览器自主缓存，除非手动设置
