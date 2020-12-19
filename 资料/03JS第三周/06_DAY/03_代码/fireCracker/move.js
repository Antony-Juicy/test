function move(ele, target, cb) {
  // cb 接受的就是第三个参数
  // 一个函数
  // 我在这里准备一个对象
  const obj = {}
  for (let attr in target) {
    obj[attr] = setInterval(() => {
      // 单独处理透明度
      let curStyle

      if (attr === 'opacity') {
        curStyle = parseFloat(getStyle(ele, attr) * 100)
      } else {
        curStyle = parseInt(getStyle(ele, attr))
      }

      let speed = (target[attr] - curStyle) / 5
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

      if (curStyle === target[attr]) {
        clearInterval(obj[attr]) // 只要一个运动结束了
        // 关闭以后，删除 obj 中对应的哪个成员
        // 每结束一个定时器删除一个成员
        // 知道 对象 中没有成员了，所有的运动结束
        delete obj[attr]

        // 判断只要 obj 里面没有成员了
        // 表示运动结束了
        if (getTimerLength(obj) === 0) {
          cb && cb()
          // if (cb) {
          //   cb()
          // }
        }
      } else {
        if (attr === 'opacity') {
          ele.style[attr] = (curStyle + speed) / 100
        } else {
          ele.style[attr] = curStyle + speed + 'px'
        }
      }
    }, 30)
  }
}

function getStyle(ele, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele)[attr]
  } else {
    return ele.currentStyle[attr]
  }
}

function getTimerLength(obj) {
  let n = 0
  for (let attr in obj) {
    n++
  }
  return n
}

function fn(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a
}

function getColor() {
  return `rgb(${ fn(0, 255) }, ${ fn(0, 255) }, ${ fn(0, 255) })`
}
