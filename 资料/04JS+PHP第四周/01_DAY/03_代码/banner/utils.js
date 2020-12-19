function move(ele, target, cb) {
  const timerObj = {}

  for (let attr in target) {
    timerObj[attr] = setInterval(() => {
      // 获取当前值
      let current
      if (attr === 'opacity') {
        current = getComputedStyle(ele)[attr] * 100
      } else {
        current = parseInt(getComputedStyle(ele)[attr])
      }

      // 计算距离
      let distance = (target[attr] - current) / 5
      distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)

      // 给元素赋值
      if (current === target[attr]) {
        clearInterval(timerObj[attr])
        delete timerObj[attr]
        if (getObjLength(timerObj) === 0) {
          cb()
        }
      } else {
        if (attr === 'opacity') {
          ele.style[attr] = (current + distance) / 100
        } else {
          ele.style[attr] = current + distance + 'px'
        }
      }
    }, 30)
  }
}

function getObjLength(obj) {
  let n = 0
  for (let attr in obj) {
    n++
  }
  return n
}
