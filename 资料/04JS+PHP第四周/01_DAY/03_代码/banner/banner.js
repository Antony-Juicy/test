class Banner {
  constructor (id) {
    // 先获取整个 banner 大盒子
    this.ele = document.querySelector(id)

    // 获取一个 图片盒子
    this.imgBox = this.ele.querySelector('ul')

    // 获取一个 焦点盒子
    this.pointBox = this.ele.querySelector('ol')

    // 获取一个左右按钮的盒子
    this.leftRightBox = this.ele.querySelector('.leftRight')

    // 获取一个可视窗口的宽度
    this.windowWidth = this.ele.clientWidth

    // 准备一个定时器变量
    this.timerLoop = null

    // 准备一个变量用来记录时第几张图片
    this.index = 1

    // 准备一个开关
    this.flag = true

    // this 就是当前实例
    // this.init() => 实例.init()
    // 把启动器启动起来
    this.init()
  }

  // 0. 准备一个启动器
  init () {
    // 这里的 this 就是当前实例
    // this.setPoint() => 实例.setPoint()
    this.setPoint()
    this.copyEle()
    this.autoplay()
    this.overOut()
    this.leftRight()
    this.pointClick()
  }

  // 1. 根据图片盒子的子元素的个数，创建焦点放在 pointBox 里面
  setPoint () {
    // 根据 imgBox 里面子元素的个数创建 li 丢到 pointBox 里面
    const pointNum = this.imgBox.children.length // 所有图片盒子里面子元素的个数

    // 先放在文档碎片里面
    const frg = document.createDocumentFragment()
    for (let i = 0; i < pointNum; i++) {
      // 创建 li
      const li = document.createElement('li')

      // 有一个是有样式的
      if (i === 0) li.className = 'active'

      // 在这里保存一下 按钮的索引
      li.setAttribute('index', i)

      // 放到文档碎片里面
      frg.appendChild(li)
    }

    // 重新设置 pointBox 的宽度
    this.pointBox.style.width = pointNum * 20 * 2 + 'px'

    // 一次性丢到 this.pointBox 里面
    this.pointBox.appendChild(frg)
  }

  // 2. 复制图片盒子里面的元素
  copyEle () {
    // 先复制第一个和最后一个
    const first = this.imgBox.firstElementChild.cloneNode(true)
    const last = this.imgBox.lastElementChild.cloneNode(true)

    // 把第一个放在最后
    this.imgBox.appendChild(first)
    // 把最后一个放在最前面
    this.imgBox.insertBefore(last, this.imgBox.firstElementChild)

    // 从新设置 ul 的 宽度 和 位置
    // 宽度应该是子元素个数 * 可视窗口的宽度
    this.imgBox.style.width = this.imgBox.children.length * this.windowWidth + 'px'
    // 位置就是向左移动一个可视窗口的距离
    this.imgBox.style.left = -1 * this.windowWidth + 'px'
  }

  // 3. 让轮播图动起来
  autoplay () {
    // 开启一个定时器
    this.timerLoop = setInterval(() => {
      // 定时器的每一次执行，都应该移动一张的距离
      this.index++

      // 移动的距离，-index * 可视窗口的宽度
      // 调用 moveEnd 函数的时候，要让里面的 this 指向当前实例
      // 强行改变this指向 call/apply/bind
      // call和apply 是会立即调用函数，那么我们传递的第三个参数还是函数地址吗？
      // bind 是不会立即调用函数的，是会返回一个新的已经改变好 this 指向的函数地址
      // this.moveEnd.bind(this) this 就是当前实例
      // 实例.moveEnd.bind(实例) 让这个函数里面的 this 指向当前实例
      move(this.imgBox, { left: -this.index * this.windowWidth }, this.moveEnd.bind(this))

      // 这个函数里面的 this 指向谁
      // 点前面就是 实例，这个函数里面的 this 就是实例
      // this.moveEnd()

      // 是把实例身上的某一个方法当作实参传递到 fn 这个函数里面了
      // 这个 this.moveEnd 方法将来在调用的时候里面的 this 就指向了 window
      // 我又想在这个 moveEnd 函数里面去使用实例身上的属性
      // 就要使用一些方法去改变 this.moveEnd 函数在调用的时候的 this 指向
      // fn(this.moveEnd)
      // fn(this.moveEnd.call())
      // fn(this.moveEnd.bind(this))

    }, 1000)
  }

  // 4. 运动结束的函数
  moveEnd () {
    // console.log(this)
    // 在运动结束的时候，如果刚好时最后一张，那么我把他拉回到第一张
    if (this.index === this.imgBox.children.length - 1) {
      this.index = 1
      // 这个时候的 imgBox 定位就不能是运动的，要直接定位
      this.imgBox.style.left = -this.index * this.windowWidth + 'px'
    }

    // 在运动结束的时候，如果刚好是第0张，那么我要把他拉回到倒是第二帐
    if (this.index === 0) {
      this.index = this.imgBox.children.length - 2
      this.imgBox.style.left = -this.index * this.windowWidth + 'px'
    }

    // 让焦点配套
    // 所有的焦点都没有类名，只有自己又类名
    for (let i = 0; i < this.pointBox.children.length; i++) this.pointBox.children[i].className = ''
    // 让和图片配套的哪一个有焦点
    // 图片的索引刚好是 this.index，但是和 焦点的索引刚好差一个
    // 让 pointBox 里面的 index - 1 个有类名
    this.pointBox.children[this.index - 1].className = 'active'

    // 把开关再次打开
    this.flag = true
  }

  // 5. 移入移出
  overOut () {
    this.ele.addEventListener('mouseover', () => clearTimeout(this.timerLoop))
    this.ele.addEventListener('mouseout', () => this.autoplay())
  }

  // 6. 点击左右按钮切换
  leftRight () {
    // 事件绑定左右按钮，也可以做一个事件委托
    // 绑定给承载着所有按钮的哪个盒子
    this.leftRightBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      // 判断如果是 false，那么就直接 return
      if (this.flag === false) {
        return
      }

      this.flag = false

      // 判断点击的是左边
      if (target.className === 'left') {
        console.log('点击的是←')
        // 让 index--
        // 再次执行 move 函数
        this.index--
        move(this.imgBox, { left: -this.index * this.windowWidth }, this.moveEnd.bind(this))
      }

      // 判断点击的是右边
      if (target.className === 'right') {
        // console.log('点击的是→')
        // 让 index++
        // 再次执行 move 函数就行了
        this.index++
        move(this.imgBox, { left: -this.index * this.windowWidth }, this.moveEnd.bind(this))
      }
    })
  }

  // 7. 点击焦点按钮进行切换
  pointClick () {
    // 给每一个 pointBox 下面的焦点按钮绑定点击事件
    // 也可以用事件委托的形式来做
    // 委托给 this.pointBox
    this.pointBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      // 判断点击的是焦点按钮
      if (target.tagName === 'LI') {

        if (this.flag === false) {
          return
        }

        this.flag = false

        console.log('你点击的是焦点按钮')
        // 拿到你点击的是第几个焦点按钮
        const i = target.getAttribute('index') - 0 + 1
        // 对应的让轮播图切换到第几张
        // 因为焦点的索引和轮播图每一个图片的索引刚好差一个
        // 让 this.index = 点击按钮的索引
        this.index = i
        // 让轮播图盒子运动的过去就好了
        move(this.imgBox, { left: -this.index * this.windowWidth }, this.moveEnd.bind(this))
      }
    })
  }
}

/*
  this.flag = true 表示可以点击
  this.flag = false 表示不可以点击

  第一次点击的时候
    他确实是 true，就可以点击
    在我的操作里面让 this.flag = false
    每次执行点击事件的时候都进行一下判断，如果我的 this.flag 是 false 就什么都不做

*/


// function fn(cb) {
//   // 我这个 cb 接受到的内容是什么
//   // 某一个实例对象，身上的某一个方法
//   // console.log(cb)

//   cb() // this 指向谁 window
// }
