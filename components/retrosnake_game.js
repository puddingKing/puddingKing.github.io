import React from 'react';
import Game from '../modules/animations/retrosnake/app'

class ShowBox extends React.Component {
	constructor() {
		super()
	}

	componentDidMount() {
		console.log('did mounted')
		console.log(document.getElementById('foodfield'))
		var _game = new Game({
			el: 'foodfield'
		})
		_game.run()
		_game.on('ended', function () {
			console.log('Game Over.')
			// document.getElementById("over").style.display = "block";
		})
		_game.on('goal', function (data) {
			console.log('score:' + data)
			// document.getElementById("score").innerHTML = "score：" + data
		})
		_game.on('pause', function (data) {
			console.log('Game Paused.')
		})
	}

	render() {
		return (
			<div className="show-box" onClick={(e)=>{e.stopPropagation();}}>
				<canvas id="foodfield" width="500" height="500"></canvas>
			</div>
		)
	}
}

export default ShowBox;