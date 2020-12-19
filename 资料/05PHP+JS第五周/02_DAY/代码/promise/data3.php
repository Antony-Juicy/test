<?php

  $result = $_GET['result'];
  $data = $_GET['data'];

  echo json_encode(array(
    'result' => $result * $data,
    'msg' => 'endding'
  ));

?>
