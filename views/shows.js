import React from 'react';
import RetrosnakeGame from '../components/retrosnake_game';
import Numerator from '../components/numerator_motion';
import Car from '../components/car_motion';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import '../public/css/shows.css'

const projects = [{
	id: 1,
	name: "retrosnake",
	introduce: "贪吃蛇",
	poster: '../public/images/retrosnake.jpg'
}, {
	id: 2,
	name: "numerator",
	introduce: "分子运动",
	poster: '../public/images/numerator.jpg'
}, {
	id: 3,
	name: "car",
	introduce: "小车拐弯",
	poster: '../public/images/numerator.jpg'
}]

class Shows extends React.Component {
	constructor() {
		super();
		this.state = {
			isRetrosnakeGame: false,
			isNumerator: false,
		}
		// this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(project, e) {
		e.stopPropagation();
		switch (project) {
			case 'retrosnake':
				this.setState({isRetrosnakeGame: !this.state.isRetrosnakeGame})
				break
			case 'numerator':
				this.setState({isNumerator: !this.state.isNumerator})
				break
			case 'car':
				this.setState({isCar: !this.state.isCar})
				break
		}
		
	}

	render () {
		return (
			<div>
				{
					projects.map((item) => {
						return (
							<div className="item-box" key={item.id}>
								<ProjectItem name={item.name} poster={item.poster} introduce={item.introduce} onClick={this.handleClick.bind(this, item.name)}/>
							</div>
						)
					})
				}
				
				<div>
					<ReactCSSTransitionGroup
						transitionName="showmask"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
						{
							this.state.isRetrosnakeGame ? (
								<div className="show-mask" onClick={this.handleClick.bind(this, 'retrosnake')}>
									<div className="layer-content">
										<div className="layer-box">
											<RetrosnakeGame />
										</div>
									</div>
								</div>): ''
						}
						{
							this.state.isNumerator ? (
								<div className="show-mask" onClick={this.handleClick.bind(this, 'numerator')}>
									<div className="layer-content">
										<div className="layer-box">
											<Numerator />
										</div>
									</div>
								</div>): ''
						}
						{
							this.state.isCar ? (
								<div className="show-mask" onClick={this.handleClick.bind(this, 'car')}>
									<div className="layer-content">
										<div className="layer-box">
											<Car />
										</div>
									</div>
								</div>): ''
						}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}
}

function ProjectItem(props) {
	return (
		<div>
			<div className="project-item" onClick={props.onClick}>
				<img src={props.poster} alt={props.name} style={{'objectFit': 'cover'}}/>
			</div>
			<div className="project-info">{props.introduce}</div>
		</div>
	)
}

export default Shows;