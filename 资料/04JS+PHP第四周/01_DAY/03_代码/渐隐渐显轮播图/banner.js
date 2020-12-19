class Banner {
  constructor (id) {
    this.ele = document.querySelector(id)

    // 获取图片盒子
    this.imgBox = this.ele.querySelector('ul')

    // 获取焦点盒子
    this.pointBox = this.ele.querySelector('ol')

    // 获取左右切换按钮
    this.leftRightBox = this.ele.querySelector('.leftRight')

    // 准备一个索引变量来记录是第几张
    this.index = 0

    // 准备一个变量保存定时器
    this.timerLoop = null

    // 启动启动器
    this.init()
  }

  // 0. 启动器
  init () {
    this.setPoint()
    this.autoplay()
    this.overOut()
    this.leftRight()
    this.pointClick()
  }

  // 1. 设置焦点数量
  setPoint () {
    // 获取图片的数量
    const pointNum = this.imgBox.children.length

    const frg = document.createDocumentFragment()
    for (let i = 0; i < pointNum; i++) {
      // 创建焦点
      const li = document.createElement('li')

      if (i === 0) li.className = 'active'

      li.setAttribute('index', i)

      frg.appendChild(li)
    }

    // 设置一下 pointBox 的宽度啊
    this.pointBox.style.width = pointNum * 20 * 1.5 + 'px'
    // 直接丢到 pointBox 里面
    this.pointBox.appendChild(frg)
  }

  // 2. 自动轮播
  autoplay () {
    this.timerLoop = setInterval(() => {
      // 所有的都没有 active 类名
      // 只有当前这一张有一个 active 类名
      this.index++
      this.move()
    }, 2000)
  }

  move () {
      // 判断一下，如果到了最后一张，要让索引归 0
      // console.log(this.index)
      // 当 index >= 5 的时候 回归到 0
      if (this.index >= 5) this.index = 0

      // 当你的 index < 0 的时候，让你等于最后一战给的索引
      if (this.index < 0) this.index = this.imgBox.children.length - 1

      // 让所有的 ul > li 类名都是 ''
      for (let i = 0; i < this.imgBox.children.length; i++) {
        this.imgBox.children[i].className = ''
        this.pointBox.children[i].className = ''
      }

      // 就应该让 imgBox 里面索引为 this.index 的那一张显示
      this.imgBox.children[this.index].className = 'active'
      // 焦点配套的哪一个显示
      this.pointBox.children[this.index].className = 'active'
  }

  // 3. 移入移出
  overOut () {
    // 给最大的盒子绑定事件
    this.ele.addEventListener('mouseover', () => clearInterval(this.timerLoop))
    this.ele.addEventListener('mouseout', () => this.autoplay())
  }

  // 4. 左右切换
  leftRight () {
    // 事件委托
    this.leftRightBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      // 条件判断来决定是哪一个按钮
      if (target.className === 'left') {
        console.log('左边')
        this.index--
        this.move()
      }

      if (target.className === 'right') {
        console.log('右边')
        this.index++
        this.move()
      }
    })
  }

  // 5. 焦点切换
  pointClick () {
    // 把所有焦点的事件委托给 pointBox
    this.pointBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      if (target.tagName === 'LI') {
        // console.log('你点击的是焦点')
        const i = target.getAttribute('index') - 0
        this.index = i
        this.move()
      }
    })
  }
}
