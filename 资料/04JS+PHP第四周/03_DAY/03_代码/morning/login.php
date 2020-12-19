<?php

  header('content-type:text/html;charset=utf-8;');

  // 1. 接受客户端给我的用户名和密码
  //    以 GET 方式发送的请求我们用 GET 接受
  //    $_GET 所有 GET 请求的请求体都在这个里面
  //    $_GET 我们可以理解为 array( 'username' => 'admin', 'password' => '123456' )
  $username = $_GET['username'];
  $password = $_GET['password'];

  // 2. 去数据库里面看看有没有这个配套的东西
  $conn = mysql_connect('localhost', 'root', 'root');

  if (!$conn) {
    die('error for connect: ' . mysql_error());
  }

  mysql_select_db('test1919');

  $sql = "SELECT * FROM `login` WHERE `username`='$username' AND `password`='$password'";

  $res = mysql_query($sql);

  if (!$res) {
    // 判断的时 sql 语句有没有出错
    die('error for query: ' . mysql_error());
  }

  // 解析结果
  $row = mysql_fetch_assoc($res);

  // 如果 $row 是一个 false 证明数据库里面没有和你传递的用户名密码匹配的内容
  // 如果 $row 是一个 数据，证明数据库里面由和你传递的用户名密码匹配的内容

  if ($row) {
    // 登录成功
    // 直接跳转页面就行了
    // 现在做的事情时 用服务器去操作客户端
    // 告诉浏览器你把地址换了

    // 告诉浏览器，把地址栏信息换成  index.html
    header('location: ./index.html');
  } else {
    // 登录失败
    echo '用户名密码错误！';
  }
?>
