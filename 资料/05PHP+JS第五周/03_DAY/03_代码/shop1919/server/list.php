<?php

  include './base.php';

  # 专门为了返回列表数据使用的
  # 按照分页规则 一次返回 10 条
  # 你返回多少条由谁来决定 前端
  # 你返回的是第几页的数据 前端

  # 需要接受至少两个参数 一个是第几页一个一页多少条
  $pagenum = $_GET['pagenum'];
  $pagesize = $_GET['pagesize'];

  /*
    一页十条数据
      第一页 0 ~ 9        1
      第二页 10 ~ 19      2
      第三页 20 ~ 29      3
    开始索引就应该是 (pagenum - 1) * 10
  */
  $start = ($pagenum - 1) * $pagesize;

  # 准备 sql 语句去查询数据库
  $sql = "SELECT * FROM `goods` LIMIT $start, $pagesize";

  # 执行 sql 语句
  $res = mysql_query($sql);
  if (!$res) {
    die('error for query: ' . mysql_error());
  }

  # 解析结果
  $arr = array();

  while ($row = mysql_fetch_assoc($res)) {
    array_push($arr, $row);
  }

  echo json_encode($arr);

?>
