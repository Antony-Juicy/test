<?php

  include './base.php';

  # 接受参数 id
  $id = $_GET['id'];

  # 准备 sql 语句
  $sql = "SELECT * FROM `goods` WHERE `goods_id`='$id'";

  # 执行查询
  $res = mysql_query($sql);
  if (!$res) {
    die('error for query: ' . mysql_error());
  }

  # 解析结果
  $row = mysql_fetch_assoc($res);

  # 返回结果
  echo json_encode($row);
?>
