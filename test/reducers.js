import salesByCenterReducers from '../lib/salesByCenterReducers';
export const reducers = {
	test: (state = null, action) =>
	{
		if (action.type === 'TEST') return action.payload; 
		return state; 
	}, 
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

	...salesByCenterReducers
};
export default reducers;