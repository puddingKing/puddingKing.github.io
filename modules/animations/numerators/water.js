var numerator = require('./numerator')
var numerators = require('./numerators')
var data = require('./data')

var WATEROBJ = function (water) {
  this.width = water.width
  this.height = water.height
  this.canvas = water
  this.watering = ''
  this.init()
  this.flow()
}

WATEROBJ.prototype.update = function (water) {
  this.width = water.width
  this.height = water.height
  this.canvas = water
}

WATEROBJ.prototype.init = function () {
  data.numerators = [];
  console.log('water.init begin:' + this.canvas)
  var water = this.canvas
  var ctx = water.getContext('2d')
  var width = this.width
  var height = this.height
  console.log('water width' + this.width)
  console.log('water height' + this.height)
  console.log('data max' + data.max)  
  ctx.clearRect(0, 0, width, height)
  for (var i = 0; i < data.max; i++) {
    var x = Math.random() * width
    var y = Math.random() * height
    var r = Math.random() * 2 + 1
    if (Math.random() < 0.25) {
      var dir = 1
    } else if (0.25 <= Math.random() < 0.5) {
      var dir = 2
    } else if (0.5 <= Math.random() < 0.75) {
      var dir = 3
    } else {
      var dir = 4
    }

    data.numerators.push({
      x: x,
      y: y,
      dir: dir,
      r: r
    })
    numerator.born(x, y, r, water)
  }
  numerators.link(ctx)
}

WATEROBJ.prototype.flowFrame = function () {
  var _this = this
  var water = _this.canvas
  var ctx = water.getContext('2d')
  var width = _this.width
  var height = _this.height
  ctx.clearRect(0, 0, width, height)
  // ctx.fillStyle = '#3b6caa'
  // ctx.fillRect(0, 0, width, height)
  for (var i = 0; i < data.numerators.length; i ++) {
    switch (data.numerators[i].dir) {
      case 1:
        data.numerators[i].x = data.numerators[i].x + data.speed
        data.numerators[i].y = data.numerators[i].y + data.speed
        if (data.numerators[i].x < 0 || data.numerators[i].y < 0 || data.numerators[i].x > width || data.numerators[i].y > height) {
          data.numerators[i].dir = 2
        }
        break
      case 2:
        data.numerators[i].x = data.numerators[i].x + data.speed
        data.numerators[i].y = data.numerators[i].y - data.speed
        if (data.numerators[i].x < 0 || data.numerators[i].y < 0 || data.numerators[i].x > width || data.numerators[i].y > height) {
          data.numerators[i].dir = 3
        }
        break
      case 3:
        data.numerators[i].x = data.numerators[i].x - data.speed
        data.numerators[i].y = data.numerators[i].y - data.speed
        if (data.numerators[i].x < 0 || data.numerators[i].y < 0 || data.numerators[i].x > width || data.numerators[i].y > height) {
          data.numerators[i].dir = 4
        }
        break
      case 4:
        data.numerators[i].x = data.numerators[i].x - data.speed
        data.numerators[i].y = data.numerators[i].y + data.speed
        if (data.numerators[i].x < 0 || data.numerators[i].y < 0 || data.numerators[i].x > width || data.numerators[i].y > height) {
          data.numerators[i].dir = 1
        }
        break
    }
    numerator.born(data.numerators[i].x, data.numerators[i].y, data.numerators[i].r, water)
  }
  numerators.link(ctx)
}

WATEROBJ.prototype.flow = function () {
  var _this = this
  _this.flowFrame()
  _this.watering = window.requestAnimationFrame(function(){
    _this.flow()
  })
}

WATEROBJ.prototype.add = function (num) {
  var width = this.width
  var height = this.height
  for (var i = 0; i < num; i++) {
    var x = Math.random() * width
    var y = Math.random() * height
    var r = Math.random() * 2 + 1
    if (Math.random() < 0.25) {
      var dir = 1
    } else if (0.25 <= Math.random() < 0.5) {
      var dir = 2
    } else if (0.5 <= Math.random() < 0.75) {
      var dir = 3
    } else {
      var dir = 4
    }
    data.numerators.push({
      x: x,
      y: y,
      dir: dir,
      r: r
    })
  }
}

WATEROBJ.prototype.addOne = function (x, y) {
  var r = Math.random() * 2 + 1
  if (Math.random() < 0.25) {
    var dir = 1
  } else if (0.25 <= Math.random() < 0.5) {
    var dir = 2
  } else if (0.5 <= Math.random() < 0.75) {
    var dir = 3
  } else {
    var dir = 4
  }
  data.numerators.push({
    x: x,
    y: y,
    dir: dir,
    r: r
  })
}

WATEROBJ.prototype.lower = function (num, water) {
  data.numerators.splice(0, num)
}

WATEROBJ.prototype.clearAll = function () {
  console.log('clear')
  var water = this.canvas
  var width = this.width
  var height = this.height
  var ctx = water.getContext('2d')
  ctx.clearRect(0, 0, width, height)
}

module.exports = WATEROBJ