<?php

  $arr = array(
    "params1" => $_POST['a'],
    "params2" => $_POST['b']
  );

  echo json_encode($arr);

?>
