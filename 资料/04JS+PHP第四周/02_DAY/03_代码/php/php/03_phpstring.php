<?php

  // php 想显示中文，需要再一开始设置一下字符集格式
  header('content-type:text/html;charset=utf-8;');

  // 字符串
  // 再 php 里面也可以使用 '' 或者 ""
  // 再 php 单引号 和 双引号 是由区别的
  // 单引号 就是普通的字符串
  // 双引号 可以解析变量

  // php 里面的 + 就是数学运算，没有 拼接字符串的功能
  // php 里面拼接字符串使用 .

  $num = 100;

  $str = 'hello $num world';

  $str2 = "hello $num world";

  $str3 = 'hello world ' . ' php';

  $str4 = '你好 世界！';

  echo $str4;
?>
