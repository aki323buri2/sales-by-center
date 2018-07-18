import './LoadingOverlay.scss';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
export default class LoadingOverlay extends React.Component
{
	static defaultProps = {
		active: false, 
		text: 'ろおでぃんぐおおばあれい？', 
	};
	render()
	{
		const { active, text } = this.props;
		return (
			<div className="loading-overlay">
				<CSSTransition
					in={active}
					classNames="pending"
					timeout={{ enter: 500, exit: 500 }}
					unmountOnExit
				>
					<div className="overlay">
						<div className="loading-display">
							<div className="icon-display">
								<span className="icon is-large">
									<i className="fas fa-circle-notch fa-3x fa-spin"></i>
								</span>
							</div>
							<div className="text-display">
								{text}
							</div>
						</div>
					</div>
				</CSSTransition>
			</div>
		);
	}
};