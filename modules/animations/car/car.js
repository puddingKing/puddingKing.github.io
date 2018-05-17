var CarObj = function (opts) {
	var _this = this
	var car = new Image()
	_this.ctx = opts.ctx
	_this.origin = opts.origin
	_this.speed = 3
	_this.running = ''
  car.src = '../public/images/car.png'
  car.onload = function () {
    _this.car = car
		_this.init()
		typeof opts.success == 'function' ? opts.success() : ''
  }
}

CarObj.prototype.init = function () {
	var _this = this
	var ctx = _this.ctx
	ctx.drawImage(_this.car, _this.origin.x, _this.origin.y)
}

// CarObj.prototype.stop = function (point) {
// 	var _this = this
// 	var ctx = _this.ctx
// 	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
// 	ctx.drawImage(_this.car, point.x - 45.5, point.y - 24.5)
// }

CarObj.prototype.run = function (start, end) {
	var _this = this
	// 确定方向：共4种方向
	var dir = direction(start, end)
	_this.running = window.requestAnimationFrame(function () {
		var _p = {
			x: start.x > end.x ? start.x - 1 : start.x,
			y: start.y > end.y ? start.y - 1 : start.y
		}
		_this.runStep(_p)
		_this.run(_p, end)
	})
}

CarObj.prototype.runStep = function (point) {
	var _this = this
	var ctx = _this.ctx
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.drawImage(_this.car, point.x - 45.5, point.y - 24.5)
}

function direction (start, end) {
	if (start.x >= end.x) { // 在1||4象限
		if (start.y >= end.y) {
			return 1
		} else {
			return 4
		}
	} else { // 在2||3象限
		if (start.y >= end.y) {
			return 2
		} else {
			return 3
		}
	}
}

module.exports = CarObj