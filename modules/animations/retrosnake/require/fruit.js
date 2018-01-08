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