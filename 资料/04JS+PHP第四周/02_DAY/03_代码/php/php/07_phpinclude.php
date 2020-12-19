<?php

  // header('content-type:text/html;charset=utf-8;');
  include './base.php';

  // 导入
  //   就是把另一个文件的内容导入到我自己的文件里面执行

  // 我们每个页面想返回中文，都要写 header();
  // 就是把公共的内容提取出去，每个文件你需要的时候就导入进来就好了

  // 导入语法使用 include 关键字
  //    语法： include '你要引入的文件路径';

  echo '你好 世界';

?>
