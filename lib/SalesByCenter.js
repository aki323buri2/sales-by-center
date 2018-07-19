import './SalesByCenter.scss';
import React from 'react';
import numeral from 'numeral';
import classnames from 'classnames';
import createSections from './createSections';
import LoadingOverlay from './LoadingOverlay';
import Downloader from './Downloader';
import Pagination from './Pagination';
const int = n => numeral(n).format('0,0');
const dec = n => numeral(n).format('0,0.00');
export default class SalesByCenter extends React.Component
{
	static defaultProps = {
		kjob: {
			since: null, 
			until: null, 
		}, 
		syozok: null, 
		tokuno: [], 
		salesByCenter: [], 
		pending: false, 
		groupBy: [], 
	};
	render()
	{
		const { pending } = this.props;
		const { kjob, syozok, tokuno } = this.props;
		const { salesByCenter, groupBy } = this.props;
		const sections = createSections(salesByCenter, groupBy);
		return (
			<div className="sales-by-center">

				<LoadingOverlay
					active={pending}
					text="センター別売上を取得しています..."
				/>

				<div className="message content is-small">
					<div className="message-body">
						<div className="field">
							<div className="field-title">計上日 : </div>
							<div className="field-body">
							{kjob.since && kjob.since.format('YYYYY-MM-DD')}
							{' '}～{' '}
							{kjob.until && kjob.until.format('YYYYY-MM-DD')}
							</div>
						</div>
						<div className="field">
							<div className="field-title">所属CD : </div>
							<div className="field-body">
								{syozok}
							</div>
						</div>
						<div className="field">
							<div className="field-title">得意先CD : </div>
							<div className="field-body">
								{tokuno.join(',')}
							</div>
						</div>
						<div className="field">
							<div className="field-title">明細件数 : </div>
							<div className="field-body">
								{int(salesByCenter.length)}件
							</div>
						</div>
					</div>
				</div>

				<Sections {...{ kjob, syozok, tokuno }} sections={sections}/>
				
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
		const { sections, ...other } = this.props;
		return (
			<div className="sections">
			{Object.entries(sections).map(([ section, body ], i) =>
				<Section key={i}
					section={JSON.parse(section)}
					body={body}
					{...other}
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
	memo = {};
	render()
	{
		const { kjob, syozok, tokuno: tokunoList } = this.props;
		const { section, body } = this.props;
		const { columnTitles, columnFunctions } = this.props;
		const { tokuno, ryakun, center, izblno, izblnn } = section;
		const displayValue = name => value => (columnFunctions[name] || (s=>s))(value);
		// columns
		const pick = body[0];
		const columns = Object.keys(pick).map(name => ({ name, title: columnTitles[name] }));
		//pagination
		const total = body.length;
		const { displayLines } = this.props;
		let { currentPage } = this.state;
		let offset = currentPage * displayLines;
		//トータル行数が変わっていればオフセットをリセットする
		if (this.memo.total !== total)
		{
			offset = 0;
			currentPage = 0;
			this.memo.total = total;
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

				<Downloader
					head={section}
					body={body}
					filename={[
						'センター別売上実績', 
						[
							kjob.since ? kjob.since.format('YYYYMMDD') : '', 
							kjob.until ? kjob.until.format('YYYYMMDD') : '', 
						].join('-'), 
						syozok, 
						tokunoList.join(','), 
						tokuno, 
						ryakun, 
						izblno, 
						izblnn, 
						center, 
						'.csv', 
					].join('_')}
				/>

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