export const salesByCenterReducers = {
	kjob: (state = {}, action) =>
	{
		if (action.type === 'KJOB') return { ...state, ...action.payload }; 
		return state; 
	}, 
	syozok: (state = null, action) =>
	{
		if (action.type === 'SYOZOK') return action.payload; 
		return state; 
	}, 
	tokuno: (state = [], action) =>
	{
		if (action.type === 'TOKUNO') return action.payload; 
		return state; 
	}, 
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
};
export default salesByCenterReducers;