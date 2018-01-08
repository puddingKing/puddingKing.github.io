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