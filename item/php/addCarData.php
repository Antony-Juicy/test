<?php
// # 用户名 商品id
$username = $_GET['username'];
$id = $_GET['id'];
$con = mysqli_connect('localhost', 'root', '123456', 'students');


$sql = "SELECT * FROM `userlist` WHERE `username`= '$username' AND `id`='$id'";
$res = mysqli_query($con, $sql);

if (!$res) {
    die('error for mysql'. mysqli_error());
}
$row = mysqli_fetch_assoc($res);

// print_r($row);
//如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
if ($row) {
    $goodsNum = $row['goods_num']+ 1;
    $res2 = mysqli_query($con, "UPDATE `userlist` SET `goods_num` = '$goodsNum'  WHERE `username`='$username' AND `id`='$id'");
} else {
    // # 如果不存在，就往userlist表中 添加数据
    $res2 = mysqli_query($con, "INSERT INTO `userlist` (`id`, `username`, `goods_num`) VALUES ('$id', '$username', '1')");
}
if ($res2) {
    echo json_encode(array("code" => true, "msg" => "添加数据成功"));
}

?>