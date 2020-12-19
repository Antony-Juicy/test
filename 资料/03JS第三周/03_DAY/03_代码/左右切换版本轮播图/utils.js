/**
 * move 运动函数
 * @param {ELEMENT} ele 要运动的元素
 * @param {OBJECT} target 运动的目标位置
 * @param {FUNCTION} cb 运动结束的时候执行的函数
 */
function move(ele, target, cb) {
  const timerObj = {}
  for (let attr in target) {
    timerObj[attr] = setInterval(() => {
      // 1. 获取当前位置
      // let current
      // if (attr === 'opacity') {
      //   current = getComputedStyle(ele)[attr] * 100
      // } else {
      //   current = parseInt(getComputedStyle(ele)[attr])
      // }

      let current = attr === 'opacity' ? getComputedStyle(ele)[attr] * 100 : parseInt(getComputedStyle(ele)[attr])

      // 2. 计算运动距离
      let distance = (target[attr] - current) / 5
      distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)

      // 3. 要么赋值要么停
      if (current === target[attr]) {
        // 停
        clearInterval(timerObj[attr])
        delete timerObj[attr]
        if (getObjLength(timerObj) === 0) cb()
      } else {
        // 赋值
        // if (attr === 'opacity') {
        //   ele.style[attr] = (current + distance) / 100
        // } else {
        //   ele.style[attr] = current + distance + 'px'
        // }
        ele.style[attr] = attr === 'opacity' ? (current + distance) / 100 : current + distance + 'px'
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
