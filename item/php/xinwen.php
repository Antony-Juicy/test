<?php
$con = mysqli_connect('localhost','root','123456','students');
  
// #设置SQL语句
$sql = "SELECT * FROM `weixin`";

// # 执行SQL语句
$res=mysqli_query($con,$sql);

$arr=array();

$row=mysqli_fetch_assoc($res);

while($row){
    array_push($arr,$row);
    $row=mysqli_fetch_assoc($res);
}
print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));

?>
