<?php

  header('contsnt-type:text/html;charset=utf-8;');
  $conn = mysql_connect('localhost', 'root', 'root');
  if (!$conn) {
    die('error for mysql_connect: ' . mysql_error());
  }
  mysql_select_db('test1919');

  /*
    常见的操作数据库的语句

    查
      SELECT * FROM 表名
        + 返回这个表里的所有数据
      SELECT 字段名 FROM 表名
        + 查询表里的所有数据，只返回你需要的字段名称
      SELECT * FROM 表 WHERE 条件
        + 根据你的条件进行查询
      SELECT * FROM 表 WHERE 条件1 AND 条件2
        + 两个条件是并且的关系
      SELECT * FROM 表 WHERE 条件1 OR 条件2
        + 两个条件是或者的关系
      SELECT * FROM 表 WHERE 字段 LIKE %关键字%
        + 表示你查询的字段包含整个关键字的
      SELECT * FROM 表 ORDER BY 字段 (ASC || DESC)
        + 表示升序或者降序排列
        + ASC 升序
        + DESC 降序
      SELECT * FROM 表 LIMIT 从哪个索引开始, 查询多少个
        + 分页获取
  */

  // 1. 查询所有内容
  // $sql = 'SELECT * FROM `student`';

  // 2. 只要指定字段名称
  // $sql = 'SELECT `name`, `age` FROM `student`';

  // 3. WHERE 条件
  // $sql = 'SELECT * FROM `student` WHERE `age`>23';

  // 4. AND 并且
  // $sql = 'SELECT * FROM `student` WHERE `age`>20 AND `age`<23';

  // 5. OR 或者
  // $sql = 'SELECT * FROM `student` WHERE `score`>90 OR `score`<60';

  // 6. LIKE 模糊查询
  // $sql = "SELECT * FROM `student` WHERE `name` LIKE '%三%'";

  // 7. ORDER BY 排序
  // $sql = 'SELECT * FROM `student` ORDER BY `score` DESC';

  // 8. LIMIT 分页
  // $sql = 'SELECT * FROM `student` LIMIT 10, 10';

  // $res = mysql_query($sql);
  // $array = array();
  // while ($row = mysql_fetch_assoc($res)) {
  //   array_push($array, $row);
  // }
  // echo json_encode($array);


  /*
    增
      INSERT INTO 表 VALUES(你要插入的所有内容);
        + VALUES 里面写的内容要和字段的顺序一致
      INSERT INTO 表 (你准备插入哪一个字段) VALUES(你要插入的值);
  */

  // 1. 全部都要添加，并且按照顺序
  // $sql = "INSERT INTO `student` VALUES(null, '郭翔', 18, '男', 1919, 100, 2019)";

  // 2. 指添加指定字段
  // $sql = "INSERT INTO `student` (`name`, `age`) VALUES('郭翔', 18)";
  // $res = mysql_query($sql);
  // var_dump($res);


  /*
    删
      DELETE FROM 表 WHERE 条件
  */

  // $sql = 'DELETE FROM `student` WHERE `age`=20';
  // $res = mysql_query($sql);
  // var_dump($res);

  /*
    改
      UPDATE `student` SET 哪一个字段='值是什么' WHERE 条件
  */

  // $sql = 'UPDATE `student` SET `score`=95, `gender`="女" WHERE `age`>29';
  // $res = mysql_query($sql);
  // var_dump($res);
?>
