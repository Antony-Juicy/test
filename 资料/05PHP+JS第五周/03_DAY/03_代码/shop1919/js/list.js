// 先要发送请求把第一页的数据请求回来

// 准备一个变量
//   记录第几页 记录一页多少条
const listInfo = {
  pagenum: 1,
  pagesize: 13
}

// 准备一个变量
//   专门记录分页器的相关信息
const pageInfo = {
  pagenum: listInfo.pagenum,
  pagesize: listInfo.pagesize,
  total: 0,
  change (n) {
    // n 就是当前是第几页
    // console.log(n)

    // 把当前页的页数给到请求列表信息里面的 pagenum
    listInfo.pagenum = n
    getList()
  }
}

// 获取 list_box 元素
const list_box = document.querySelector('.list_box')

// 先把总数请求回来，把分页器渲染了
getTotal()
async function getTotal() {
  const res = await pAjax({
    url: '../server/total.php',
    dataType: true
  })

  // console.log(res)
  // 可以进行分页器的渲染了
  // 给分页器信息total 赋值
  pageInfo.total = res.total - 0

  // 要渲染分页器
  new Pagination('#pagi', pageInfo)
}

async function getList() {
  const res = await pAjax({
    url: '../server/list.php',
    dataType: true,
    data: listInfo
  })

  // 打印结果
  // console.log(res)

  // 渲染页面就使用 res 去渲染
  let str = ''

  res.forEach(item => {
    str += `
      <li class="col-xs-3">
        <div class="row">
          <div class="">
            <div class="thumbnail">
              <img src="${ item.goods_big_logo }" alt="...">
              <div class="caption">
                <h3>${ item.goods_name }</h3>
                <p class="price">
                  <i class="glyphicon glyphicon-jpy"></i>
                  <span>${ item.goods_price }</span>
                </p>
                <p>
                  <a href="./detail.html?id=${ item.goods_id }" class="btn btn-danger" role="button">查看商品详情</a>
                  <a href="#" class="btn btn-warning" role="button">去到购物车</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  })

  // str 就是 13 个 li
  // 都到 ul 里面
  list_box.innerHTML = str
}
