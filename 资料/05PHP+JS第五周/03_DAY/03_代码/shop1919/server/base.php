<?php
  # 公共部分

  # 链接数据库
  $conn = mysql_connect('localhost', 'root', 'root');
  if (!$conn) {
    die('error for connect: ' . mysql_error());
  }

  # 确定查询那个库
  mysql_select_db('shop1919');
?>
