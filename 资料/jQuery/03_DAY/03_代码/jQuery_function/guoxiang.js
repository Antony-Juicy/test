(function () {
  var obj = {
    name: 'Jack',
    age: 18,
    fn1() {},
    fn2() {}
  }

  // 我向外暴露的接口是 $
  window.$ = window.jQuery = obj

})()
