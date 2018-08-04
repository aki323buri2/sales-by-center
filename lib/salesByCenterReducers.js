import moment from 'moment';
export const salesByCenterReducers = {
	groupBy: (state = [], action) => 
	{
		if (action.type === 'GROUP_BY') return action.payload; 
		return state;
	}, 
	salesByCenter: (state = [], action) => 
	{
		if (action.type === 'SALES_BY_CENTER') return action.payload; 
		return state;
	}, 
	salesByCenterPending: (state = false, action) => 
	{
		if (action.type === 'SALES_BY_CENTER_PENDING') return action.payload; 
		return state;
	}, 
	fetchSalesByCenterParams: (state = {
		kjob: {
			since: moment().startOf('days'), 
			until: moment().startOf('days'), 
		}, 
		syozok: null, 
		tokuno: [], 
	}, action) =>
	{
		if (action.type === 'FETCH_SALES_BY_CENTER_PARAMS') return { ...state, ...action.payload };
		return state;
	}, 
	fetchSalesByCenterError: (state = null, action) =>
	{
		if (action.type === 'FETCH_SALES_BY_CENTER_ERROR') return action.payload;
		return state;
	}
};
export default salesByCenterReducers;