import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import SalesByCenter from '../lib/SalesByCenter';
@connect(state => state)
export default class App extends React.Component 
{
	render()
	{
		const { kjob, syozok, tokuno } = this.props;
		const { salesByCenter, groupBy, salesByCenterPending: pending } = this.props;
		const action = (type, payload) => this.props.dispatch({ type, payload });
		return (
			<div className="app content is-small">
				せいるずばいせんたあ

				<SalesByCenter
					kjob={kjob}
					syozok={syozok}
					tokuno={tokuno}
					salesByCenter={salesByCenter}
					pending={pending}
					groupBy={groupBy}
				/>
			</div>
		);
	}
};