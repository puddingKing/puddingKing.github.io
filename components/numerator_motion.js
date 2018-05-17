import React from 'react';
import WATER from '../modules/animations/numerators/water'

class ShowBox extends React.Component {
	constructor() {
		super();
		this.state = {
			water: ''
		}
	}

	componentDidMount() {
		var _this = this
		var water = document.querySelector('#water')

		var w = new WATER(water)
		_this.setState({
			water: w
		})
	}

	clearWater () {
		console.log(this.state.water)
	}

	render() {
		return (
			<div className="show-box">
				<canvas id="water" width="500" height="500"></canvas>
			</div>
		)
	}
}

export default ShowBox;