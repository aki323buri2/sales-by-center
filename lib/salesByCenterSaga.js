import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
export const salesByCenterSaga = function *()
{
	yield takeLatest('FETCH_SALES_BY_CENTER', function *(action)
	{
		const { kjob, syozok, tokuno } = action.payload;

		yield put({ type: 'FETCH_SALES_BY_CENTER_PARAMS', payload: {
			kjob: {
				since: kjob.since.clone(), 
				until: kjob.until.clone(), 
			}, 
			syozok, 
			tokuno: [ ...tokuno ], 
		}});

		const params = {
			kjob: [
				kjob.since.format('YYYYMMDD'), 
				kjob.until.format('YYYYMMDD')
			].join(','), 
			syozok, 
			tokuno: tokuno.join(','), 
		};
		yield put({ type: 'SALES_BY_CENTER_PENDING', payload: true });
		// yield delay(2000);
		yield put({ type: 'SALES_BY_CENTER', payload: yield call(fetchSalesByCenter, params) });
		yield put({ type: 'SALES_BY_CENTER_PENDING', payload: false });
	});
}; 
export default salesByCenterSaga;

const fetchSalesByCenterUrl = 'http://laravel.shokuryu-dwh.zeus.sss/sales-by-center';
// const fetchSalesByCenterUrl = 'http://tk2-232-25926.vs.sakura.ne.jp:81/sales-by-center';

const fetchSalesByCenter = function *(params) 
{
	try
	{
		const fetch = () => axios(fetchSalesByCenterUrl, { params }).then(res => res.data);
		return yield call(fetch);
	}
	catch (err)
	{
		yield put({ type: 'FETCH_SALES_BY_CENTER_ERROR', payload: err });
		return [];
	}
};