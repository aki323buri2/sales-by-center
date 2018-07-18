import './Pagination.scss';
import React from 'react';
export default class Pagination extends React.Component
{
	static defaultProps = {
		count: 0,
		current: 0, 
		pageClick: page => {}, 
	};
	render()
	{
		const { count, current } = this.props;
		return (
			<div className="pagination-container content is-small">
				<div className="pagination">
					<div className="pagination-previous">Prev</div>
					<div className="pagination-next">Next</div>
					<ul className="pagination-list">
						<li>
							<a className="pagination-link is-small">1</a>
							<a className="pagination-link is-small">2</a>
							<a className="pagination-link is-small">3</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};