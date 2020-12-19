<?php

  $arr = array(
    'name' => 'Jack',
    'age' => 18,
    'gender' => '男'
  );

  // 转成 json 格式返回
  // json_encode 在 php 就是把 php 的数据类型转换成 json 格式的数据类型
  // json_decode 在 php 就是把 json 格式的数据类型转换成 php 的数据类型
  echo json_encode($arr);

?>
