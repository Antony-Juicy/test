<?php

  // 如果你登录成功， login.php 会向 cookie 中存储一个数据 login 值是 true
  // 如果有 login 这个信息，表示登录过，那么直接显示页面
  // 如果没有 login 这个信息。表示没有登录过，跳转回 login 页面

  $cookie = $_COOKIE['login'];

  if (!$cookie) {
    header('location: ./login.html');
  }

  // 从新设置一下 表示登录的标识符
  setcookie('login', '1', time() + 30)
?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>购物车</h1>
</body>
</html>
