(function() {
  // body...
  var Game = require('./app.js');

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