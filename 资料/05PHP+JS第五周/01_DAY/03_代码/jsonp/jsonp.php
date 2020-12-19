<?php

 // 我接受到一个 callback 的参数就是前端准备号的函数名
 $callback = $_GET['callback'];

  echo  $callback . '({ name: "Jack", age: 18, gender: "男" })';

?>
