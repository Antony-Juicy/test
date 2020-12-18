// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// 获取元素
let tu = document.querySelector('.tu');

// //判断是否有传过id
let reg = /id=(\d+)/;
if (!reg.test(location.search)) { ////   location.search;  //返回当前 URL 的查询部分(问号 ? 之后的部分)。

  location.href = "http://localhost/item/web/html/list.html";
}
let id = reg.exec(location.search)[1];
// console.log(id);

// 拿到id   根据id 获取数据 渲染结构

pAjax({
  url: "../../php/xiangqinye.php",
  data: {
    id: id
  }

}).then(res => {
  //  console.log(res);
  fun(res.detail)

})

// 渲染结构
function fun(data) {
  // console.log(data);
  let datas = data
  console.log(datas);
  tu.innerHTML = `<div class="tutu">
  <img src="${datas.thumb}"
      id='tu1' alt="">

  <div id="tu2">

      <div class="product_detail">
          <div class="product_detail_pre bn"></div>
          <img src="${datas.img1}"
              alt="">
          <img src="${datas.img2}"
              alt="">
          <img src="${datas.img3}"
              alt="">
          <img src="${datas.img4}"
              alt="">
          <img src="${datas.img5}"
              alt="">

          <div class="product_detail_next bn"></div>
      </div>
  </div> 
</div>
<div class="product_info">
       <div class="product_info_name">
          ${datas.item_name}
      </div>
      <div class="product_info_model">
      ${datas.item_version_code}
      </div>
  <div class="product_info_desc"></div>
  <div class="product_info_price">¥${datas.price}</div>

  <div class="gg">

  <button class="product_info_none btn btn-warning btn-lg" id="go">立即购买</button>
  <button class="product_info_none btn btn-danger btn-lg" id="add">查看购物车</button>
  </div>
  
</div>
<div id="product_desc">
   <ul class="product_desc">
    <li class="product_desc_li">
      <p>
          <img src="${datas.desco}">

      </p>
   </li>
</ul>
`

  gee()
}

var tu1 = document.querySelector('#tu1');
var img1 = document.querySelectorAll('#tu2 img');

var pre = document.querySelector('.product_detail_pre');
var next = document.querySelector('.product_detail_next');
var tutu = document.querySelector(".tutu");
var product_info = document.querySelector(".product_info")

function gee() {
  var tu1 = document.querySelector('#tu1');
  var img1 = document.querySelectorAll('#tu2 img');

  var pre = document.querySelector('.product_detail_pre');
  var next = document.querySelector('.product_detail_next');
  var tutu = document.querySelector(".tutu");
  var product_info = document.querySelector(".product_info")
  img1.forEach((item, index) => {

    item.onmouseover = function () {
      tu1.src = this.src;
    }
  })

}
// 加入购物车

tu.onclick = function () {
  // console.log(1);
  // 因为添加到购物车按钮 需要把用户名和商品id
  // 所以需要判断是否有登录
  let e = window.event;
  if (e.target.id == "go") {
    location.href = "../html/car.html"
  }
  if (e.target.id == "add") {
    let login = getCookie('login');
  
    if (!login) {
      location.href = "../html/login.html" // 跳转到登入
      localStorage.setItem("url", 'http://localhost/item/web/html/xiangqinye.html?id=' + id); // 设置一个本地储存， 登入后好判断哪里跳转过来的
      return
    }
    // console.log(login, id);
    pAjax({
      url:'../../php/addCarData.php',
      data:{
        username:login,
        id:id
      }
    }).then(res=>{
      console.log(res);
    })
  }

}