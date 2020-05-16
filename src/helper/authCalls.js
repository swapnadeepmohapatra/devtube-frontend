const API = process.env.REACT_APP_BACKEND;

export const signup = (user) => {
	return fetch(`${API}signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/JSON',
			'Content-Type': 'application/JSON',
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return console.log(error);
		});
};

export const signin = (user) => {
	return fetch(`${API}signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/JSON',
			'Content-Type': 'application/JSON',
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return console.log(error);
		});
};

export const authenticate = (data, next) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('jwt', JSON.stringify(data));
		next();
	}
};

export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
		return false;
	} else if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	} else {
		return false;
	}
};
