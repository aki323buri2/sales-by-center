import { put, call, fork } from 'redux-saga/effects';
import salesByCenterSaga from '../lib/salesByCenterSaga';
import moment from 'moment';
export const mainSaga = function *()
{
	yield put({ type: 'TEST', payload: 'test' });
	yield fork(salesByCenterSaga);

	yield put({ type: 'KJOB', payload: {
		since: moment('2018-05-29'), 
		until: moment('2018-05-29'), 
	}});
	yield put({ type: 'SYOZOK', payload: 160 });
	yield put({ type: 'TOKUNO', payload: [16509,16511,16512,16513,16518] });
	yield put({ type: 'GROUP_BY', payload: [ 'tokuno', 'center', 'syaten', 'shcds', 'utanka' ] });

	yield put({ type: 'FETCH_SALES_BY_CENTER' });

};
export default mainSaga;