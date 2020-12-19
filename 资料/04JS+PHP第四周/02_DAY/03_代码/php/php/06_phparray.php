<?php

  header('content-type:text/html;charset=utf-8;');
  // 数组

  // js 里面有对象有数组
  // 再 php 里面没有 {}

  /*
    数组分成两种
      1. 索引型数组（等价于我们 js 里面的数组）
        array(1, 2, 3, 4, 5);
      2. 关联型数组（等价于我们 js 里面的对象）
        array('name' => 'Jack', 'age' => 18, 'gender' => '男');
  */

  /*
    输出语法
      echo 只能输出字符串
      print_r() 输出的语法的一种
        可以输出每一个数据类型
      var_dump() 输出语法的一种
        可以输出每一个数据类型，并且会把所有数据的数据类型都详细的展示
  */

  // 索引型数组
  // $arr = array(1, 2, 3, 4, 5.6, 'hello', true);

  // 关联型数组
  $arr = array(
    'name' => 'Jack',
    'age' => 18,
    'gender' => '男'
  );


  // echo $arr;

  // print_r($arr);

  // var_dump($arr);

?>
