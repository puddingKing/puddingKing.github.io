require('../public/css/homepage.css')
var WATER = require('../modules/water')
// 获取画布
var water = document.querySelector('#water')
water.width = document.documentElement.clientWidth
// 初始化分子
if (water) {
  var w = new WATER(water)
  w.init(water)
  // 分子运动
  var watering = window.requestAnimationFrame(timer)
  function timer () {
    w.flow(water)
    watering = window.requestAnimationFrame(timer)
  }
  document.querySelector('#water').addEventListener('click', function (e) {
    var x = e.clientX - water.offsetLeft
    var y = e.clientY - water.offsetTop
    w.addOne(x, y)
  })
  window.addEventListener('resize', function () {
    water.width = document.documentElement.clientWidth
  })
}
