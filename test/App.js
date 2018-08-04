import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import SalesByCenter from '../lib/SalesByCenter';
@connect(state => state)
export default class App extends React.Component 
{
	render()
	{
		const { fetchSalesByCenterParams } = this.props;
		const { salesByCenter, groupBy, salesByCenterPending: pending } = this.props;
		const action = (type, payload) => this.props.dispatch({ type, payload });
		return (
			<div className="app content is-small">
				せいるずばいせんたあ

				<SalesByCenter
					fetchSalesByCenterParams={fetchSalesByCenterParams}
					salesByCenter={salesByCenter}
					pending={pending}
					groupBy={groupBy}
					groupByChange={groupBy => action('GROUP_BY', groupBy)}
				/>
			</div>
		);
	}
};