import './GroupBy.scss';
import React from 'react';
export default class GroupBy extends React.Component
{
	static defaultProps = {
		book: {
			tokuno　: '得意先CD', 
			center　: 'センター', 
			syaten　: '店舗CD', 
			shcds 　: '商品CD', 
			utanka　: '売上単価',
		}, 
		groupBy: [], 
		onChange: groupBy => {}, 
	};
	render()
	{
		const { book, groupBy } = this.props;
		return (
			<div className="group-by field">
			{Object.entries(book).map(([ name, title ], i) =>
				<Checkbox key={i}
					name={name}
					title={title}
					checked={groupBy.includes(name)}
					onChange={this.onChange}
				/>
			)}
			</div>
		);
	}
	onChange = e =>
	{
		let { groupBy } = this.props;
		const name = e.target.getAttribute('id');
		const checked = e.target.checked;
		const index = groupBy.indexOf(name);
		if (checked)
		{
			if (index === -1) groupBy = [ ...groupBy , name ]; 
		}
		else
		{
			if (index !== -1) (groupBy = [ ...groupBy ]).splice(index, 1);
		}
		this.props.onChange(groupBy);
	}
};
class Checkbox extends React.Component
{
	render()
	{
		const { name, title, checked, onChange } = this.props;
		return (
			<div className="checkbox">
				<input type="checkbox" className="is-checkradio is-small" 
					id={name}
					checked={checked}
					onChange={onChange}
				/>
				<label htmlFor={name}>
					{title}
				</label>
			</div>
		);
	}
};