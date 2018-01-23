import DrawBG from './background.js';
import Fruit from './fruit.js';
import Score from './score.js';
import RetroSnake from './retrosnake.js';

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
    pause: '',
    playing: ''
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

gameObj.prototype.play = function () { // 触发播放
  var _this = this;
  _this.isPause = false;
  _this.run();
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
  _this.fire.playing()
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
    case 'playing':
      _this.fire.playing = typeof func == 'function' ? func : '';
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

// module.exports = gameObj;
export default gameObj;