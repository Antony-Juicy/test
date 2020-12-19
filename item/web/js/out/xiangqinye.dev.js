"use strict";

// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染
// 获取元素
var tu = document.querySelector('.tu'); // //判断是否有传过id

var reg = /id=(\d+)/;

if (!reg.test(location.search)) {
  ////   location.search;  //返回当前 URL 的查询部分(问号 ? 之后的部分)。
  location.href = "http://localhost/item/web/html/list.html";
}

var id = reg.exec(location.search)[1]; // console.log(id);
// 拿到id   根据id 获取数据 渲染结构

pAjax({
  url: "../../php/xiangqinye.php",
  data: {
    id: id
  }
}).then(function (res) {
  //  console.log(res);
  fun(res.detail);
}); // 渲染结构

function fun(data) {
  // console.log(data);
  var datas = data;
  console.log(datas);
  tu.innerHTML = "<div class=\"tutu\">\n  <img src=\"".concat(datas.thumb, "\"\n      id='tu1' alt=\"\">\n\n  <div id=\"tu2\">\n\n      <div class=\"product_detail\">\n          <div class=\"product_detail_pre bn\"></div>\n          <img src=\"").concat(datas.img1, "\"\n              alt=\"\">\n          <img src=\"").concat(datas.img2, "\"\n              alt=\"\">\n          <img src=\"").concat(datas.img3, "\"\n              alt=\"\">\n          <img src=\"").concat(datas.img4, "\"\n              alt=\"\">\n          <img src=\"").concat(datas.img5, "\"\n              alt=\"\">\n\n          <div class=\"product_detail_next bn\"></div>\n      </div>\n  </div> \n</div>\n<div class=\"product_info\">\n      { <div class=\"product_info_name\">\n          ").concat(datas.item_name, "\n      </div>}\n      <div class=\"product_info_model\">\n      ").concat(datas.item_version_code, "\n      </div>\n  <div class=\"product_info_desc\"></div>\n  <div class=\"product_info_price\">\xA5").concat(datas.price, "</div>\n\n  <div class=\"gg\">\n\n  <button class=\"product_info_none btn btn-warning btn-lg\" id=\"go\",>\u7ACB\u5373\u8D2D\u4E70</button>\n  <button class=\"product_info_none btn btn-danger btn-lg\" id=\"add\">\u67E5\u770B\u8D2D\u7269\u8F66</button>\n  </div>\n  \n</div>\n<div id=\"product_desc\">\n   <ul class=\"product_desc\">\n    <li class=\"product_desc_li\">\n      <p>\n          <img src=\"").concat(datas.desco, "\">\n\n      </p>\n   </li>\n</ul>\n");
  gee();
}

var tu1 = document.querySelector('#tu1');
var img1 = document.querySelectorAll('#tu2 img');
var pre = document.querySelector('.product_detail_pre');
var next = document.querySelector('.product_detail_next');
var tutu = document.querySelector(".tutu");
var product_info = document.querySelector(".product_info");

function gee() {
  var tu1 = document.querySelector('#tu1');
  var img1 = document.querySelectorAll('#tu2 img');
  var pre = document.querySelector('.product_detail_pre');
  var next = document.querySelector('.product_detail_next');
  var tutu = document.querySelector(".tutu");
  var product_info = document.querySelector(".product_info");
  img1.forEach(function (item, index) {
    item.onmouseover = function () {
      tu1.src = this.src;
    };
  });
} // 加入购物车


tu.onclick = function () {
  // console.log(1);
  // 因为添加到购物车按钮 需要把用户名和商品id
  // 所以需要判断是否有登录
  var e = window.event;

  if (e.target.id == "go") {
    location.href = "../html/car.html";
  }

  if (e.target.id == "add") {
    var login = getCookie('login');

    if (!login) {
      location.href = "../html/login.html"; // 跳转到登入

      localStorage.setItem("url", 'http://localhost/item/web/html/xiangqinye.html?id=' + id); // 设置一个本地储存， 登入后好判断哪里跳转过来的

      return;
    } // console.log(login, id);


    pAjax({
      url: '../../php/addCarData.php',
      data: {
        username: login,
        id: id
      }
    }).then(function (res) {
      console.log(res);
    });
  }
};