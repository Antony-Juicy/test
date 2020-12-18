"use strict";

var product = document.querySelector(".product_tab");
var nav = document.querySelector('#nav_w');
var produ = document.querySelector(".product_content");
$.ajax({
  url: "../../php/chanp.php",
  method: "get",
  dataType: "json",
  async: true,
  success: function success(res) {
    // console.log(res);
    fn(res);
  }
}); // 渲染结构

function fn(data) {
  var ger = "";
  data.forEach(function (item, index) {
    // console.log(item);
    ger += "<div class=\"product_content_div\">\n        <a href=\"./xiangqinye.html?id=".concat(item.id, "\" class=\"aa\">\n            <div id=\"aaa\">\n                <img src=\"").concat(item.thumb, "\"\n                    alt=\"\" class=\"product_content_icon\">\n            </div>\n        </a>\n        <span class=\"product_content_name\">").concat(item.item_name, "</span>\n        <span class=\"product_content_type\">").concat(item.item_version_code, "</span>\n\n    </div> ");
  });
  produ.innerHTML = ger;
}