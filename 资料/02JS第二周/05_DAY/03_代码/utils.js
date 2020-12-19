// 准备一个函数叫做 on
//   用来添加事件的
/*
  给谁绑定
  绑定什么事件
  事件处理函数是什么
*/
function on(ele, type, fn) {
  // 要进行兼容处理

  // console.log(ele.addEventListener)
  // 判断有没有 addEventListener
  if (ele.addEventListener) {
    // 进入到 if 条件，证明 ele.addEventListener 是一个函数地址
    // 证明有这个东西
    ele.addEventListener(type, fn)
  } else {
    // 进入到 else，证明 ele.addEventListener 是一个 undefined
    // 证明没有这个东西
    ele.attachEvent('on' + type, fn)
  }
  //   有我就使用
  //   没有就用另一个
}

// 移除事件也有兼容性问题
//   封装一个移除事件的函数
/*
  你要移除哪个元素
  移除什么事件
  移除哪一个事件处理函数
*/
function off(ele, type, fn) {
  // 要进行条件判断
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn)
  } else {
    ele.detachEvent('on' + type, fn)
  }
}
