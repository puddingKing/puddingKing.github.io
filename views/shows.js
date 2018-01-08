import React from 'react';
import RetrosnakeGame from '../components/retrosnake_game'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import '../public/css/shows.css'

const projects = [{
	id: 1,
	name: "retrosnake",
	introduce: "an canvas game named retro snake",
	poster: '../public/images/retrosnake.jpg'
}, {
	id: 2,
	name: "numerator",
	introduce: "an canvas animation like numerators' motion",
	poster: ''
}]

class Shows extends React.Component {
	constructor() {
		super();
		this.state = {
			isRetrosnakeGame: false,
			now: ''
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({isRetrosnakeGame: !this.state.isRetrosnakeGame})
	}

	render () {
		return (
			<div>
				{
					projects.map((item) => {
						return (
							<div className="item-box" key={item.id}>
								<ProjectItem name={item.name} poster={item.poster} introduce={item.introduce} onClick={() => {
									this.setState({isRetrosnakeGame: !this.state.isRetrosnakeGame})
								}}/>
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
								<div className="show-mask" onClick={(e) => { this.handleClick() }}>
									<div className="layer-content">
										<div className="layer-box">
											<RetrosnakeGame project={this.state.now}/>
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
				<img src={props.poster} alt={props.name} />
			</div>
			<div className="project-info">{props.introduce}</div>
		</div>
	)
}

function showProject() {
	alert(1)
}

export default Shows;