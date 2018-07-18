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
};
export default salesByCenterReducers;