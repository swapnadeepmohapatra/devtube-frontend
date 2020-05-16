import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function Routes() {
	return (
		<BrowserRouter>
			<Navbar />
			<div style={{ minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Routes;
