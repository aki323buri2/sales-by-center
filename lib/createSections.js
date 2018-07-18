export const createSections = (salesByCenter, groupBy) =>
{
	const sectionKeynames = {
		tokuno: [ 'ryakun' ], 
		center: [ 'izblno', 'izblnn' ], 
	};
	const bodyKeynames = {
		syaten: [ 'tmein' ], 
		shcds : [ 'shnm1' ], 
		utanka: [], 
	};
	const filterAndFlatten = keynames => Object.keys(keynames)
		.filter(name => groupBy.includes(name))
		.map(name => [ name, ...keynames[name] ])
		.reduce((acc, cur) =>
		{
			acc = [ ...acc, ...cur ];
			return acc;
		}, [])
	;
	const sectionKeynamesFlatten = filterAndFlatten(sectionKeynames);
	const bodyKeynamesFlatten    = filterAndFlatten(bodyKeynames);
	
	let sections = salesByCenter.reduce((acc, row) =>
	{
		const createKeys = names => names.reduce((acc, name) =>
		{
			acc[name] = row[name]; 
			return acc;
		}, {});
		const sectionKey = JSON.stringify(createKeys(sectionKeynamesFlatten));
		const bodyKey    = JSON.stringify(createKeys(bodyKeynamesFlatten));
		
		const section = acc[sectionKey] || (acc[sectionKey] = {});
		const body = section[bodyKey] || (section[bodyKey] = { usuryo: 0, ujyury: 0, ukin: 0 });
		body.usuryo += row.usuryo;
		body.ujyury += row.ujyury;
		body.ukin   += row.ukin;

		return acc;
	}, {});

	sections = Object.entries(sections).reduce((acc, [ section, body ]) =>
	{
		acc[section] = Object.entries(body).map(([ key, value ]) => ({
			...JSON.parse(key), 
			...value, 
		}));
		return acc; 
	}, {});

	return sections;
};
export default createSections;