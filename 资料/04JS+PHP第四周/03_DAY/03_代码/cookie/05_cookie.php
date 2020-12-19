<?php

  // 获取 cookie
  $a = $_COOKIE['a'];
  $b = $_COOKIE['b'];


  echo $a . ' --- ' . $b;

  // 设置 cookie
  setcookie('d', 'php'); // 默认是会话级别的 cookie

  // php 获取当前时间的方式 time()
  setcookie('e', 'php2', time() + 10);

  // 修改
  setcookie('a', 'server');

  // 删除
  setcookie('b', '', time() - 1)
?>
