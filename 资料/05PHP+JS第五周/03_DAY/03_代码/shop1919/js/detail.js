// console.log(123)

/*
  当你访问一个链接地址的时候
    除了域名端口号传输协议要写
    还有一些东西可以选择性的写
    queryString 查询字符串
      + 当我来到一个页面以后携带的一些信息
      + 以 ? 后面开始进行拼接
*/

// 在地址栏以参数的形式把你点击的哪一个商品的 id 携带过来了
// 我要拿到你那个地址栏里面传递的信息

// js 操作地址栏
// console.log(window.location.search)

// 正则
// () 做一个分组
//    和 exec 这个方法使用的时候，能单独捕获
const reg = /id=(\d+)/
// console.log(reg.exec(window.location.search))

// 如果他没有携带 id 参数，我要做什么
// 如果他携带了 id 参数，我要做什么

// 判断一下他有没有携带参数
if (!reg.test(window.location.search)) {
  // 证明没有携带
  // console.log('没有参数')
  window.location.href = './list.html'
}

// 拿到这个 id 是多少
const id = reg.exec(window.location.search)[1]

// 获取元素
const goods_box = document.querySelector('.goods_box')
const goods_info = document.querySelector('.goods_info')

// 使用 id 去获取某一条数据的详细信息
getDetail()
async function getDetail() {
  const res = await pAjax({
    url: '../server/detail.php',
    dataType: true,
    data: {
      id: id
    }
  })

  // console.log(res)
  // 判断一下，如果是 false，还跳转回 列表页面
  if (!res) {
    alert('您要查询的商品不存在')
    window.location.href = './list.html'
  }

  // 直接渲染页面就行
  goods_box.innerHTML = `
    <div class="media">
      <div class="left_box media-left">
        <a href="#">
          <img class="media-object" src="${ res.goods_big_logo }" alt="...">
        </a>
      </div>
      <div class="right_box media-body">
        <h4 class="media-heading">${ res.goods_name }</h4>
        <div class="btns btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">XL</button>
          <button type="button" class="btn btn-default">L</button>
          <button type="button" class="btn btn-default">M</button>
          <button type="button" class="btn btn-default">S</button>
        </div>
        <p class="price">
          <i class="glyphicon glyphicon-jpy"></i>
          <span>${ res.goods_price }</span>
        </p>
        <div>
          <a href="javascript:;" class="btn btn-lg btn-danger">加入购物车</a>
          <a href="javascript:;" class="btn btn-lg btn-warning">立即购买</a>
        </div>
      </div>
    </div>
  `

  // 渲染一个商品描述信息
  goods_info.innerHTML = res.goods_introduce
}
