import React from 'react';
import '../public/css/shows.css'

const projects = [{
	id: 1,
	name: "retrosnake",
	introduce: "an canvas game named retro snake",
	poster: '../public/images/retrosnake.jpg'
}, {
	id: 2,
	name: "numerator",
	introduce: "an canvas animation liked numerators' motion",
	poster: ''
}]

class Shows extends React.Component {
	render () {
		return (
			<div>
				{
					projects.map((item) => {
						return (
							<div className="item-box" key={item.id}>
								<ProjectItem name={item.name} poster={item.poster} introduce={item.introduce} />
							</div>
						)
					})
				}
				<div className="show-mask">
					<div className="layer-content">
						<div className="layer-box">
							<div className="show-box"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function ProjectItem(props) {
	return (
		<div>
			<div className="project-item">
				<img src={props.poster} alt={props.name} />
			</div>
			<div className="project-info">{props.introduce}</div>
		</div>
	)
}

export default Shows;