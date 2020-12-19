function Enlarge(id) {
  // 先获取大盒子
  this.ele = document.querySelector(id)

  // 获取 show 盒子
  this.show = this.ele.querySelector('.show')

  // 获取 mask 盒子
  this.mask = this.ele.querySelector('.mask')

  // 获取 enlarge 盒子
  this.enlarge = this.ele.querySelector('.enlarge')

  // 获取 list 盒子
  this.list = this.ele.querySelector('.list')

  // 获取两个 p 标签
  this.ps = this.list.querySelectorAll('p')

  // 直接启动启动器
  this.init()
}

// 0. 准备一个启动器（入口函数）
Enlarge.prototype.init = function () {
  // this.overOut()
  this.setScale()
  this.maskMove()
  this.bindEvent()
}

// 1. 移入移出显示和隐藏
Enlarge.prototype.overOut = function () {
  // 给show 盒子绑定事件
  // this.show.addEventListener('mouseover', function () { 这里的 this 是 show 盒子 })
  // this.show.addEventListener('mouseover', () => { 这里的 this 是 当前实例 })
  this.show.addEventListener('mouseover', () => {
    // 控制两个盒子显示
    this.mask.style.display = 'block'
    this.enlarge.style.display = 'block'
  })

  this.show.addEventListener('mouseout', () => {
     // 控制两个盒子隐藏
     this.mask.style.display = 'none'
     this.enlarge.style.display = 'none'
  })

}

// 2. 动起来
Enlarge.prototype.maskMove = function () {
  // 给 show 盒子绑定一个 move 事件
  this.show.addEventListener('mousemove', e => {
    e = e || window.event

    // 不能使用 offsetX 因为他是根据 目标元素的左上角的坐标
    // console.log(e.offsetX)
    // 不能使用 clientX 因为他是根据 窗口的左上角
    // console.log(e.clientY)

    let x = e.pageX - this.ele.offsetLeft - 100
    let y = e.pageY - this.ele.offsetTop - 100

    // 获取遮罩层的宽度和高度
    const maskX = this.mask.offsetWidth
    const maskY = this.mask.offsetHeight

    // 获取 show 盒子的宽度和高度
    const showX = this.show.offsetWidth
    const showY = this.show.offsetHeight

    // 边界值判断
    if (x <= 0) {
      x = 0
    }

    if (y <= 0) {
      y = 0
    }

    if (x >= showX - maskX) {
      x = showX - maskX
    }

    if (y >= showY - maskY) {
      y = showY - maskY
    }


    // 给 遮罩层（mask） 赋值就行了
    this.mask.style.left = x + 'px'
    this.mask.style.top = y + 'px'

    // 让 enlarge 盒子里面的背景图配套的动
    // 获取 enlarge 盒子的尺寸
    const enlargeX = this.enlarge.offsetWidth
    const enlargeY = this.enlarge.offsetHeight

    // 背景图移动的距离 = 放大镜盒子尺寸 * 遮罩层移动的距离 / 遮罩层的尺寸
    const bgX = enlargeX * x / maskX
    const bgY = enlargeY * y / maskY

    // 给 enlarge 盒子的背景图尺寸赋值
    this.enlarge.style.backgroundPosition = `-${bgX}px -${bgY}px`
  })
}

// 3. 设置放大镜盒子尺寸成比例
Enlarge.prototype.setScale = function () {
  // 获取遮罩层的尺寸（获取元素的非行内样式）
  const maskX = parseInt(getComputedStyle(this.mask).width)
  const maskY = parseInt(getComputedStyle(this.mask).height)

  // 获取 show 盒子的尺寸
  const showX = this.show.offsetWidth
  const showY = this.show.offsetHeight

  // 获取背景图的尺寸
  const bgX = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
  const bgY = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])

  // 放大镜盒子 = 遮罩层盒子 * 背景图尺寸 / show 盒子
  const x = maskX * bgX / showX
  const y = maskY * bgY / showY

  // 把这个数字赋值给 enlarge 盒子的宽和高
  this.enlarge.style.width = x + 'px'
  this.enlarge.style.height = y + 'px'
}

// 4. 给两个 p 标签设置点击事件
Enlarge.prototype.bindEvent = function () {
  const _this = this
  // 循环绑定事件
  for (let i = 0; i < this.ps.length; i++) {
    this.ps[i].addEventListener('click', function () {
      // 这里是要用到 this 事件源的
      // 就不能用当前实例了，提前保存一个
      _this.ps.forEach(item => item.className = '')
      this.className = 'active'

      // 获取绑定在元素身上的那两个自定义属性
      // this 是一个 p 标签，属性绑在 img 标签
      const showImg = this.firstElementChild.getAttribute('data-show-src')
      const bgImg = this.firstElementChild.getAttribute('data-src')

      // 分别赋值就行了
      // showImg 赋值给 show 盒子下面的 img 标签
      _this.show.firstElementChild.setAttribute('src', showImg)
      _this.enlarge.style.backgroundImage = `url(${ bgImg })`
    })
  }
}
