# day01-服务器，PHP 和数据库

- PHP是一门后端语言
- 为什么要学习PHP这个后端语言
  - 目前的市场上的需求要求前端人员需要掌握一些后端的语言
  - 更加方便的和后端进行沟通





## 1.基本组织架构

- 在讲后端语言之前，我们简单的了解一下我们基本的组织架构
- 我们是一个 **前端开发工程师**
- 还有一个工作叫做 **后端开发工程师**
- 我们一个网站的组织架构基本上由下面的步骤完成
  - **用户** => **前端** => **后端** => **数据库**



- 整个过程中
  - 用户向前端人员要一个网页
  - 前端人员准备一个网页给用户，但是网页中的数据是找后端人员要的
  - 后端人员接受到前端人员要数据以后，去数据库里面找到对应的数据，给到前端人员
  - 前端人员拿到数据以后渲染在页面上
  - 最后把这个页面给到用户看



- 比如： 我们浏览一个新闻网站
  - 用户输入网址
  - 前端人员就要把对应的页面给到用户，在页面打开的过程中，想后端人员索要新闻信息
  - 后端人员接收到前端人员索要新闻信息以后，就去数据库中找到对应的新闻信息数据给前端人员
  - 前端人员接收到后端人员给的新闻信息以后，使用我们的办法吧新闻信息数据渲染在页面上
  - 页面就打开了，用户就可以看到一个新闻网站了



- 比如： 用户登陆一个网站
  - 当用户书写完表单内容以后，点击提交按钮的时候
  - 前端人员拿到用户填写的内容，把数据整合好传送给后端人员
  - 后端人员接收到数据以后，去数据库中进行比对，看看有没有对应的数据
  - 然后告诉前端人员，你给我的用户名和密码是否正确
  - 前端吧信息反馈给客户看到
    - 如果正确就是跳转页面
    - 如果不正确提示用户名或者密码有问题

## 2.服务器

### 【1】服务器简单的理解

- 我们不可能把数据库丢在用户的电脑上
- 一个是太大，一个是不安全
- 所以我们要把数据库放在网络的另一端（远程）
- 所以当前端人员向后端人员索要数据的时候需要网络
- 我们也不可能把页面也放在用户的电脑上
- 所以用户也是需要网络来请求前端人员所有页面

**总结：服务器其实就是一台比较特殊的电脑的**



### 【2】服务器的认识

- 我们现在的市场上有一些常见的服务器可以承载内容
- 我们目前比较常用的就是 `Apache` 和 `Tomcat`
- 我们今天要学习的就是 `Apache` 服务器



### 【3】到底什么是服务器

- 其实说白了，服务器就是一个电脑，当他跑起来一些程序的时候，就变成了一个服务器
- 只不过会跑一些特殊的程序，需要一些特殊的环境，电脑不他一样而已
- 换句话说，我们自己的电脑，跑一些特殊的程序的时候，也可以当作一个小型的服务器来用
  - 只不过计算能力/存储能力/转存能力没有专业的服务器电脑厉害而已

### 【4】访问服务器上的东西

- 我把网站或者数据放在服务器了，我应该怎么切访问呢？
- 这就涉及到一个知识点叫做 url地址的问题
- 比如我们的经常访问的 `www.baidu.com`
- 这个里面就包含很多的内容，我们看到的这个只是一个省略后的内容
- 是浏览器帮我们省略掉了一些内容
- 全部的地址应该是 `https://www.baidu.com:443`
- 发现多了两个东西 `https://` 和 `:443`
- 其实一个简单的 `url` 地址是由三部分组成的
  - `https`-传输协议
  -  `www.baidu.com-`域名
  - ·`443`-端口号

#### （1）传输协议

- 我们常见的传输协议是 `http` 和 `https` 
- 他们是限制用户和服务器之间交流传输数据的方式和规则
- 也是我们前端和后端人员数据交互的规则
- 规则
  - 建立连接通道
  - 相互通信
  - 关闭连接通道
- `HTTP:`:（HyperText Transfer Protocol，超文本传输协议）是因特网上应用最为广泛的一种网络传输协议 
- `https` :（Hyper Text Transfer Protocol over SecureSocket Layer）是一种基于计算机网络进行安全通信的传输协议 

#### （2）域名

- 之前我们说过，服务器就是一个在 **网络那一头** 的一个电脑
- 以前，没有域名的概念，大家都是使用 `IP` 地址来访问
- 也就是 **网络那一头** 的那个电脑的 `IP`
- 都是一堆数字，不方便记忆
- 后来就有了一个 **万维网**，他把每一个 IP 地址配套了一个英文的名字
- 方便用户记忆
- 所以说，域名就代表着 **网络那一头** 那个电脑的 IP 地址
- 其实也就是我们要访问哪一个服务器



#### （3）端口号

- 人家的服务器电脑也是有很多的文件夹的

- 不同的文件夹里面存储着不同的内容

- 可能有个 a 文件夹，里面存储的是首页

- 可能有个 b 文件夹，里面存储的是一些数据

- 所以说，你光找到服务器电脑还不行，还得找对应文件夹才可以

- 大家都把文件夹编上号存储了 `0 ~ 255` 一共 256 个

- 每个文件夹里面还有对应的小文件夹 `0 ~ 255` 一个 256 个

- 那么一共就有 `256 * 256` 个文件夹，也就是从 `0 ~ 65535`

- 所以我们的端口号就有 `65536` 个，分别对应着 `0 ~ 65535` 

- 大家都把 `80` 端口号作为一个网站的默认端口号

- http 协议默认是 80 端口号

- https 协议默认是 443 端口号

  

## 3.PHP

### 【1】PHP基础语法

- 每个语言都要自己语言的规则

- PHP也有自己的语言规则，不再像 之前的JavaScript /html/css那样

  

### 【2】PHP文件

- 我们在写 `javascript` 的时候，是一个 `.js` 文件
- 我们在写 `html` 的时候，是一个 `.html` 文件
- **php 的代码写在一个 `.php` 后缀的文件中**



#### （1）PHP文件的书写

- 所有的 php 代码都要写在一个 php 的范围内

- 要求以 `<?php` 开头

- 要求以 `?>` 结尾

  ```php
  <?php
  
    # php 的代码写在这里
    
  ?>
  ```

### 【3】简单了解 php 的语法

- 每个语言都会有自己的语法
- 接下来我们就简单了解一下 php 的语法规则
- `php` 里面有一个必须要注意的点 **每一个语句后面都要有 `;`**

#### （1）定义变量

- 在 php 中没有 `var` 关键字给我们定义变量
- 直接使用 `$` 来确定一个变量

```php
<?php
	
  # 下面就是一个定义了一个变量，并且赋值为 100
  # 变量名就是 $num
  $num = 100;
  
  $boo = true;
  
  # 下面是一个字符串
  $str = "你好 php";
  
?>
```

#### （2）输入

- `echo`
  - 只能输出字符串
- `var_dump()`
  - 什么都能输出，并且会把每一个数据的数据类型输出出来
- `print_r()`
  - 什么都能输出，但是不会输出数据的数据类型

#### （3）条件语句

- 在 php 中使用条件语句和 js 基本一致

```php
<?php
   	$boo = true;
    if($boo){
		echo '欢迎登陆！';
    }else{
    	echo '您还没有登录，请登录';
	}
?>
```



#### （4）循环结构

- 在 php 中循环语句和 js 基本一致

```php
<?php
    $num = 5;
	#for循环
    for ($i = 0; $i < $num; $i++) {
      echo 'hello php';
    }	
	#while循环
    while($num >= 0){
        $num--;
        echo '你好呀';
    }
?>
```

#### （5）符串拼接

- 在 php 中，字符串拼接不再是使用 `+` 进行拼接了，而是使用 `.` 进行拼接

```php
    $str = 'hello ';
    $str2 = 'world';
    $str3 = $str . $str2;
    echo $str3;
    # 得到的就是 hello world
```

#### （6）数组

- 在 php 中的数组和 js 中特别不一样

```php
<?php

      # 创建一个数组
      $arr = array(1, 2, 3);

      print_r($arr);
      # Array ( [0] => 1 [1] => 2 [2] => 3 )
      # 这个就类似于我们 js 中的数组，按照索引来的

      # 创建一个关联数组
      $arr2 = array('name' => 'Jack', 'age' => 18, 'gender' => '男')
      print_r($arr2)
      # Array ( [name] => Jack [age] => 18 [gender] => 男 )
      # 这个就类似于我们 js 中的 对象，键值对的形式

       # 把4这个值添加到 $arr1 这个数组中
       array_push($arr1,4);
?>
```

####  （7）单引号，双引号

-  双引号可以识别变量（"你好\$n"） 会把$n当成变量来解析
- 单引号不识别变量（'10\$n'） 输出的得到就是 10$n 字符串

#### （8）`array_push`
- 往数组中添加数据
```php
    # 参数1：表示往哪个数组添加数据
    # 参数2：往这个数组里面添加什么数据
    // array_push($arr,1); # 往数组里面添加 索引型的数组的数据
    array_push($arr,array("name"=>"老谢")); # 往数组里面添加 关系型的数据的
```

#### （9）`json` 特殊的字符串
- `json`是所有语言都识别的一个数据格式
- php 转json数据 `json_encode()`
- json数据 转PHP数据 `json_decode()`

## 4.数据库(MySQL )

- MySQL 是一个数据库的名字
- MySQL 是最流行的关系型数据库管理系统（非关系型数据库简略介绍）
- 关系数据库管理系统(Relational Database Management System)的特点
  - 关系数据库管理系统(Relational Database Management System)的特点
  - 数据以表格的形式出现
  - 每行为各种记录名称
  - 许多的行和列组成一张表单
  - 若干的表单组成database
  - **主键**：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。

### 【1】数据库的数据类型

```text
* 数值类型

| 类型 | 大小 | 用途 |
| ------ | ------ | ------ |
| TINYINT | 1 字节 | 小整数值 |
| SMALLINT | 2 字节 | 大整数值 |
| MEDIUMINT | 3 字节 | 大整数值 |
| INT或INTEGER | 4 字节 | 大整数值 |
| BIGINT | 8 字节 | 极大整数值 |
| FLOAT | 4 字节 | 单精度 浮点数值 |
| DOUBLE | 8 字节 | 双精度 浮点数值 |
| DECIMAL |  | 小数值 |

* 日期和时间类型

| 类型 | 格式 | 用途 |
| ------ | ------ | ------ |
| DATE | YYYY-MM-DD | 日期值 |
| TIME | HH:MM:SS | 时间值或持续时间 |
| YEAR | YYYY | 年份值 |
| DATETIME | YYYY-MM-DD HH:MM:SS | 混合日期和时间值 |
| TIMESTAMP | YYYYMMDD HHMMSS | 时间戳 |

* 字符串类型

| 类型 | 大小 | 用途 |
| ------ | ------ | ------ |
| CHAR | 0-255字节 | 定长字符串 |
| VARCHAR | 0-65535 字节 | 变长字符串 |
| TINYBLOB | 0-255字节 | 不超过 255 个字符的二进制字符串 |
| TINYTEXT | 0-255字节 | 短文本字符串 |
| BLOB | 0-65 535字节 | 二进制形式的长文本数据 |
| TEXT | 0-65 535字节 | 长文本数据 |
| MEDIUMBLOB | 0-16 777 215字节 | 二进制形式的中等长度文本数据 |
| MEDIUMTEXT | 0-16 777 215字节 | 中等长度文本数据 |
| LONGBLOB | 0-4 294 967 295字节 | 二进制形式的极大文本数据 |
| LONGTEXT | 0-4 294 967 295字节 | 极大文本数据 |
```

### 【2】操作数据库

- 前端向后端索要数据，后端就会向数据库索要数据
- 那么接下来我们就是使用 php 链接 mysql 数据库来获取数据库中的数据
- 想要操作数据库，除了需要 php 的语法以外，还需要一个 mysql 的 sql 语句
- 使用 php 操作数据库的步骤
  - 和数据库建立链接
  - 获取数据库中哪一个表的数据
  - 使用 sql 语句对数据库进行操作
  - 获取结果
  - 和数据库的链接断开

#### （1）和数据库链接

- 在 php 中我们使用 `mysql_connect()` 方法来建立和数据库的链接

```php
<?php
 	// 假定数据库用户名：root，密码：123456，数据库：students 
	$con=mysqli_connect("localhost","root","123456","students");  
?>
```

- 我们有了链接信息 `$link` 以后就可以继续去操作数据库了



#### （2）执行 sql 语句操作数据库

- 接下来就是使用 sql 语句去这个库里面进行增删改查的操作了

```php
<?php
  # 下面就是使用 sql 语句对数据库进行操作
  # mysqli_query($con,"你要执行的SQL语句");  
  # 这里婧姐多了一个操作就是设置了一个sql语句，使得代码看上去没有那么长。 是从student这个表里截取。
    
    # 这里是截取了这个表里的所有数据
    $sql = "SELECT * FROM `student`"; 
	$res = mysqli_query($con,$sql);
  #一样的	
    $res = mysqli_query($con,'SELECT * FROM `student`');
?>
```

- 如果是true是有结果的，可是如果出现错误会为空，添加一个步骤以便操作代码，纠错。

```php
# true 为1，false 为空，不会打印任何东西（最后print_r的时候）
# $res 为空的时候，有两种情况，数据库中的表里面没有数据，第二种情况，可就是表名写错了
    if(!$res){
        # 如果能后进入这个if条件 说明 !$res 为 true，$res 为false
        # $res 为false的时候，那么就表示没有查询到数据
        # 【注意点】如果这里语法错误，就算不执行也会报错，php比JS更为严谨
        die("error" . mysqli_error());
    }
```



- 这里有一个注意的点：

  - 我们拿到的结果是一个我们看不懂的处理信息（第三步进行处理）

    

#### （3）获取结果并解析

- 以上步骤 中`$res`就是  根据执行的mysql语句得到的结果，但是这个结果是我们看不懂的处理信息

- 需要使用 mysql_fetch_row || mysql_fetch_assoc 解析一下结果才能看得懂

- **虽然这些方法都只返回一条数据，但是这些方法再执行第二次的时候，都会从上一次结束的位置开始 **

- `mysqli_fetch_row($res)  `把从数据库取出来的数据  以索引型的 数组输出（只会输出第一条数据） 

  ```php
  # eg 太过简单
  Array([0]=>1 [1] =>Mac [2]=>180 [3] => 10)
  ```

  

- `mysqli_fetch_row($res) `解析你结果中的第一条，以 组合型数组 的形式返回 就是把你的字段名称 + 值全部放在数组里面 

  ```php
  # eg 太过繁琐
  Array([0]=>1 [id]=>1 [1] =>Mac [goodsName]=>Mac [2]=>180 [price]=>180 [3] => 10 [number] =>10 )
  ```

  

- `mysqli_fetch_assoc($res)` 解析你结果中的第一条，以 关联型数组 的形式返回 **(常用)**

  ```php
  Array( [id]=>1  [goodsName]=>Mac  [price]=>180  [number] =>10 )
  ```

  ```php
  $dataArr = array(); # 定义一个空数组，存放数据
      $row = mysqli_fetch_assoc($res);
  
  	# 因为只会解析结果的第一条，所以要使用while循环一直转换，直到false的时候退出循环
      while($row){
          array_push($dataArr,$row);
          $row = mysqli_fetch_assoc($res);
      }
    # 在页面显示
      print_r(json_encode($dataArr));
  
  ```

  

#### （4）关闭链接

- 全部用完以后我们最好是关闭一下数据库链接

```php
<?php
   mysqli_close($con);
?>
```

**总结：完整步骤**

```php
<?php
  $con=mysqli_connect("localhost","root","123456","students");  
  $res =mysqli_query($con，'SELECT * FROM `student`');
  $row = mysqli_fetch_assoc($res);
  mysqli_close($con);

  print_r($row);
?>
```

- （1）链接数据库
  `$con = mysqli_connect("localhost","root","123456","students")`
  - 参数1：localhost|127.0.0.1本地的IP地址
  - 参数2：数据库的用户名
  - 参数3：数据库的密码
  - 参数4：你要链接的库
- （2）设置对应的SQL语句
  - ` 'SELECT * FROM 表名' `
- （3）执行SQL语句
  - `mysqli_query($con,$sql)`
- （4）解析处理执行SQL语句的结构
  - `mysqil_fetch_row()`  解析你结果中的第一条，以 索引型数组 的形式返回 
  - `mysqli_fetch_array()` 解析你结果中的第一条，以 组合型数组 的形式返回 就是把你的字段名称 + 值全部放在数组里面 
  - `mysqli_fetch_assoc()` 解析你结果中的第一条，以 关联型数组 的形式返回 
- （5）关闭数据库的链接
  - `mysqli_close($con);`





### 【3】常用的 sql 语句

- 一般情况操作数据库都是 对数据库进行**增删改查** 

#### （1）增

- 增加语句

```php
<?php
  # 向表中增加一条数据，再增加的时候主键不能由我们书写，而是mysql 数据库自己递增（所以null）
  $sql = 'INSERT INTO `student` VALUES(null, "张三",  "男",18)';
    
  # 插入固定几个键的数据，其他的用默认值
	#【注意】：如果没有添加的数据 有一个字段为不能为空的时候，会报错（要将空勾选为是）
  $sql = 'INSERT INTO `student` (`name`, `age`) VALUES("李四", 22)';
?>
```



#### （2）删

- 删除语句

```php
<?php
    # DELETE FROM `表` WHERE `头` = `名`
  # 删除表中 id 为 1的数据
  $sql = 'DELETE FROM `student` WHERE `id`=1';

  # 删除表中 name 为 张三 的数据
  $sql = 'DELETE FROM `student` WHERE `name`="张三"'
?>
```



#### （3）改

- 修改语句

```php
<?php

  # 更新一条 id 为 1的数据中的 name 字段的值和 age 字段的值
  $sql = 'UPDATE `student` SET `name`="张三", `age`=10 WHERE `id`=1'
    
  # 更新数据的时候让所有的数据增加一些内容
  $sql = 'UPDATE `student` SET `age`=age+1'
    
  # 更新数据中的某一条数据
  # UPDATE '表' SET `你要更改的字段` = '你要改的数据' WHERE  根据字段判断你要改的数据
  # 更改 id=4 的这条数据的 goodsName = '阿玛尼2222333'
  $sql ="UPDATE `car` SET `goodsName` = '阿玛尼2222333' WHERE  `id` = 4";
?>
```



#### （4）查

- 查询语句

```php
<?php
  
  # 【1】查询 student 这个表里面的所有数据
  $sql = 'SELECT * FROM `student`';
    
  # 【2】查询 student 表中的数据里面 gender 为 男 的数据
  $sql = 'SELECT * FROM `student` WHERE `gender`="男"';
    
  # 查询 student 表中的数据里面 age 大于 18 的数据
  $sql = 'SELECT * FROM `student` WHERE `age`>18';
    
  # 【3】查询 student 表中的数据里面 age 大于 18 且 gender 为 男 的数据
  $sql = 'SELECT * FROM `student` WHERE `age`>18 AND `gender`="男"';

  # 【4】查询 student 表中的数据里面 age 小于 22 或者 age 大于 28 的数据
  $sql = 'SELECT * FROM `student` WHERE `age`<22 OR `age`>28';

  # 【5】查询 student 表中的数据里面从 第几条开始 查询多少条
  $sql = 'SELECT * FROM `student` LIMIT 0, 10';
    
  # 先按照条件筛选出数据以后再进行分页查询
  # 下面是查询表中所有 age>18 且 性别为男的所有数据，查出来以后从第 11 条开始查 10 条
  $sql = 'SELECT * FROM `student` WHERE `age`>18 AND `gender`="男" LIMIT 10, 10';

  # 查询表的模糊查询
  # 【6】下面表示查询表中所有数据里面 name 字段中包含 "三" 字的数据
  $sql = 'SELECT * FROM `student` WHERE `name` LIKE "%三%"';

  # 【7】查询排序，查询的时候按照某一个字段升序或降序排序（eg:按照年龄升序或降序）
  $sql = 'SELECT * FROM `student` ORDER BY `age` ASC';
  $sql = 'SELECT * FROM `student` ORDER BY `age` DESC';
?>
```

## 5、登录案例

- 要通过域名访问，不能通过本地文件访问，否则不能识别PHP文件

【1】 前端`login.html`界面

- 注意点1：input内使用name使得值可以传递

- 注意点2：form action="./login.php"，action把数据传递到什么位置

- 注意点3：method :POST 与GET 提交方式使得后端接收数据会有差别。

  ```javascript
  <body>
      <!-- 
          前端：把用户名和密码传递给后端
              正常流程，后端个匹配的结果返回给前端，短前端拿到结果进行下一步操作
              正确就跳转到首页
              错误：继续尝试登陆
              暂时没有办法拿到后端数据（ajax）
              如果登陆成功想要跳转到首页，只能通过后端来操作
          后端：接收前端传过来的数据，然后拿数据去数据库中匹配
          数据库：存储一些数据
       -->
      <!--
            form 表单可以自动提交
            action  : 把数据传到什么位置
          
      -->
      <form action="./login.php" method="GET">
          <label for="">用户名：</label>
          <input type="text" name="username">
          <br>
          <label for="">密码：</label>
          <input type="text" name="password">
          <br>
          <button>登录</button>
      </form>
  </body>
  ```

- 【2】 后端`login.php`页面

- 注意点1：如果前端用 GET传输  \$\_GET['属性']，如果是POST  \$_POST['属性']

- 注意点2：使用 `mysqli_query`对数据库进行SQL操作

- 注意点3：` if(!$res){die}` 和` if(!$row)`不能混乱。前者是为了好纠错，后者是判断有无符合条件的数据。

- 注意点4：`header("location:跳转的目的地")`
```php
<?php

    # 怎么获取前端传过来的数据 跟前端传送过来的方式有关系
    # 如果前端用 GET传输  $_GET['属性']   属性其实是input name 的属性值 input这里name = 'username'
    $name = $_GET['username'];
    $password = $_GET['password'];

    # 拿获取到的前端参数 去数据库中匹配
    $con = mysqli_connect('localhost','root','123456','students');

    $sql = "SELECT * FROM `user` WHERE `name` ='$name' AND `password` = '$password'";

    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error' . mysqli_error());
    }
    // 把结果处理成json的数据
    $row = mysqli_fetch_assoc($res);

    // 判断处理的结果，如果一条结果都不满足 返回的数据为 0条 一套数据都没有，$row  = 空
    // 如果有一条数据满足，就会把这条满足条件的数据返回 $row  = 当前的这条数据
    if(!$row){
        // echo "登录错误";
        header("location:./login.html");
    }else{
        // echo "登录成功";
        // 怎么跳转到首页
        // 这个方法就是设置当前的这个url地址为shouye.html
        header("location:./shouye.html");
    }

    # 关闭数据库
	mysqli_close($con);

?>
```
## 6、php循环生成数据

```php
<?php
    #定义一个最外层数组
    $arr = array();

    for ($i=0; $i < 2; $i++) { 
        #定义一个关联型数组
        $arr1 = array("Shopkeeper"=> "vnk旗舰店$i","address"=>"广州");
        #对象的形式添加键值对
        $arr1['goodList'] = array();
        for ($j=0; $j < 3; $j++) { 
            # {}的形式
            $arr2 = array("name"=>"Mac$j","price"=> 180, "number"=> 10);
            # 将数据放入$arr1中
            array_push($arr1['goodList'],$arr2);
        }
        array_push($arr,$arr1);
    }
    print_r(json_encode($arr));
?>
```

