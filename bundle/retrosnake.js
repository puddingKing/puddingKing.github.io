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
/***/ (function(module, exports, __webpack_require__) {

	(function() {
	  // body...
	  var Game = __webpack_require__(10);
	
	  var _game = new Game({
	    el: 'FoodField'
	  })
	
	  _game.run()
	
	  _game.on('ended', function () {
	    console.log('Game Over.')
	    document.getElementById("over").style.display = "block";
	  })
	  _game.on('goal', function (data) {
	    console.log('score:' + data)
	    document.getElementById("score").innerHTML = "score：" + data
	  })
	  _game.on('pause', function (data) {
	    console.log('Game Paused.')
	  })
	})();

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var DrawBG = __webpack_require__(11);
	var Fruit = __webpack_require__(12);
	var Score = __webpack_require__(13);
	var RetroSnake = __webpack_require__(14);
	
	function gameObj (opts) {
	  var _this = this;
	  _this.isPause = false
	  _this.speed = opts.speed ? opts.speed : 200; // 值越小，速度越快
	  var _foodfield = opts.el ? document.getElementById(opts.el) : '';
	  _this.foodfield = _foodfield;
	  _this.width = _foodfield.width;
	  _this.height = _foodfield.height;
	  _this.ctx = _foodfield.getContext('2d');
	  _foodfield = '';
	  DrawBG(_this.ctx);
	
	  _this.fruit = new Fruit(_this.ctx);
	
	  _this.score = new Score({
	    step: 100
	  });
	
	  _this.retrosnake = new RetroSnake(_this.ctx);
	  _this.retrosnake.init();
	  _this.retrosnake.on('dead', function () {
	    _this.fireended();
	  })
	  _this.retrosnake.on('alive', function () {
	    window.setTimeout(function () {
	      _this.run();
	    }, _this.speed);
	  })
	
	  _this.running = '';
	
	  _this.fire = {
	    ended: '',
	    goal: '',
	    pause: ''
	  }
	
	  document.onkeydown = function (event) {
	    var e = event || window.event || arguments.callee.caller.arguments[0];
	    if (e && e.keyCode == 38) { //up
	      _this.retrosnake.dir != 2 ? _this.retrosnake.dir = 0 : ''
	    }
	    if (e && e.keyCode == 39) { //right
	      _this.retrosnake.dir != 3 ? _this.retrosnake.dir = 1 : '';
	    }
	    if (e && e.keyCode == 40) { //down
	      _this.retrosnake.dir != 0 ? _this.retrosnake.dir = 2 : '';
	    }
	    if (e && e.keyCode == 37) { //left
	      _this.retrosnake.dir != 1 ? _this.retrosnake.dir = 3 : '';
	    }
	    if (e && e.keyCode == 32) { // space
	      _this.isPause = !_this.isPause
	      _this.isPause ? (typeof _this.fire.pause == 'function' ? _this.fire.pause() : '') : ''
	      _this.run()
	    }
	  }
	}
	
	gameObj.prototype.run = function () {
	  var _this = this;
	  !_this.isPause ? _this.frame() : '';
	}
	
	gameObj.prototype.frame = function () {
	  var _this = this;
	  DrawBG(_this.ctx);
	  _this.fruit.init(); // 生成果实
	  _this.retrosnake.move(); // 贪吃蛇移动
	  if (_this.retrosnake.head.x == _this.fruit.x && _this.retrosnake.head.y == _this.fruit.y) { //snake eats the fruit
	    _this.score.goal(); // 得分
	    typeof _this.fire.goal == 'function' ? _this.fire.goal(_this.score.score) : ''
	    _this.fruit.update();
	    _this.retrosnake.grow();
	  }
	}
	
	gameObj.prototype.on = function (type, func) { // 监听游戏状态
	  var _this = this;
	  switch (type) {
	    case 'ended': // 结束：
	      _this.fire.ended = typeof func == 'function' ? func : '';
	      break;
	    case 'goal': // 得分：
	      _this.fire.goal = typeof func == 'function' ? func : '';
	      break;
	    case 'pause': // 暂停：
	      _this.fire.pause = typeof func == 'function' ? func : '';
	      break;
	    default:
	      break;
	  }
	}
	
	gameObj.prototype.fireended = function () {
	  var _this = this;
	  typeof _this.fire.ended == 'function' ? _this.fire.ended() : '';
	}
	
	function hitSelf (retrosnake) {
	  var hitself = false;
	  for (var i = 0; i < retrosnake.body.length; i++) {
	    if (retrosnake.body[i].x == retrosnake.head.x && retrosnake.body[i].y == retrosnake.head.y) {
	      hitself = true;
	    }
	  }
	  return hitself;
	}
	
	module.exports = gameObj;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	function bG (ctx) {
	  var w = ctx.canvas.width
	  var h = ctx.canvas.height
	  ctx.save();
	  ctx.clearRect(0,0,w,h);
	  ctx.fillStyle = 'rgba(0,0,0,1)';
	  ctx.fillRect(0,0,w,h);
	  ctx.restore();
	}
	module.exports = bG;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	function fruit (ctx) {
	  this.ctx = ctx;
	  this.width = ctx.canvas.width;
	  this.height = ctx.canvas.height;
	  this.x = Math.floor(Math.random() * 49);
	  this.y = Math.floor(Math.random() * 49);
	}
	
	fruit.prototype.init = function () {
	  var ctx = this.ctx;
	  ctx.save();
	  ctx.fillStyle = "#FF7F24";
	  ctx.beginPath();
	  ctx.arc(this.x*10+5, this.y*10+5, 4, 0, 2*Math.PI);
	  ctx.closePath();
	  ctx.fill();
	  ctx.restore();
	}
	
	fruit.prototype.update = function () {
	  this.x = Math.floor(Math.random() * 49);
	  this.y = Math.floor(Math.random() * 49);
	}
	
	module.exports = fruit;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	function Score (opts) {
	  this.score = 0;
	  this.step = opts.step ? opts.step : 50
	}
	
	Score.prototype.goal = function () {
	  this.score += this.step
	}
	
	module.exports = Score;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	var _retroSnake = (function () {
	  function hitSelf (retrosnake) {
	    var hitself = false;
	    for (var i = 0; i < retrosnake.body.length; i++) {
	      if (retrosnake.body[i].x == retrosnake.head.x && retrosnake.body[i].y == retrosnake.head.y) {
	        hitself = true;
	      }
	    }
	    return hitself;
	  } 
	  function retroSnake (ctx) {
	    this.ctx = ctx;
	    this.width = ctx.canvas.width;
	    this.height = ctx.canvas.height;
	    this.head = {};
	    this.body = [];
	    this.dir;
	    this.tail;
	    this.fire = {
	      hitWall: '',
	      hitSelf: '',
	      dead: '',
	      alive: ''
	    }
	  }
	  retroSnake.prototype.init = function () {
	    var ctx = this.ctx;
	    this.head = {x:24,y:24};
	    this.body = [{x:25,y:24}];
	    this.dir = 0;
	    ctx.save();
	    ctx.fillStyle = "#7CCD7C";
	    ctx.fillRect(this.head.x*10+1,this.head.y*10+1,8,8);
	    for (var i = 0; i < this.body.length; i++) {
	      var x = this.body[i].x;
	      var y = this.body[i].y;
	      ctx.fillRect(x*10+2, y*10+2, 6, 6);
	    }
	    ctx.restore();
	  }
	
	  retroSnake.prototype.move = function (opts) {
	    var _this = this
	    var ctx = _this.ctx;
	    _this.tail = _this.body[_this.body.length - 1];
	    for (var i = _this.body.length-1; i > 0; i--) {
	      _this.body[i] = _this.body[i-1]; // [0, 1, 2] => [head, 1, 2]
	    }
	    _this.body[0] = _this.head;
	    switch(_this.dir){
	      case 0:
	        _this.head = { x: _this.head.x, y: _this.head.y - 1 };
	        break;
	      case 1:
	        _this.head = { x: _this.head.x + 1, y: _this.head.y };
	        break;
	      case 2:
	        _this.head = { x: _this.head.x, y: _this.head.y+1 };
	        break;
	      case 3:
	        _this.head = { x: _this.head.x - 1, y: _this.head.y };
	        break;
	    }
	    if (_this.head.x > 49 || _this.head.y > 49 || _this.head.x < 0 || _this.head.y < 0) { // snake hits the wall
	      typeof _this.fire.hitWall == 'function' ? _this.fire.hitWall() : ''
	      typeof _this.fire.dead == 'function' ? _this.fire.dead() : ''
	    } else if (hitSelf(_this)) { // snake hits itself
	      typeof _this.fire.hitSelf == 'function' ? _this.fire.hitSelf() : ''
	      typeof _this.fire.dead == 'function' ? _this.fire.dead() : ''
	    } else {
	      ctx.save();
	      ctx.fillStyle = "#7CCD7C";
	      ctx.fillRect(_this.head.x*10+1, _this.head.y*10+1, 8, 8);
	      for (var i = 0; i < _this.body.length; i++) {
	        var x = _this.body[i].x;
	        var y = _this.body[i].y;
	        ctx.fillRect(x*10 + 2, y*10 + 2, 6, 6);
	      }
	      ctx.restore();
	      typeof _this.fire.alive == 'function' ? _this.fire.alive() : ''
	    }
	  }
	
	  retroSnake.prototype.on = function (type, func) {
	    var _this = this
	    switch (type) {
	      case 'hitwall':
	        typeof func == 'function' ? _this.fire.hitWall = func : ''
	        break;
	      case 'hitself':
	        typeof func == 'function' ? _this.fire.hitSelf = func : ''
	        break;
	      case 'dead':
	        typeof func == 'function' ? _this.fire.dead = func : ''
	        break;
	      case 'alive':
	        typeof func == 'function' ? _this.fire.alive = func : ''
	        break;
	    }
	  }
	
	  retroSnake.prototype.grow = function(){
	    var ctx = this.ctx;
	    this.body.push(this.tail);
	    ctx.save();
	    ctx.fillStyle = "#7CCD7C";
	    ctx.fillRect(this.tail.x+2, this.tail.y+2, 6, 6);
	    ctx.restore();
	  }
	  return retroSnake;
	})();
	
	module.exports = _retroSnake;

/***/ })
/******/ ]);
//# sourceMappingURL=retrosnake.js.map