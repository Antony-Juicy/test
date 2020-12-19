<?php

    $username = $_POST['username'];
   
    $password = $_POST['password'];

    // $username = "bbbb";
    // $password = "1111";
   

    $con = mysqli_connect('localhost','root','123456','googdslist');
   
  
    $sql = "INSERT INTO `car` ( `username`, `password`) VALUES ('$username','$password');";

    $res = mysqli_query($con,$sql);
  
    if(!$res){
        print_r("注册失败");
    }else{
        print_r("注册成功");
    }
  
    // print_r($sql);
?>