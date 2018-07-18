import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import SalesByCenter from '../lib/SalesByCenter';
@connect(state => state)
export default class App extends React.Component 
{
	render()
	{
		const { salesByCenter, groupBy } = this.props;
		const action = (type, payload) => this.props.dispatch({ type, payload });
		return (
			<div className="app content is-small">
				せいるずばいせんたあ

				<SalesByCenter
					salesByCenter={salesByCenter}
					groupBy={groupBy}
				/>
			</div>
		);
	}
};