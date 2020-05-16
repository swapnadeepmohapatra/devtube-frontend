import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';

function Routes() {
	return (
		<BrowserRouter>
			<div>Navabar</div>
			<div style={{ minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Routes;
