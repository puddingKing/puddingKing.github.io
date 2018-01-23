import React from 'react';
import Game from '../modules/animations/retrosnake/app'

class ShowBox extends React.Component {
	constructor() {
		super();
		this.state = {
			isPlaying: false,
			score: 0,
			game: ''
		}
	}

	componentDidMount() {
		var _this = this
		console.log('did mounted')
		console.log(document.getElementById('foodfield'))
		var _game = new Game({
			el: 'foodfield'
		})
		_this.setState({
			game: _game
		})
		// _game.run()
		
		_game.on('goal', function (data) {
			_this.setState({
				score: data
			})
		})
		_game.on('pause', function () {
			console.log('pause...')
			_this.setState({ isPlaying: false })
		})
		_game.on('playing', function () {
			_this.setState({ isPlaying: true })
		})
		_game.on('ended', function () {
			console.log('Game Over.')
		})
	}

	render() {
		return (
			<div className="show-box" onClick={(e)=>{e.stopPropagation();}}>
				<p className="score">score: {this.state.score}</p>
				<canvas id="foodfield" width="500" height="500"></canvas>
				{
					!this.state.isPlaying ? (
						<div className="btn-run-box">
							<img className="btn-run" src='../public/images/btn_play.png' onClick={(e) => {this.state.game.play(),this.setState({ isPlaying: true })}}/>
						</div>
					): ''
				}
				<p className="game-tip">上下左右控制方向</p>
				<p className="game-tip">空格键暂停/开始</p>
			</div>
		)
	}
}

export default ShowBox;