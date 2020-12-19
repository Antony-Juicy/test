<?php

  include './base.php';

  # 只要准备 sql 语句和 查询
  # COUNT 聚合函数，sql 语句的语法
  # 专门用来查询数量使用
  $sql = 'SELECT COUNT(*) `total` FROM `goods`';

  $res = mysql_query($sql);
  if (!$res) {
    die('error for query: ' . mysql_error());
  }

  # 解析结果
  $row = mysql_fetch_assoc($res);

  # 转换成 json 格式传递
  echo json_encode($row);

?>
