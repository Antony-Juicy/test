var product = document.querySelector(".product_tab");
var nav = document.querySelector('#nav_w');
var produ = document.querySelector(".product_content");

$.ajax({
    url: "../../php/chanp.php",
    method: "get",
    dataType: "json",
    async: true,
    success: function (res) {
        // console.log(res);
        fn(res)
    }
})

// 渲染结构
function fn(data) {
    let ger = "";
    data.forEach((item, index) => {
        // console.log(item);
        ger += `<div class="product_content_div">
        <a href="./xiangqinye.html?id=${item.id}" class="aa">
            <div id="aaa">
                <img src="${item.thumb}"
                    alt="" class="product_content_icon">
            </div>
        </a>
        <span class="product_content_name">${item.item_name}</span>
        <span class="product_content_type">${item.item_version_code}</span>

    </div> `
    })

    produ.innerHTML = ger;
}