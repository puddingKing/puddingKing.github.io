/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var WATER = __webpack_require__(1)
	// 获取画布
	var water = document.querySelector('#water')
	water.width = document.documentElement.clientWidth
	// 初始化分子
	var w = new WATER(water)
	w.init(water)
	// 分子运动
	var watering = window.requestAnimationFrame(timer)
	function timer () {
	  w.flow(water)
	  watering = window.requestAnimationFrame(timer)
	}
	document.querySelector('#water').addEventListener('click', function (e) {
	  console.log('e:' + e.clientX)
	  console.log('water.x:' + water.offsetLeft)
	  console.log('water.y:' + water.offsetTop)
	  var x = e.clientX - water.offsetLeft
	  var y = e.clientY - water.offsetTop
	  console.log('coordinate:(x, y):' + x + ',' + y)
	  w.addOne(x, y)
	})
	window.addEventListener('resize', function () {
	  water.width = document.documentElement.clientWidth
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var numerator = __webpack_require__(2)
	var numerators = __webpack_require__(3)
	var data = __webpack_require__(4)
	
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var numerator = {
	  born: function (x, y, r, water) {
	    var ctx = water.getContext('2d')
	    ctx.save()
	    ctx.fillStyle = 'black'
	    ctx.beginPath()
	    ctx.arc(x, y, r, 0, Math.PI*2)
	    ctx.closePath()
	    ctx.fill()
	    ctx.restore()
	  }
	}
	
	module.exports = numerator

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var data = __webpack_require__(4)
	
	var numerators = {
	  link: function (ctx) {
	    for (var i = 0; i < data.numerators.length; i++) {
	      var a = {
	        x: data.numerators[i].x,
	        y: data.numerators[i].y
	      }
	      for (var j = 0; j < data.numerators.length; j++) {
	        var b = {
	          x: data.numerators[j].x,
	          y: data.numerators[j].y
	        }
	        var deltaX = Math.abs(a.x - b.x)
	        var deltaY = Math.abs(a.y - b.y)
	        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
	        if (distance <= data.distance) {
	          ctx.save()
	          ctx.beginPath()
	          ctx.globalAlpha = 0.5*(data.distance - distance) / (data.distance)
	          ctx.strokeStyle = 'black'
	          ctx.moveTo(a.x, a.y)
	          ctx.lineTo(b.x, b.y)
	          ctx.stroke()
	          ctx.restore()
	        }
	      }
	    }
	  }
	}
	
	module.exports = numerators

/***/ },
/* 4 */
/***/ function(module, exports) {

	var data = {
	  max: 40,
	  distance: 80,
	  numerators: [],
	  speed: 0.2 // (0, ~)
	}
	
	module.exports = data

/***/ }
/******/ ]);
//# sourceMappingURL=homepage.js.map