var WATER = require('../modules/water')
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