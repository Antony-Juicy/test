<?php

  // 先要接受前端传递的数据
  // GET 请求的数据 $_GET
  $username = $_GET['username'];
  $password = $_GET['password'];

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
    // 登录成功
    echo '成功';
  } else {
    // 登录失败
    echo '失败';
  }


?>
