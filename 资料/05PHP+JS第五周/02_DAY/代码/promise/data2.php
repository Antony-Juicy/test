<?php

  $n1 = $_GET['n1'];
  $n2 = $_GET['n2'];

  echo json_encode(array(
    'result' => $n1 + $n2,
    'data' => 5
  ));

?>
