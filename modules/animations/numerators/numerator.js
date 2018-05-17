var numerator = {
  born: function (x, y, r, water) {
    var ctx = water.getContext('2d')
    ctx.save()
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}

module.exports = numerator