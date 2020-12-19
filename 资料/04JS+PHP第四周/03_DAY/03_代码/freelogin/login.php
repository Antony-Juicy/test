<?php

  // 接受前端传递的用户名和密码
  // $_GET 来接受 get 方式的参数
  // $_POST 来接受 post 方式的参数
  header('content-type:text/html;charset=utf-8;');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $conn = mysql_connect('localhost', 'root', 'root');
  if (!$conn) {
    die('error for connect: ' . mysql_error());
  }
  mysql_select_db('test1919');
  $sql = "SELECT * FROM `login` WHERE `username`='$username' AND `password`='$password'";
  $res = mysql_query($sql);
  if (!$res) {
    die('error for query: ' . mysql_error());
  }
  $row = mysql_fetch_assoc($res);
  if ($row) {
    // 跳转页面
    // 表示登录成功

    // 登录成功给你设置一个 cookie
    setcookie('login', '1', time() + 30);

    // 将来当你打开页面的时候，只要 cookie 中有 login 这个数据表示你登陆过
    // 将来当你打开页面的时候，如果 cookie 中没有 login 这个数据表示你没有登录过

    header('location: ./cart.php');
  } else {
    echo '用户名密码错误';
  }
?>
