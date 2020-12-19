let news = document.querySelector('#news_list');
// console.log(news);
// https://www.cherry.cn/news/get_news_list/
// let xhr = new XMLHttpRequest();
// xhr.open("get", `/xin?page=2`);
// // // 必须设置请求头的参数的格式
// // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// xhr.send(); // 发送请求

// xhr.onload = function () {

//     //JSON字符串转换为JS对象
//     let ger = JSON.parse(xhr.responseText); // 需要转换数据

//     console.log(ger);
//     // 请求数据 渲染   // 当请求数据渲染完成之后就又可以请求数据
// }


// 请求数据
$.ajax({
    url: "../../php/xinwen.php",
    method: "get",
    dataType: "json",
    async: true,
    success: function (res) {
        console.log(res);
        fn(res)
    }
})

function fn(data) {
    let str = '';
    data.forEach((item, index) => {
        console.log(item);

        str += `<div class="news_list">
        <div class="news_list_img_dispose">
            <img src="${item.thumb}"
                alt="" class="news_list_img">
        </div>
        <div class="news_list_div">
            <span class="news_list_title">${item.title}</span>
            <span class="news_list_desc">${item.updated_at}</span>
        </div>
    </div>  `
    })
    news.innerHTML = str
}