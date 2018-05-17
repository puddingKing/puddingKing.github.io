import React from 'react';
import Car from '../modules/animations/car/app'

class ShowBox extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}

	componentDidMount() {
		var _car = new Car({
			el: '#road'
		})
	}

	render() {
		return (
			<div className="show-box">
				<canvas id="road" width="500" height="500"></canvas>
			</div>
		)
	}
}

export default ShowBox;