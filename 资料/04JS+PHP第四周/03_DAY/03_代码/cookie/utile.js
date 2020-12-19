function setCookie(key, value, expires) {
  var time = new Date()
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  var str = `${key}=${value};expires=${ expires ? time : '' }`
  document.cookie = str
}

function getCookie(key) {
  var value = ''
  var tmpArr = document.cookie.split('; ')
  tmpArr.forEach(item => {
    var tmp = item.split('=')
    if (tmp[0] === key) {
      value = tmp[1]
    }
  })
  return value
}

function delCookie(key) {
  setCookie(key, '1', -10)
}
