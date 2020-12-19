<?php

  $a = $_POST['a'];
  $b = $_POST['b'];

  echo json_encode(array(
    'a' => $a,
    'b' => $b
  ));
?>
