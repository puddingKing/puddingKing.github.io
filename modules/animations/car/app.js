var RoadObj = function (opts) {
  var _this = this
  _this.road = document.querySelector('#road')
  _this.ctx = road.getContext('2d')
  _this.width = road.width
  _this.height = road.height
  var car = new Image()
  car.src = '../public/images/car.png'
  _this.car = car
  _this.location = {
    x: 450,
    y: 50,
    deg: 0,
    speed: 3
  }
  _this.anim()
}

RoadObj.prototype.init = function () {
  var _this = this
  var start = { x: 500, y: 50 }
  var end = { x: 100, y: 50 }
  _this.car.run(start, end)
}

RoadObj.prototype.anim = function () {
  var _this = this
  var width = _this.width
  var height = _this.height
  var location = _this.location
  var car = _this.car
  var ctx = _this.road.getContext('2d')
  ctx.clearRect(0, 0, width, height)
	// path()
	if (location.x > 100) {
			ctx.save()
			ctx.beginPath()
			ctx.drawImage(car, location.x - 45.5, location.y - 24.5)
			ctx.closePath()
			ctx.stroke()
			ctx.fillStyle = 'red'
			ctx.fill()
			ctx.restore()
			location.x = location.x - location.speed
	} else if (location.x <= 100 && location.x > 50 && location.y < 100 && location.y >= 50) {
			ctx.save()
			ctx.translate(100, 100)
			location.deg = location.deg - location.speed
			if (location.deg <= -90) {
			location.x = 0
			location.y = -74.5
			}
			ctx.rotate(location.deg*Math.PI/180)
			ctx.beginPath()
			ctx.drawImage(car, -45.5, -74.5)
			ctx.closePath()
			ctx.stroke()
			ctx.fillStyle = 'red'
			ctx.fill()
			ctx.restore()
	} else if (location.x <= 0 && location.x >= -300) {
			ctx.save()
			ctx.translate(100, 100)
			ctx.rotate(-90*Math.PI/180)
			location.x = location.x - location.speed
			ctx.drawImage(car, location.x - 45.5, location.y)
			ctx.stroke()
			ctx.fill()
			ctx.restore()
	} else if (location.x < -300) {
			location.x = 450
			location.y = 50
			location.deg = 0
	}
  window.requestAnimationFrame(function () {
    _this.anim()
  })
}

module.exports = RoadObj