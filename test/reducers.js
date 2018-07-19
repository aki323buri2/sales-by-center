import salesByCenterReducers from '../lib/salesByCenterReducers';
export const reducers = {
	test: (state = null, action) =>
	{
		if (action.type === 'TEST') return action.payload; 
		return state; 
	}, 
	

	...salesByCenterReducers
};
export default reducers;