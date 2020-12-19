# 复习

## 节点操作

- 创建节点
  + 直接使用 `$(html 格式的字符串)`
- 插入节点
  + 内部插入（父子关系）
    1. append()
    2. appendTo()
    3. prepend()
    4. prependTo()
  + 外部插入（兄弟关系）
    1. after()
    2. insertAfter()
    3. before()
    4. insertBefore()
- 替换节点
  + replaceWith()
  + replaceAll()
- 删除节点
  + remove()
  + empty()
- 克隆节点
  + clone()
    + 第一个参数是自己的事件是不是克隆
    + 第二个参数是子元素的事件是不是克隆

## 尺寸

- width() || height()
- innerWidth() || innerHeight()
- outerWidth() || outerHeight()
- outerWidth(true) || outerHeight(true)

## 偏移量

- offset()
- position()

## 卷去的宽度和高度

- scrollTop()
- scrollLeft()

## 动画

- 基础动画
  + show()
  + hide()
  + toggle()
- 折叠动画
  + slideDown()
  + slideUp()
  + slideToggle()
- 淡入淡出动画
  + fadeIn()
  + fadeOut()
  + fadeToggle()
  + fadeTo()
- 动画
  + animate()
- 停止动画
  + stop()
  + finish()

## 事件

- on()
- one()
- 常见事件直接使用

# 上午复习

## jQuery 发送 ajax 请求的方式

- $.get(地址，携带的参数，成功的回调，期望返回的数据类型)
- $.post(地址，携带的参数，成功的回调，期望返回的数据类型)
- $.ajax({
  url: '' 地址，
  type: '' 请求方式（写成 method 也行），
  data: '' 携带的参数（可以是字符串也可以是对象），
  async: '' 是否异步
  success () {}, 成功的回调
  dataType: '', 期望后台返回的数据类型 json 的时候就会执行 JSON.parse()
  error () {}, 失败的回调（ jquery 认定失败就是失败 ），
  cache： '' 是否缓存，
  timeout： '' 超时时间，
  context： '' 回调函数内部的 this 指向
})

- 发送一个 jsonp 请求
  + 使用 $.ajax() 这个方法
  + 要把 dataType 配置成 jsonp
  + 属于 jsonp 的配置项
    + jsonp: 传递回调函数的时候的 key
    + jsonpcallback： 传递回调函数的函数名
  + jsonp 默认不缓存
