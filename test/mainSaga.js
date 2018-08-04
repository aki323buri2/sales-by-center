import { put, call, fork } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import salesByCenterSaga from '../lib/salesByCenterSaga';
import moment from 'moment';
export const mainSaga = function *()
{
	yield put({ type: 'TEST', payload: 'test' });
	yield fork(salesByCenterSaga);

	
	yield put({ type: 'GROUP_BY', payload: [ 'tokuno', 'center', 'syaten', 'shcds', 'utanka' ] });

	const kjob = {
		since: moment('2018-05-29'), 
		until: moment('2018-05-29'), 
	};
	const syozok = 160;
	const tokuno = [16509,16511,16512,16513,16518];

	yield put({ type: 'FETCH_SALES_BY_CENTER', payload: { kjob, syozok, tokuno } });

};
export default mainSaga;