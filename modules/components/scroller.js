function Scroller (opts) {
  var _this = this;
  _this._outer = opts.outer;
  _this._inner = opts.inner;
  _this.delta = 0;
  _this.unitY = opts.speed*10;
  _this.max = opts.inner.offsetHeight - opts.outer.offsetHeight;
  _this.per = 0;
  _this.bar = '';
  _this.scrollbar();
}

Scroller.prototype.scrollbar = function () {
  var _this = this;
  // 创建一个滚动条
  try {
    var _scrollbar;
    _scrollbar = document.createElement('div');
    _scrollbar.style.position = 'absolute';
    _scrollbar.style.top = '0';
    _scrollbar.style.right = '0';
    _scrollbar.style.width = '5px';
    _scrollbar.style.backgroundColor = '#eaeaea';
    _scrollbar.style.backgroundColor = 'rgba(255,255,255,0.5)';
    _scrollbar.style.borderRadius = '2.5px';
  } catch (error) {
    console.log('error:' + error);
  }
  _scrollbar.style.height = _this._outer.offsetHeight / _this._inner.offsetHeight * _this._outer.offsetHeight  + 'px';
  _this._outer.appendChild(_scrollbar);
  _this.bar = _scrollbar;
}

Scroller.prototype.watchbar = function () {
  var _this = this;
  var _bary = (_this._outer.offsetHeight - _this._outer.offsetHeight / _this._inner.offsetHeight * _this._outer.offsetHeight) * _this.per;
  if (client.browser.ie > 9) {
    _this.bar.style.transform = 'translateY(' + _bary + 'px)';
  } else {
    _this.bar.style.top = _bary + 'px';
  }
}

Scroller.prototype.wheel = function (callback) {
  var _this = this;
  if (client.browser.firefox > 0) { // 如果是火狐浏览器
    addEvent(_this._outer, "DOMMouseScroll", function (event) {
      _this.wheelHandler(event);
    })
  } else {
    addEvent(_this._outer, "onwheel" in document ? "wheel" : "mousewheel", function (event) {
      _this.wheelHandler(event);
    })
  }
}

Scroller.prototype.on = function (type, fn) {
  var _this = this;
  switch (type) {
    case 'wheel':
      _this.wheel(fn);
      break;
    default:
      break;
  }
}

Scroller.prototype.wheelHandler = function (event) {
  var _this = this;
  event = window.event || event;
  // console.log('event.wheelDelta:' + event.wheelDelta);
  // console.log('event.detail:' + event.detail);
  // console.log(event);
  if (client.browser.firefox > 0) { // 如果是火狐浏览器，通过event.detail的正负情况判断向上or向下滚动
    if (event.detail > 0) {
      _this.delta = _this.delta + (-_this.unitY);
    } else {
      _this.delta = _this.delta + _this.unitY;
    }
  } else {
    if (event.wheelDelta < 0) {
      _this.delta = _this.delta + (-_this.unitY);
    } else {
      _this.delta = _this.delta + _this.unitY;
    }
  }
  // console.log('_this.delta:' + _this.delta);
  if (_this.delta <= 0) { // 如果滚动超过最大或最小范围
    if (_this.delta < -_this.max) {
      _this.delta = -_this.max;
    }
  } else {
    _this.delta = 0;
  }
  _this.per = Math.abs(_this.delta) / _this.max;
  _this.watchbar();
  if (client.browser.ie > 9) {
    _this._inner.style.transform = 'translateY(' + _this.delta + 'px)';
  } else {
    _this._inner.style.marginTop = _this.delta + 'px';
  }
  
  if (typeof callback === 'function') {
    callback({
      delta: _this.delta
    })
  }
}

window.addEvent = (function (el, type, fn, capture) {
  return function (el, type, fn, capture) {
    if (window.addEventListener) {
      el.addEventListener(type, function (event) {
        event = event || window.event;
        fn(event);
      }, capture || false);
    } else if (window.attachEvent) {
      el.attachEvent('on' + type, function(event) {
        event = event || window.event;
        fn(event);
      }, capture || false);
    }
  }
})();
