<?php

  $a = $_GET['a']; // $a === 100
  $b = $_GET['b']; // $b === 200

  $arr = array(
    'params1' => $a,
    'params2' => $b
  );

  // 关联型数组等价于我们的 对象
  // { params1: 100, params2: 200 }

  echo json_encode($arr);

?>
