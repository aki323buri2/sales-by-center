import './SalesByCenter.scss';
import React from 'react';
import numeral from 'numeral';
import classnames from 'classnames';
import createSections from './createSections';
import Pagination from './Pagination';
const int = n => numeral(n).format('0,0');
const dec = n => numeral(n).format('0,0.00');
export default class SalesByCenter extends React.Component
{
	static defaultProps = {
		salesByCenter: [], 
		groupBy: [], 
	};
	render()
	{
		const { salesByCenter, groupBy } = this.props;
		const sections = createSections(salesByCenter, groupBy);
		return (
			<div className="sales-by-center">
				<div className="message content is-small">
					<div className="message-body">
						{int(salesByCenter.length)}件
					</div>
				</div>

				<Sections sections={sections}/>

			</div>
		);
	}
};
class Sections extends React.Component
{
	static defaultProps = {
		sections: {}, 
	};
	render()
	{
		const { sections } = this.props;
		return (
			<div className="sections">
			{Object.entries(sections).map(([ section, body ], i) =>
				<Section key={i}
					section={JSON.parse(section)}
					body={body}
				/>
			)}
			</div>
		);
	}
};
class Section extends React.Component
{
	static defaultProps = {
		section: {}, 
		body: [], 
		displayLines: 20, 
		columnTitles: {
			syaten : '店舗CD', 
			tmein  : '店舗名', 
			shcds  : '商品CD', 
			shnm1  : '商品名', 
			utanka : '売上単価', 
			usuryo : '数量', 
			ujyury : '重量', 
			ukin   : '売上金額', 
		}, 
		columnFunctions: {
			utanka: dec,  
			usuryo: dec, 
			ujyury: dec, 
			ukin: int, 
		}, 
	};
	state = {
		currentPage: 0, 
	}; 
	render()
	{
		const { section, body } = this.props;
		const { columnTitles, columnFunctions } = this.props;
		const { tokuno, ryakun, center, izblno, izblnn } = section;
		const displayValue = name => value => (columnFunctions[name] || (s=>s))(value);
		const pick = body[0];
		const columns = Object.keys(pick).map(name => ({ name, title: columnTitles[name] }));
		const total = body.length;
		const { displayLines } = this.props;
		let { currentPage } = this.state;
		let offset = currentPage * displayLines;
		if (offset > total - 1)
		{
			offset = 0;
			currentPage = 0;
		}
		const pagesCount = Math.floor((total + displayLines - 1) / displayLines);
		return (
			<div className="section-container">
				<div className="section-title">
					{tokuno && 
						<span className="tokuno">
							{tokuno}
							:
							{' '}
							{ryakun}
						</span>
					}
					{center && 
						<span className="center">
							{' '}(
							{' '}
							{izblno}
							{izblnn}
							:
							{center}
							{' '}
							)
						</span>
					}
				</div>

				<a className="button is-small is-default">
					<span className="icon is-small">
						<i className="fas fa-download"></i>
					</span>
					<span>Download</span>
				</a>

				<div className="pages">
					{currentPage + 1} / {pagesCount}ページ
					{' '}
					(
					{offset + 1}～{offset + displayLines} / {total}件
					)
				</div>

				<table className="table is-narrow is-bordered is-striped">
					<thead>
						<tr>
							<th className="no">No.</th>
						{columns.map(({ name, title }, i) =>
							<th key={i} className={name}>{title}</th>
						)}
						</tr>
					</thead>
					<tbody>
					{body.slice(offset, offset + displayLines).map((row, i) =>
						<tr key={i}>
							<td className="no">{offset + i + 1}</td>
						{Object.entries(row).map(([ name, value ], i) =>
							<td key={i} className={name}>
								{displayValue(name)(value)}
							</td>
						)}
						</tr>
					)}
					</tbody>
				</table>
				
				<div className="section-footer">
				{pagesCount > 1 &&
					<Pagination
						current={currentPage}
						count={pagesCount}
						pageClick={currentPage => this.setState({ currentPage })}
					/>
				}
				</div>

			</div>
		);
	}
};