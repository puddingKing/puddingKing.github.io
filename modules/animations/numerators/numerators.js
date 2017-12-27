var data = require('./data')

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
          ctx.strokeStyle = '#fff'
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