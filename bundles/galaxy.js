/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// var $ = require('jquery');
	var clientBody = __webpack_require__(1);
	var backGround = __webpack_require__(2);
	var rounds = __webpack_require__(4);
	var galaxy = document.getElementById("galaxy");
	var ctx = galaxy.getContext("2d");
	galaxy.setAttribute("width",clientBody.clientWidth);
	galaxy.setAttribute("height",clientBody.clientHeight);
	var width = galaxy.width;
	var height = galaxy.height;

	(function(){
		backGround.bg(ctx,width,height);  //初始化背景
		rounds.init(ctx,width,height);   //初始化若干圆点
		anim();  //动画

		function anim(){
			ctx.clearRect(0,0,width,height);
			backGround.bg(ctx,width,height);
			rounds.move(ctx,width,height);

			window.requestAnimationFrame(arguments.callee);
		}
	})();



/***/ },
/* 1 */
/***/ function(module, exports) {

	var clientBody = {
		"clientWidth":document.body.clientWidth,
		"clientHeight":document.documentElement.clientHeight
	}
	module.exports = clientBody;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var roundsData = __webpack_require__(3);

	var backGround = {
		"bg":function(ctx,width,height){
			ctx.clearRect(0,0,width,height);
			ctx.save();
			ctx.fillStyle = "#eaeaea";
			ctx.fillRect(0,0,width,height);
			ctx.strokeStyle = "#BFBFBF";
			ctx.beginPath();
			ctx.arc(width/2,height/2,roundsData.r-50,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
			ctx.font="60px Baloo Bhai";
			ctx.fillStyle = roundsData.colors[0];
			var textH = height/2;
			ctx.fillText('H',width/2-100,textH);
			ctx.fillStyle = roundsData.colors[1];
			ctx.fillText('E',width/2-60,textH);
			ctx.fillStyle = roundsData.colors[2];
			ctx.fillText('L',width/2-20,textH);
			ctx.fillStyle = roundsData.colors[3];
			ctx.fillText('L',width/2+20,textH);
			ctx.fillStyle = roundsData.colors[4];
			ctx.fillText('O',width/2+60,textH);
			// ctx.fillStyle = roundsData.colors[5];
			// ctx.fillText('S',width/2+100,textH);
			ctx.restore();
		}
	}
	module.exports = backGround;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var roundsData = {
		"colors":['#FF6A6A','#B0E0E6','#FF7F24','#836FFF','#EE7621','#A8A8A8'],
		"roundNum":140,
		"roundR":7,
		"rounds":[],
		"roundsLowSpeed":1,
		"roundsHighSpeed":2,
		"r":400,
		"R":550
	}
	module.exports = roundsData;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var round = __webpack_require__(5);
	var roundsData = __webpack_require__(3);
	var backGround = __webpack_require__(2);

	var rounds = {
		"init":function(ctx,width,height){
			var colors = roundsData.colors;
			for (var i = 0; i < roundsData.roundNum; i++) {
				var deg = 360*Math.random()*Math.PI/180;
				var tempNum = Math.random()*colors.length;
				tempNum = Math.floor(tempNum);
				var distance = Math.random()*(roundsData.R-roundsData.r) + roundsData.r;
				round.born(ctx,distance,0,roundsData.roundR,colors[tempNum],deg);  //给出点的坐标位置
				var speed = 1/distance*(Math.random()*(roundsData.roundsHighSpeed-roundsData.roundsLowSpeed)+roundsData.roundsLowSpeed);
				var newRound = new Object();
				newRound.distance = distance;
				newRound.color = colors[tempNum];
				newRound.deg = deg;
				newRound.speed = speed;
				roundsData.rounds.push(newRound);
			}
		},
		"move":function(ctx,width,height){
			var r = roundsData.roundR;
			for (var i = 0; i < roundsData.rounds.length; i++) {
				roundsData.rounds[i].deg = roundsData.rounds[i].deg + roundsData.rounds[i].speed;
				round.born(ctx,roundsData.rounds[i].distance,0,r,roundsData.rounds[i].color,roundsData.rounds[i].deg);
			}
		}
	}
	module.exports = rounds;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var round = {
		"born":function(ctx,x,y,r,color,deg){
			ctx.save();
			ctx.fillStyle = color;
			ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
			ctx.rotate(deg);
			ctx.beginPath();
			ctx.arc(x,y,r,0,2*Math.PI);
			ctx.fill();
			ctx.restore();
		}
	}
	module.exports = round;

/***/ }
/******/ ]);