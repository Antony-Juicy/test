# 购物车案例

## 1、列表页:hamburger: 

### (1)分页器，async await
```javascript
//用于数据库截取数据
let defInfo = {
    pagenum: 1, // 当前页数
    pagesize: 32, // 每页多少条
    total: '', // 数据总数
    totalpage: '' // 页码总数
}
//【注意点1】分页器必须等到获取数据完，得到数据的总数，才能确定分页，所以又需要一个async，await，即是这个init异步函数
init();
async function init() {
    await new Promise(function (resolve, reject) {
        //【注意点2】这里一直没有完成，所以不会执行下面的代码,将resolve穿到getData中。
        getData(resolve);
    });
    //这里将初始数据作为实参传给page
    renderPage(defInfo);
}

//得到的数据总数要给分页器使用
async function getData(resolve) {
    let lists = await pAjax({
        //【注意点3】这边url直接拼接会使得传输过去多一个问号，具体错误未知，所以改为传输一个对象。传过去需要截取的数据。如0~29，30~59。
        url: `../api/getData.php`,
        data: {
            start: defInfo.pagenum,
            len: defInfo.pagesize
        }

    });
    // if (resolve) {
        resolve();
    // }

    //将获得的数据给到defInfo
    defInfo.total = lists.total.count;
    defInfo.totalpage = Math.ceil(defInfo.total / defInfo.pagesize);
    // console.log(lists);

    //获取数据之后渲染页面
    addHtml(lists.list);
    //点击查看购物车判断是否登录
    goTo();
}


//分页器
function renderPage(info) {
    new Pagination(page, {
        pageInfo: {
            pagenum: info.pagenum, // 当前页数
            pagesize: info.pagesize, // 每页多少条
            total: info.total, // 数据总数
            totalpage: info.totalpage // 页码总数
        },
        //改变的时候重新获取数据，且跳到相应的页面
        change(n) {
            defInfo.pagenum = n;
            //【注意点4】这里不能return，否则跳转不回第一页
            // n = 1 的时候不需要调用
            // if (n === 1) return;
            //这里重新获取数据必须创建一个新的promise
            new Promise(function (resolve, reject) {
                getData(resolve);
            });
            // getData();
            scrollTo({
                top: 0
            })
        }
    })
}
```
### (2) 使用.then方式写法

```javascript
// 此方法不用传resolve参数
// 第一次请求数据 ajax调用
pAjax({
    url: `../api/getData.php`,
    data: {
        start: defInfo.pagenum,
        len: defInfo.pagesize
    },
}).then(function (list) {
    defInfo.total = list.total.count;
    defInfo.totalpage = Math.ceil(defInfo.total / defInfo.pagesize);
    console.log(defInfo);
    renderPage(defInfo);
    // renderHtml(list.list);
    // 渲染数据。浏览器一打开时候渲染数据
})
```

### (3)登录注意事项

```javascript
//判断是否登录
function goTo() {
    let btn = $$('.a1');
    btn.forEach((item) => {
        item.onclick = () => {
            let cookie = getCookie('login');
            if (cookie) {
                item.href = '../html/car.html';
            } else {
                //window.location.href就是当前路径，带着当前路径去登陆
                item.href = './login.html?pathname=' + window.location.href;
            }
        }
    })
}
```



## 2、登录页面:hamburger: 

```javascript
// 打开登录页面，如果已经登录过，应该直接去首页
let login = getCookie('login');
if (login) {
    window.location.href = '../index.html'
}

let form = document.querySelector('form');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
// 绑定表单提交事件
form.onsubmit = async function (e) {
    e = e || window.event;
    e.returnValue = false;

    // 发送ajax请求判断是否登录成功
    let res = await pAjax({
        url: '../api/login.php',
        type: 'post',
        data: {
            username: username.value,
            password: password.value
        }
    })
    if (res.code === 1) {
        // 表示登录成功
        // 把当前的用户名 存储的cookie中
        setCookie('login', username.value)
        // 【注意点】还需把url地址切回刚刚来的页面
        // 正则：.除换行字符 *表示0~正无穷  （）返回一个参数，内容为里面的内容
        let reg = /pathname=(.*)/;
        if (reg.test(window.location.search)) {
            //reg.exec(window.location.search)[1]为传过来的路径
            window.location.href = reg.exec(window.location.search)[1];
        } else {
            window.location.href = '../index.html'
        }
    }
}
```

## 3、详情页:hamburger: 

### (1)判断是否是列表页跳转

```javascript
/*
    如果直接访问详情页
        没有把商品的id携带过去。显示详情页没数据
    如果从列表页去到详情页，把商品的id传递
        根据传递过来的id获商品
*/

let box = document.querySelector('.container');
// 判断url地址是否携带id参数
let reg = /id=(\d+)/;
let goods_id;
//【注意点：】如果不携带参数则渲染去列表页的结构
if (!reg.test(window.location.search)) {
    box.innerHTML = `<div class="jumbotron">
    <h1>你还没有选择商品，请去列表页选择</h1>
    <p>...</p>
    <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">去列表页</a></p>
  </div>`
} else {
    // 获取id 
    goods_id = reg.exec(window.location.search)[1];
    //getData()去后端获取数据商品数据，并且渲染页面的异步函数
    getData(goods_id)
}
```

### (2)加入购物车按钮

```javascript
// 点击加入购物车
// 这个位置是获取不到addCar这个元素（渲染的过程是一个异步的程序）
// 当还没有渲染完成，这个获取元素 的代码已经执行
// 页面中没有addCar这个元素，就获取不到

//利用事件委托的形式 把这个点击事件绑定在已经存在页面中的元素
box.onclick = function (e) {
    e = e || window.event;
    if (e.target.id === 'addCar') {
        // 判断是否有登录
        // 如果有登录 了的情况直接把数据 添加到 购物车
        // 如果没有登录，提示先登录在加入购物车
        // 获取cookie值，是否有登录的属性

        let login = getCookie('login');
        if (!login) {
            // 进入这条代码的时候说明没有登录。提示进行登录，并且取到login.html
            alert('您还没有登录，请登录之后再加入购物车！')
            window.location.href = './login.html?pathname=' + window.location.href;
        }
        addCarData(login, goods_id);
    }
}
//【注意点】直接将数据添加到数据库，前端页面没有变化。
async function addCarData(username, goods_id) {
    // 发送ajax请求
    let res = await pAjax({
        url: '../api/addCarData.php',
        data: {
            username,
            goods_id
        }
    });
}
```

## 4、购物车页面:hamburger: 

### (1)获取数据

```javascript
getData();
//获取此用户的数据
async function getData() {
  let res = await pAjax({
    //传进一个用户名，看看这个用户有没有选择商品
    url: '../api/getCarData.php',
    data: {
      username: login
    }
  });
  // console.log(res);
  //将数据保存到本地 【注意点】JSON.stringify()将JS数据转化为JSON数据。
  localStorage.setItem('carData', JSON.stringify(res));
   //将库里对应用户选择的商品等数据作为实参传递到下面进行页面渲染
  addHtml(res);
}
```

### (2)渲染数据

- 代码结构没有完整copy，注意。

```javascript
function addHtml(data) {
  //如果数据库里有这个用户数据，就渲染页面，否则就显示没有商品
  //【注意点1】这里需要!data[0],如果是!data会一直是false;data是个数组，虽然是空数组，但是判定的是true
  let str; //这个局部的全局变量
  if (!data[0]) {
    str = `<div id="isNull">
    <div class="panel panel-default">
        <div class="panel-heading">购物车没有商品噢</div>
        <div class="panel-body">
         <a href="../html/lists.html"><button class="btn btn-danger">到列表页看看吧</button></a>
        </div>
      </div>
</div>`
    container.innerHTML = str;
    return;
  }
 //【注意点2】用的是bootstrap面板，渲染分为三部分，头部不写为静态页面是因为其也要根据数据变化
 //【注意点3】这部分代码，写的是部分全选按钮的判断，要在渲染时判断是否添加"checked"，是易忘点
    //当所有的is_select为1时，全选框才会选中
  
    
    //此部分为头部
    //selectShop()函数返回值是一个obj,包含了商品总数量和价格
    let allChecked = data.every(item => {
    return item.is_select == '1';
  })
  str = `<div class="panel panel-default box">
  <div class="panel-heading">
    <label for="checkbox"><input type="checkbox" class="carBigC"  ${allChecked?'checked':''}><span>&ensp;全选</span></label>
    <div><span>商品种类：</span><span>${data.length}</span></div>
    <div><span>所选商品数量：</span><span>${selectShop(data).qty}</span></div>
    <div><span>所选商品价格：</span><span>${selectShop(data).totalPrice}</span></div>
    <div><button class="btn btn-warning btn-xs total" >结算</button><button class="btn btn-danger btn-xs clear"
        style="margin-left: 10px;">清空购物车</button></div>
  </div>
  <div class="panel-body">
    <ul class="media-list">`
  
  //中间使用forEach循环渲染数据
  
  //尾部
    str += `</ul>
    </div>
    </div>`
  container.innerHTML = str;
```

### (3)点击事件 [重点]

```javascript
// 利用事件委托实现点击事件
//老师使用id是更好的，因为class名有绝大可能会变化
/* 
  1、当改变的时候，要改变数据库与本地储存中的数据，不能单单只改变html
  2、需要在渲染的时候添加相应的属性属性值，比如获取到goods_id，与checked等
      【1】加和减是更新用户的数据，所以需要传递(username goods_id goods_num)
          渲染时，需要在父元素身上设置一个商品的id值，从父元素身上拿取。
          改变数量可以使用同一个函数
      【2】单选和多选改变的是 **本地储存** is_select的值。 (username  is_select) 如果是改变数据库里的值，则会让其他登录用户购物车显示没有选择的商品。
      【3】删除某一件商品 (username goods_id) 在此元素身上设置一个商品的id值
      【4】结算 是选中的商品，结算所有的价格 删去选中的商品 
      【5】清空是删除这个用户的所有数据 (username)
*/
container.onclick = function (e) {
  e = e || window.event;
  let t = e.target;
  //stock 库存
  let goods_id, goods_num, stock;
  
    switch (t.className) {
    //【加】
    case 'btn btn-default add':
      //获得当前操作商品的id值
      goods_id = t.parentNode.getAttribute('data_id');
      //改变数值
      goods_num = t.previousElementSibling.innerHTML * 1 + 1;
      //购买的最大值只能是库存值
      stock = t.parentNode.getAttribute('stock');
      if (goods_num > stock) {
        goods_num = stock;
        alert('库存不足，最多只能买这么多喽')
      }
      //改变数据库数据与本地数据，并且渲染结构
      changeQty(login, goods_id, goods_num);
      break;
      
      //【减】
    case 'btn btn-default subtract':
      goods_id = t.parentNode.getAttribute('data_id');
      goods_num = t.nextElementSibling.innerHTML * 1 - 1;
      //判断 goods_num的值不能小于1
      if (goods_num <= 1) {
        goods_num = 1;
      }
      changeQty(login, goods_id, goods_num);
      break;

      //【单选】
    case 'carCheckbox':
      goods_id = t.getAttribute('data_id');
      let carData = JSON.parse(localStorage.getItem('carData'));
      carData.forEach(item => {
        if (item.goods_id == goods_id) {
          //如果选中了就是true,把1赋值给item.is_select，否则就是0
          item.is_select = t.checked ? 1 : 0;
        }
      });
      addHtml(carData);
      localStorage.setItem('carData', JSON.stringify(carData));
      break;
      //【多选】 (更改所有的is_select的值)
    case 'carBigC':
      let carData1 = JSON.parse(localStorage.getItem('carData'));
      carData1.forEach(item => {
        item.is_select = t.checked ? 1 : 0;
      })
      addHtml(carData1);
      localStorage.setItem('carData', JSON.stringify(carData1));
      break;

      //【删除】
    case 'btn btn-danger delete':
      goods_id = t.getAttribute('data_id');
      removeData(login, goods_id);
      break;

      //【结算】
    case 'btn btn-warning btn-xs total':
      //【问题1】问题出现在这里，不能通过点击结算按钮获取到商品的id
      // goods_id = t.getAttribute('data_id')
      //从本地储存获取到数据，再挑选出is_select为1的进行结算
      let data = JSON.parse(localStorage.getItem('carData'));

      alert('您已成功支付' + selectShop(data).totalPrice + '元');
      //【老师做法】结算后清除选中的商品，改变本地储存（使用forEach循环，选出is_select为1的商品，将id与username传给removerData函数）
      data.forEach(
        async item => {
          if (item.is_select == 1) {
            console.log(item);
            let res = await pAjax({
              url: '../api/removeCarData.php',
              data: {
                username: login,
                goods_id: item.goods_id
              }
            });
            //【问题2】：这里重新获取了本地存储的值，不管是否勾选都有打印
            let carData = JSON.parse(localStorage.getItem('carData'));
            console.log(carData);
            carData = carData.filter(item1 => {
              return item1.is_select !== 1;
            })
            addHtml(carData);
            //更新本地储存 
            localStorage.setItem('carData', JSON.stringify(carData));
          }
        })
      break;
      //【清空】
    case 'btn btn-danger btn-xs clear':
      clearData();
      break;
  }
```

#### (3-1) 异步函数 [绝大部分为数据库与本地数据的修改]

```javascript
async function changeQty(username, goods_id, goods_num) {
  //更改数据库中的数据
  let res = await pAjax({
    url: '../api/updCarData.php',
    data: {
      username,
      goods_id,
      goods_num
    }
  });
  //获得本地的数据且改变
  let carData = JSON.parse(localStorage.getItem('carData'));
  carData.forEach(item => {
    if (item.goods_id === goods_id) {
      item.cart_number = goods_num;
    }
  });
  //再次渲染结构
  addHtml(carData);
  //将改变的数据存入本地
  localStorage.setItem('carData', JSON.stringify(carData));
}


async function removeData(username, goods_id) {
  // console.log(1);
  let res = await pAjax({
    url: '../api/removeCarData.php',
    data: {
      username,
      goods_id
    }
  });
  //JSON.parse不要漏掉
  let carData = JSON.parse(localStorage.getItem('carData'));

  //过滤出没有被删除的数据
  carData = carData.filter(item => {
    // 当item.goods_id === goods_id 这条数据被删除,将返回值重新赋值给carData
    return item.goods_id !== goods_id;
  })
  //渲染
  addHtml(carData);

  //更新本地储存 (写死的结构这里就会出现问题)
  localStorage.setItem('carData', JSON.stringify(carData));
}




async function clearData() {
  let res = await pAjax({
    url: '../api/clearCarData.php',
    data: {
      username: login
    }
  });
  //清除成功，后端返回的res.code为true
  if (res.code) {
    localStorage.removeItem('carData');
    //渲染时要传个空数组
    addHtml([]);
  }
}


//结算
function selectShop(data) {
  //过滤出is_select为1的值
  data = data.filter(item => {
    return item.is_select == 1;
  })
  //总数量和总价格
  obj = {
    qty: 0,
    totalPrice: 0
  }
  data.forEach(item1 => {
    obj.qty += item1.cart_number * 1;
    obj.totalPrice += item1.goods_price * item1.cart_number
  })
  return obj;
}
```







