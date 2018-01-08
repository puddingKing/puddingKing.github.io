function Score (opts) {
  this.score = 0;
  this.step = opts.step ? opts.step : 50
}

Score.prototype.goal = function () {
  this.score += this.step
}

module.exports = Score;