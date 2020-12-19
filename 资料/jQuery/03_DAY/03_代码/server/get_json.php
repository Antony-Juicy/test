<?php

  $a = $_GET['a'];
  $b = $_GET['b'];

  echo json_encode(array(
    'a' => $a,
    'b' => $b
  ));

?>
