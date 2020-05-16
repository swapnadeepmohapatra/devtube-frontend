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
