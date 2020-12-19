<?php

  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS");
  header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid');

  echo '跨域资源共享';

?>
