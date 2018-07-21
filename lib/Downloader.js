import './Downloader.scss';
import React from 'react';
export default class Downloader extends React.Component
{
	static defaultProps = {
		filename: 'download', 
		head: {}, 
		body: [], 
	};
	render()
	{
		const { filename } = this.props;
		return (
			<div className="downloader">
				
				<a className="button is-small is-primary tooltip is-tooltip-right"
					onClick={this.onClick}
					download={`${filename}.csv`}
					data-tooltip={filename}
				>
					<span className="icon is-small">
						<i className="fas fa-download"></i>
					</span>
					<span>
						CSVダウンロード
					</span>
				</a>
			</div>
		);
	}
	onClick = e =>
	{
		const bom = new Uint8Array([ 0xef, 0xbb, 0xbf ]); // BOM
		const { head, body } = this.props;
		let { filename } = this.props;
		filename += '.csv';
		const data = body.map(body =>
		{
			return { ...head, ...body };
		});
		const blob = new Blob([ bom, toCSV(data) ], { type: 'application/octet-stream' });
		if (window.navigator.msSaveBlob)
		{
			window.navigator.msSaveBlob(blob, filename);
		}
		else
		{
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		}
	}
};
const toCSV = data =>
{
	const columns = Object.keys(data[0]);
	const array = [ columns.map(column => `"${column}"`).join(',') ]
		.concat(data.map(row =>
		{
			return Object.values(row).map(value => `"${value}"`).join(',');
		}))
	;
	return array.join('\n');
};