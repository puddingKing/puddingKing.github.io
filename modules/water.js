var numerator = require('./numerator')
var numerators = require('./numerators')
var data = require('./data')

var water = function (water) {
  this.width = water.width
  this.height = water.height
  this.canvas = water
  this.ctx = water.getContext('2d')
}

water.prototype.init = function (water) {
  console.log('water.init begin:')
  var water = water
  var ctx = water.getContext('2d')
  var width = water.width
  var height = water.height
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

water.prototype.flow = function (water) {
  var water = water
  var ctx = water.getContext('2d')
  var width = water.width
  var height = water.height
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

water.prototype.add = function (num, water) {
  var width = water.width
  var height = water.height
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

water.prototype.addOne = function (x, y) {
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

water.prototype.lower = function (num, water) {
  data.numerators.splice(0, num)
}

water.prototype.change = function () {
  
}

module.exports = water