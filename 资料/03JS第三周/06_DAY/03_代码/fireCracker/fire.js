function FireCracker(id) {
  this.ele = document.querySelector(id)

  this.bindEvent()
}

// 1. 点击事件，定位盒子
FireCracker.prototype.bindEvent = function () {
  // 事件给 this.ele
  this.ele.addEventListener('click', e => {
    e = e || window.event

    const x = e.offsetX
    const y = e.offsetY

    const fire = document.createElement('p')
    fire.className = 'fire'
    fire.style.left = x + 'px'
    fire.style.backgroundColor = getColor()
    this.ele.appendChild(fire)

    // 升空
    move(fire, { top: y }, () => {
      // 移出元素
      this.ele.removeChild(fire)

      // 准备一个数组，用它承载小火花
      const fires = []

      // 在这里随机生成若干个小火花
      const frg = document.createDocumentFragment()
      for (let i = 0; i <= 25; i++) {
        const p = document.createElement('p')
        p.className = 'fire'
        p.style.backgroundColor = getColor()
        p.style.left = x + 'px'
        p.style.top = y + 'px'
        p.style.borderRadius = '50%'
        fires.push(p)
        frg.appendChild(p)
      }
      this.ele.appendChild(frg)

      // 怎么拿到所有的 p 标签
      for (let i = 0; i < fires.length; i++) {
        // 每一个都要运动
        move(fires[i], {
          left: fn(0, this.ele.clientWidth),
          top: fn(0, this.ele.clientHeight)
        }, () => {
          this.ele.removeChild(fires[i])
        })

      }
    })
  })
}
