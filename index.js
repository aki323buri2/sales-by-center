import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSaga from 'redux-saga';
import { createLogger } from 'redux-logger';
export const createApp = (App, reducers) => 
{
	const saga = createSaga();
	const logger = createLogger({
		predicate: (getState, action) => global.debug, 
	});
	const store = createStore(combineReducers(reducers), applyMiddleware(saga, logger));
	const app = <Provider store={store}><App/></Provider>;
	return {
		...app, 
		run: mainSaga => saga.run(mainSaga), 
	};
};