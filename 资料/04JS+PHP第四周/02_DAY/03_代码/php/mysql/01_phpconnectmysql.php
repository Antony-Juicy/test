<?php

  header('content-type:text/html;charset=utf-8;');

  // 使用 php 去链接数据库进行操作

  /*
    做一个登录功能
      后端：
        我接受前端给我的用户名和密码
        使用你给我的用户名和密码去数据库进行比对
        如果有一条数据用户名和密码都和你给我传递过来的一致
          + 表示登录成功
        如果一条能匹配上的都没有
          + 表示登录失败
        给前端返回的信息，
          + 如果有数据匹配，我给你返回成功
          + 如果没有数据匹配，我给你返回一个失败
  */

  /*
    php 操作数据库的步骤

      1. 和 mysql 进行链接
      2. 告诉 mysql 你要找里面的哪一个 “库”
      3. 你要执行的是一个什么样的 sql 语句
        + sql 语句就是 sql 类数据库专用的操作语句
      4. 得到结果以后我们对结果进行解析
      5. 断开链接
  */

  /*
    1. 和 mysql 建立链接
      mysql_connect('主机名称', '用户名', '密码');
      主机名： 本机 localhost 或者 127.0.0.1 都行
      用户名： 默认是 root
      密码： 默认是 root
      返回值： 链接结果
    2. 告诉 mysql 你要查询哪一个库
      mysql_select_db('你要查询的哪个库', '数据库链接信息');
      他的第二个参数可以不用传递，默认使用最近的一次链接信息
    3. 使用 sql 语句去对数据库进行 增删改查 的操作
      所有的操作使用的方法是一样的，只不过 sql 语句不一样
      mysql_query('你要执行的 sql 语句'， '数据库链接信息');
      他的第二个参数可以不用传递，默认使用最近的一次链接信息
      返回值： 就是这个 sql 语句执行完毕的结果
    4. 解析结果
      1. mysql_fetch_row(从 mysql_query() 执行出来的结果)
        + 返回值： 就是解析完毕的内容
        + 返回的是一个索引型数组，没有 key 只有 值
      2. mysql_fetch_array(从 mysql_query() 执行出来的结果)
        + 返回值： 就是解析完毕的内容
        + 返回的是一个组合型数组，不光是键值对应的拿出来，所有 key 也单独拿出来了
      3. mysql_fetch_assoc(从 mysql_query() 执行出来的结果)
        + 返回值： 就是解析完毕的内容
        + 返回的就是一个关联型数组
      + 三个方法都是只能拿到一条数据
      + 需要我们自己写一个循环来把所有的数据都拿出来
    5. 关闭和数据库的链接
      mysql_close('链接信息')
      关闭和数据库的链接
      + 下次想执行 sql 语句的时候要从新进行链接
      + 这个关闭的代码可以不执行

  */

  // $conn 存储的就是 我们的链接信息
  $conn = mysql_connect('127.0.0.1', 'root', 'root');

  // 严谨性的做一个条件判断
  // 如果你链接失败了，就不继续执行了
  if (!$conn) {
    // 如果这个代码能够执行表示 !$conn 是一个 true，证明 $conn 是一个 false
    // 抛出一个错误，让代码不在继续执行
    // 抛出一个错误并且阻断代码执行使用 die()
    // mysql 链接的错误信息使用 mysql_error() 获取
    die('mysql_connect_error: ' . mysql_error());
  }

  // 告诉 mysql 你要查询哪一个 库
  // mysql_select_db();
  mysql_select_db('test1919');


  // 使用 sql 语句去操作数据库了
  // 最简单的 sql 语句 'SELECT * FROM `student`'
  $sql = 'SELECT * FROM `student`';

  // 开始进行执行 sql 语句
  $res = mysql_query($sql);

  // 做一个严谨性的判断
  // 执行sql 语句出错的时候抛出一个错误，阻断程序执行
  if (!$res) {
    die('error for mysql_query: ' . mysql_error());
  }

  // 代码能执行到这里，表示没有错误
  // $row = mysql_fetch_row($res);
  // $row = mysql_fetch_array($res);
  // $row = mysql_fetch_assoc($res);
  // $row2 = mysql_fetch_assoc($res);
  // $row3 = mysql_fetch_assoc($res);

  // print_r($row);

  // 自己写一个循环，把所有的数据都拿出来
  // 把里面的每一个数据都拿出来放在一个索引型数组里面好一点

  // 先准备一个数组，接受结果
  $array = array();

  $row = mysql_fetch_assoc($res);

  while ($row) {
    // 来到这里表示解析的有结果
    // 把 $row 放到数组里面
    //   php 向数组追加内容使用 array_push(添加到哪个数组里面, 要添加的内容)
    array_push($array, $row);
    // 改变自己
    $row = mysql_fetch_assoc($res);
  }

  // echo json_encode($row3);
  // print_r($array);

  echo json_encode($array);

  // 关闭链接
  mysql_close($conn);
?>
