function Tabs(id) {
  this.ele = document.querySelector('#' + id)
  this.btns = this.ele.querySelectorAll('ul > li')
  this.tabs = this.ele.querySelectorAll('ol > li')
}

Tabs.prototype.change = function () {
  const _this = this
  for (let i = 0; i < this.btns.length; i++) {
    this.btns[i].addEventListener('click', function () {
      for (let j = 0; j < _this.btns.length; j++) {
        _this.btns[j].className = ''
        _this.tabs[j].className = ''
      }
      this.className = 'active'
      _this.tabs[i].className = 'active'
    })
  }
}
