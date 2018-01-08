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