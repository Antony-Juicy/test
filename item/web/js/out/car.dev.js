"use strict";

var container = document.querySelector('.container'); // 判断是否有登录

var login = getCookie('login'); // console.log(login);

if (!login) {
  location.href = 'http://localhost/item/web/html/login.html'; // 跳转到登入
  // 设置一个本地存储数据   登入哪里查看哪里跳转过来，登入成功在返回该界面

  localStorage.setItem('url', 'http://localhost/item/web/html/car.html');
} // 获取用户购物车中的数据


fun();

function fun() {
  var res;
  return regeneratorRuntime.async(function fun$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pAjax({
            url: "../../php/getCarData.php",
            data: {
              username: login
            }
          }));

        case 2:
          res = _context.sent;
          // 把获取出来的数据 存储在本地存储中  只能是字符串
          localStorage.setItem('Data', JSON.stringify(res)); // console.log(res);

          fn(res);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function fn(data) {
  var str; // data 请求出来的数据 有可能一条数据都没有 用索引来判断是否存在数据

  if (!data.length) {
    var _str; // console.log(data);


    _str = "<div class=\"jumbotron\">\n        <h1>\u4EB2\u7231\u7684\u7528\u6237</h1>\n        <p>\u60A8\u8D2D\u7269\u7A7A\u7A7A\u5982\u4E5F\uFF0C\u8BF7\u5230\u5217\u8868\u9875\u9009\u8D2D\u4F60\u5546\u54C1</p>\n        <p><a class=\"btn btn-primary btn-lg\" href=\"http://localhost/item/web/html/list.html\" role=\"button\">\u70B9\u51FB\u53BB\u5230\u5217\u8868\u9875</a></p>\n    </div>";
    container.innerHTML = _str;
    return;
  } // 渲染数据的时候 ，如果每一条的数据 is_select  都为1 的是，表示全选按钮被选上
  // 如果数组中的所有数据 都满足 item.is_select == '1'条件
  // allSelect = true，那么有其中一个不满足条件就为false


  var allSelect = data.every(function (item) {
    //检测数组所有元素是否都符合指定条件
    return item.is_select == 1;
  });
  console.log(allSelect);
  str = "<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <div class=\"content\">\n            <label for=\"\" class=\"checkbox\">\n                <input type=\"checkbox\" ".concat(allSelect ? 'checked' : '', " id=\"allChecked\">\n                <span>\u5168\u9009</span>\n            </label>\n            <label for=\"\" class=\"type\">\n                <span>\u5546\u54C1\u79CD\u7C7B\uFF1A</span>\n                <span>").concat(data.length, "</span>\n            </label>\n            <label for=\"\" class=\"qty\">\n                <span>\u6240\u9009\u5546\u54C1\u6570\u91CF\uFF1A</span>\n                <span>0</span>\n            </label>\n            <label for=\"\" class=\"price\">\n                <span>\u6240\u9009\u5546\u54C1\u4ECB\u4E2A\uFF1A</span>\n                <span>0</span>\n            </label>\n            <label for=\"\">\n                <button class=\"btn btn-warning btn-xs\"id=\"pay\">\u7ED3\u7B97</button>\n                <button class=\"btn btn-info btn-xs\" id=\"clear\">\u6E05\u7A7A\u8D2D\u7269\u8F66</button>\n            </label>\n        </div>\n    </div>\n    <div class=\"panel-body\">\n        <ul>"); // 询循环data拼接li结构

  data.forEach(function (item) {
    // console.log(item);
    str += " <li>\n<div class=\"media\">\n       <div class=\"media-left media-middle\">\n           <input type=\"checkbox\" ".concat(item.is_select == 1 ? 'checked' : "", " id=\"select\">\n           <a href=\"#\">\n               <img class=\"media-object\"\n                   src=\"").concat(item.thumb, "\"\n                   alt=\"\">\n           </a>\n       </div>\n       <div class=\"media-body\">\n           <h4 class=\"media-heading\">").concat(item.item_name, "</h4>\n           <div class=\"price\">\n               <i class=\"glyphicon glyphicon-yen\"></i>\n               <span>").concat(item.price, "</span>\n           </div>\n           <div class=\"btn\">\n               <p>\n                   <butto class=\"btn btn-danger\" data_id=\"").concat(item.id, "\"id=\"delete\">\u5220\u9664\u5546\u54C1</butto>\n               </p>\n               <div class=\"btn-group\" role=\"group\" data_id=\"").concat(item.id, "\" aria-label=\"...\">\n                   <button class=\"btn btn-default\" id=\"reduce\">-</button>\n                   <button class=\"btn btn-default\">").concat(item.cart_number, "</button>\n                   <button class=\"btn btn-default\" id=\"add\">+</button>\n               </div>\n           </div>\n       </div>\n   </div>\n</li>");
    str += "</ul>\n</div>\n</div>\n";
    container.innerHTML = str;
  });
} // 利用事件委托绑定点击事件


container.onclick = function (e) {
  e = e || window.event;
  var ger = e.target; // 保存  当前点击那个元素
  // console.log(ger);

  var id, goods_num; //  存起来等会传过去服务的

  switch (ger.id) {
    case 'add':
      // 添加数量
      // 需要把用户名 商品id 和 商品的数量传递给后端
      id = ger.parentNode.getAttribute("data_id");
      goods_num = ger.previousElementSibling.innerHTML * 1 + 1; // 上一个兄弟元素

      console.log(goods_num); //   渲染

      addd(login, id, goods_num); //   console.log("添加数量");

      break;

    case 'reduce':
      // 减少数量
      id = ger.parentNode.getAttribute("data_id");
      goods_num = ger.nextElementSibling.innerHTML * 1 - 1; // 下一个兄弟元素

      console.log(goods_num);

      if (goods_num <= 1) {
        goods_num = 1;
      }

      addd(login, id, goods_num); // console.log("减少数量");

      break;

    case 'delete':
      id = ger.getAttribute("data_id"); // 调用  请求的数据

      removeData(login, id);
      console.log("删除数量");
      break;

    case 'allChecked':
      console.log("全选");
      break;

    case 'select':
      console.log("单选");
      break;

    case 'pay':
      console.log("结算");
      break;

    case 'clear':
      console.log("清空");
      break;
  }
}; //  请求数据  增加数量


function addd(username, id, goods_num) {
  var res, Data;
  return regeneratorRuntime.async(function addd$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pAjax({
            url: "../../php/updCarData.php",
            data: {
              username: username,
              id: id,
              goods_num: goods_num
            }
          }));

        case 2:
          res = _context2.sent;
          // console.log(res);
          // 更改完数据库中的数据之后，也需要更改本地存储中的数据  第二种
          Data = JSON.parse(localStorage.getItem('Data')); //  获取本地存储的数据
          // console.log(Data);

          Data.forEach(function (item) {
            if (item.id === id) {
              item.cart_number = goods_num; // 
            }
          });
          fn(Data); //  渲染结构  把当前的数据 传递给渲染页面的函数渲染
          // 在把这条数据存进本地存储  把更改的数据存入本地

          localStorage.setItem('Data', JSON.stringify(Data)); // cart_number数量与购物车数量一样

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
} // 请求数据  删除商品数据


function removeData(username, id) {
  var res, Data;
  return regeneratorRuntime.async(function removeData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(pAjax({
            url: '../../php/removeCarData.php',
            data: {
              username: username,
              id: id
            }
          }));

        case 2:
          res = _context3.sent;
          console.log(res);
          Data = JSON.parse(locationbar.getItem("Data"));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}