let container = document.querySelector('.container');

// 判断是否有登录
let login = getCookie('login');
// console.log(login);
if (!login) {
    location.href = 'http://8.129.134.77/item/web/html/login.html'; // 跳转到登入

    // 设置一个本地存储数据   登入哪里查看哪里跳转过来，登入成功在返回该界面
    localStorage.setItem('url', 'http://8.129.134.77/item/web/html/car.html');

}
// 获取用户购物车中的数据
fun();
async function fun() {
    let res = await pAjax({
        url: "../../php/getCarData.php",
        data: {
            username: login
        }
    });
    // 把获取出来的数据 存储在本地存储中  只能是字符串
    localStorage.setItem('Data', JSON.stringify(res));
    // console.log(res);
    fn(res)

}

function fn(data) {
    let str;
    // data 请求出来的数据 有可能一条数据都没有 用索引来判断是否存在数据

    if (!data.length) {
        let str;
        // console.log(data);
        str = `<div class="jumbotron">
        <h1>亲爱的用户</h1>
        <p>您购物空空如也，请到列表页选购你商品</p>
        <p><a class="btn btn-primary btn-lg" href="../html/list.html" role="button">点击去到列表页</a></p>
    </div>`;
        container.innerHTML = str;
        return
    }
    // 渲染数据的时候 ，如果每一条的数据 is_select  都为1 的是，表示全选按钮被选上
    // 如果数组中的所有数据 都满足 item.is_select == '1'条件
    // allSelect = true，那么有其中一个不满足条件就为false

    let allSelect = data.every(item => { //检测数组所有元素是否都符合指定条件
        return item.is_select == "1";
    });
    // console.logallSelect);

    let total = shopNum(data);

    str = `<div class="panel panel-default">
    <div class="panel-heading">
        <div class="content">
            <label for="" class="checkbox">
                <input type="checkbox" ${allSelect ? 'checked' : ''} id="allChecked">
                <span>全选</span>
            </label>
            <label for="" class="type">
                <span>商品种类：</span>
                <span>${data.length}</span>
            </label>
            <label for="" class="qty">
                <span>所选商品数量：</span>
                <span>${total.tota1Num}</span>
            </label>
            <label for="" class="price">
                <span>所选商品价格：</span>
                <span>${total.totalPrice}</span>
            </label>
            <label for="">
                <button class="btn btn-warning btn-xs"id="pay">结算</button>
                <button class="btn btn-info btn-xs" id="clear">清空购物车</button>
            </label>
        </div>
    </div>
    <div class="panel-body">
        <ul>`;
    // 询循环data拼接li结构
    data.forEach(item => {
        // console.log(item);
        str += ` <li>
<div class="media">
       <div class="media-left media-middle">
           <input  data_id="${item.id}"type="checkbox" ${item.is_select == 1 ? 'checked' : ""} id="select">
           <a href="#">
               <img class="media-object"
                   src="${item.thumb}"
                   alt="">
           </a>
       </div>
       <div class="media-body">
           <h4 class="media-heading">${item.item_name}</h4>
           <div class="price">
               <i class="glyphicon glyphicon-yen"></i>
               <span>${item.price}</span>
           </div>
           <div class="btn">
               <p>
                   <butto class="btn btn-danger" data_id="${item.id}"id="delete">删除商品</butto>
               </p>
               <div class="btn-group" role="group" data_id="${item.id}" aria-label="...">
                   <button class="btn btn-default" id="reduce">-</button>
                   <button class="btn btn-default">${item.cart_number}</button>
                   <button class="btn btn-default" id="add">+</button>
               </div>
           </div>
       </div>
   </div>
</li>`;
    })
    str += `</ul>
</div>
</div>
`;
    container.innerHTML = str;


}
// 利用事件委托绑定点击事件
container.onclick = function (e) {
    e = e || window.event;
    event.stopPropagation()
    let ger = e.target; // 保存  当前点击那个元素

    // console.log(ger);
    let id, goods_num //  存起来等会传过去服务的
    switch (ger.id) {
        case 'add': // 添加数量
            // 需要把用户名 商品id 和 商品的数量传递给后端
            id = ger.parentNode.getAttribute("data_id");
            goods_num = ger.previousElementSibling.innerHTML * 1 + 1; // 上一个兄弟元素

            // console.log(goods_num);

            // 调用  请求的数据
            addd(login, id, goods_num)
            //   console.log("添加数量");
            break;

        case 'reduce': // 减少数量

            id = ger.parentNode.getAttribute("data_id");
            goods_num = ger.nextElementSibling.innerHTML * 1 - 1; // 下一个兄弟元素

            if (goods_num <= 1) {
                goods_num = 1;
            }
            addd(login, id, goods_num)
            // console.log("减少数量");
            break;

        case 'delete': // 删除商品

            id = ger.getAttribute("data_id");
            // console.log(id);

            // 调用  请求的数据
            removeData(login, id)
            break;

        case 'allChecked': //  全选
            // 获取本地存储中的数据 更改每一条数据的 is_select:1
            let Data = JSON.parse(localStorage.getItem('Data'));
            Data.forEach(item => {
                item.is_select = ger.checked ? 1 : 0
            });
            fn(Data)
            localStorage.setItem('Data', JSON.stringify(Data)); // 更新本地储存
            // console.log("全选");
            break;

        case 'select': // 单选
            id = ger.getAttribute('data_id');

            let Data1 = JSON.parse(localStorage.getItem('Data'));
            Data1.forEach(item => {
                if (item.id == id) {
                    item.is_select = ger.checked ? 1 : 0
                }
            })
            fn(Data1);
            localStorage.setItem('Data', JSON.stringify(Data1));
            // console.log("单选");
            break;

        case 'pay': //   结算
            shopNum(data)
            console.log("结算");
            break;

        case 'clear': //  清空
            clearData(login)
            console.log("清空");
            break;

    }
}

//  请求数据  增加数量
async function addd(username, id, goods_num) {
    let res = await pAjax({
        url: "../../php/updCarData.php",
        data: {
            username,
            id,
            goods_num
        }
    });
    // console.log(res);
    // 更改完数据库中的数据之后，也需要更改本地存储中的数据  第二种
    let Data = JSON.parse(localStorage.getItem('Data')); //  获取本地存储的数据
    // console.log(Data);
    Data.forEach(item => {
        if (item.id == id) {
            item.cart_number = goods_num; // 
        }
    });
    fn(Data) //  渲染结构  把当前的数据 传递给渲染页面的函数渲染

    // 在把这条数据存进本地存储  把更改的数据存入本地
    localStorage.setItem('Data', JSON.stringify(Data)); // cart_number数量与购物车数量一样

}

// 请求数据  删除商品数据
async function removeData(username, id) {

    let res = await pAjax({
        url: '../../php/removeCarData.php',
        data: {
            username,
            id
        }
    });
    // console.log(res);

    // 更新本地存储中的数据
    let Data = JSON.parse(localStorage.getItem('Data'));
    Data = Data.filter(item => {
        // 当item.id === id 这条数据被删除  
        return item.id !== id
    });
    fn(Data) //  渲染结构 

    localStorage.setItem('Data', JSON.stringify(Data));
}


//  清空数据  
async function clearData(username) {
    let res = await pAjax({
        url: '../../php/clearCarData.php',
        data: {
            username
        }
    });
    if (res.code) {
        // 当数据从数据库中删除成功的时候，需要把本地存储中的数据也要删除
        localStorage.removeItem('Data');
        // 当数据删除成功，需要传递一个空数组给renderHtml函数
        fn([]);
    }

}

//  结算
function shopNum(arr) {

    let re = arr.filter(item => {
        return item.is_select == 1
    })
    console.log(re);
    // 计算选中商品的数量
    let tota1Num = re.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);
    console.log(tota1Num);

    // 计算商品总价
    let totalPrice = re.reduce((pre, item) => {
        return pre + item.price * item.cart_number
    }, 0)
    return {
        tota1Num,
        totalPrice
    }
    console.log(totalPrice);
}