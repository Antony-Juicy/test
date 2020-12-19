/*
  1. 函数的参数
    + 在这个 ajax 请求里面可以变的内容作为参数
    + url 必填
    + 请求方式 我可以设置一个默认值 get
    + 是否异步 我可以设置一个默认值 true
    + 是否执行 JSON.parse 方法，默认不执行
    + 请求的时候像后端发送的参数 默认空
    + 回调函数
*/

function ajax(options) {

  // console.log(options)

  // 如果 url 没有传递
  // 不在继续向下执行
  // 可以手动抛出一个错误（异常）
  if (!options.url) {
    // 进入这里，表示 url 是 false
    //   undefined, 给了一个 ''
    // 手动抛出异常
    throw new Error('您好，url 是必填选项')
  }


  // 判断 type 传递的内容
  // 如果你的 type 是 get 或者 post 或者 空字符串 或者 undefined 以外的内容都不行
  // if (!(options.type === undefined || options.type.toUpperCase() === 'GET' || options.type.toUpperCase() === 'POST' || options.type === '')) {
  //   // 能进入 if 条件只有 get post '' undefined
  //   console.log('if 条件')
  // }
  // 一个条件写不下
  if (typeof options.type === 'string' || options.type === undefined) {
    if (!(options.type === undefined || options.type.toUpperCase() === 'GET' || options.type.toUpperCase() === 'POST' || options.type === '')) {
      // console.log('error')
      // 抛出一个异常
      throw new Error('目前只支持 get 和 post 请求，请期待更新')
    }
  } else {
    // console.log('error')
    // 抛出异常
    throw new Error('请按照规则传递数据')
  }


  // 判断是否异步
  // 如果你是 udnefined 或者是个 布尔都可以
  if (!(typeof options.async === 'boolean' || options.async === undefined)) {
    // 抛出异常
    throw new Error('async 只接受 布尔数据类型')
  }

  // 判断是否执行 JSON.parse 这个方法
  if (!(typeof options.dataType === 'boolean' || options.dataType === undefined)) {
    // 抛出异常
    throw new Error('dataType 只接受 布尔数据类型')
  }

  // 判断 data
  // data 接受的内容可以是一个 对象，可以是一个字符串
  if (!(typeof options.data === 'string' || options.data === undefined || Object.prototype.toString.call(options.data) === '[object Object]')) {
    // 抛出异常
    throw new Error('data 只能传递字符串或者对象')
  }

  // options.success 就是一个函数
  if (!(options.success === undefined || Object.prototype.toString.call(options.success) === '[object Function]')) {
    // 抛出异常
    throw new Error('success 只能传递函数')
  }

  // 整合一下所有的参数
  // 准备一个默认值
  const _default = {
    url: options.url,
    type: options.type ? options.type : 'GET',
    async: typeof(options.async) === 'boolean' ? options.async : true,
    dataType: typeof(options.dataType) === 'boolean' ? options.dataType : false,
    data: typeof(options.data) === 'string' ? options.data : '',
    success: options.success ? options.success : function () {}
  }

  // 单独处理对象形式的 data
  if (Object.prototype.toString.call(options.data) === '[object Object]') {
    // 要把对象里面的每一个成员拆开，组装成字符串
    let str = ''

    for (let attr in options.data) {
      str += `${attr}=${options.data[attr]}&`
    }

    // slice(开始索引，结束索引) 包前不包后
    // console.log(str.slice(0, -1))
    _default.data = str.slice(0, -1)
  }

  // console.log(_default)

  // 准备发送请求，使用的就是 _default 里面的内容

  // 1. 创建一个 ajax 对象
  let xhr
  if (XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  // 2. 配置请求参数
  xhr.open(_default.type, _default.url + `${ _default.type === 'GET' ? '?' + _default.data : '' }`, _default.async)

  // 3. 接受响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      // 成功

      // 请求成功
      // 在请求成功的时候执行成功的回调函数
      // _default.success 是什么，是你传递进来的那个函数
      if (_default.dataType) {
        _default.success(JSON.parse(xhr.responseText))
        // console.log(JSON.parse(xhr.responseText))
      } else {
        // success 调用的是你传递进来的那个函数
        // 传递的实参是给谁了？ 给了你传递进来的那个函数
        _default.success(xhr.responseText)
        // console.log()
      }
    }
  }

  // 4. 判断要不要添加请求头
  if (_default.type === 'POST') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
  }

  // 5. 发送请求
  xhr.send(_default.type === 'GET' ? null : _default.data)
}


/*
  以一个 promise 的形式封装一个 ajax
*/

function pAjax(options) {
  // 返回的是一个 promise 对象
  return new Promise(function (resolve, reject) {
    // 把 options 里面的 success 函数给改了
    options.success = function (res) {
      // 这个函数会在请求成功的时候执行
      // 执行的时候就调用了一下 resolve
      resolve(res)
    }
    ajax(options)
  })
}
