import React, { useState, useEffect } from 'react';
import api from './helper/api';
function Routes() {
	const [data, setData] = useState({});

	useEffect(() => {
		api.get('/')
			.then((sdata) => {
				console.log(sdata.data);

				setData(sdata.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	return (
		<div>
			<h1>{JSON.stringify(data)}</h1>
		</div>
	);
}

export default Routes;
