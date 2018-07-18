import './Pagination.scss';
import React from 'react';
import classnames from 'classnames';
export default class Pagination extends React.Component
{
	static defaultProps = {
		count: 0,
		current: 0, 
		pageClick: page => {}, 
	};
	render()
	{
		const { count, current, pageClick } = this.props;
		return (
			<div className="pagination-container content is-small">
				<div className="pagination">
					<a className="pagination-previous" onClick={this.prevPageClick}>Prev</a>
					<a className="pagination-next" onClick={this.nextPageClick}>Next</a>
					<ul className="pagination-list">
						<li>
						{Array(count).fill(0).map((v, i) =>
							<a key={i}
								className={classnames('pagination-link is-small', {
									'is-current': i === current, 
								})}
								onClick={e => pageClick(i)}
							>
								{i + 1}
							</a>
						)}
						</li>
					</ul>
				</div>
			</div>
		);
	}
	prevPageClick = () =>
	{
		const { current, count, pageClick } = this.props;
		if (current > 0) pageClick(current - 1);
	}
	nextPageClick = () =>
	{
		const { current, count, pageClick } = this.props;
		if (current < count - 1) pageClick(current + 1);
	}
};