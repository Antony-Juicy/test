<?php

  include './base.php';

  // 创建一个数组

  // $arr = array(1, 2, 3, 4, 5);

  // 获取数组中的内容只能使用下标
  // $n1 = $arr[2];

  // 创建一个关联型数组
  $arr = array(
    'name' => 'Jack',
    'age' => 18,
    'gender' => '男'
  );

  // 再 js 里面直接 arr.name
  // 只能使用数组关联语法
  $name = $arr['name'];

  var_dump($name);

?>
