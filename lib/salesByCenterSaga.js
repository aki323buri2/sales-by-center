import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
export const salesByCenterSaga = function *()
{
	yield takeLatest('FETCH_SALES_BY_CENTER', function *(action)
	{
		const { kjob, syozok, tokuno } = action.payload;
		const params = {
			kjob: [
				kjob.since.format('YYYYMMDD'), 
				kjob.until.format('YYYYMMDD')
			].join(','), 
			syozok, 
			tokuno: tokuno.join(','), 
		};
		yield put({ type: 'SALES_BY_CENTER_PENDING', payload: true });
		yield delay(2000);
		yield put({ type: 'SALES_BY_CENTER', payload: yield call(fetchSalesByCenter, params) });
		yield put({ type: 'SALES_BY_CENTER_PENDING', payload: false });
	});
}; 
export default salesByCenterSaga;

// const fetchSalesByCenterUrl = 'http://laravel.shokuryu-dwh.zeus.sss/sales-by-center';
const fetchSalesByCenterUrl = 'http://tk2-232-25926.vs.sakura.ne.jp:81/sales-by-center';

const fetchSalesByCenter = async params =>
{
	try
	{
		return await axios(fetchSalesByCenterUrl, {
			params, 
		}).then(res => res.data);
	}
	catch (err)
	{
		throw err;
	}
};