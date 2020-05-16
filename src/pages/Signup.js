import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
		loading: false,
	});

	const { name, email, password, error, success, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		if (name.trim() !== '') {
			event.preventDefault();
			// setLoading(true);
			// const response = await api.post('/user', {
			// 	username,
			// });

			// const { _id } = response.data;
			// setLoading(false);
			// history.push(`/user/${_id}`);
		} else {
			// event.preventDefault();
			// alert('Enter your GitHub Username');
		}
	};
	return (
		<div className="app">
			<form onSubmit={handleSubmit} className="signup-form">
				<h1>Sign up</h1>
				<label>Name</label>
				<input type="text" value={name} placeholder="Name" onChange={handleChange('name')} />
				<label>Email</label>
				<input type="email" value={email} placeholder="Email" onChange={handleChange('email')} />
				<label>Password</label>
				<input value={password} type="password" placeholder="Password" onChange={handleChange('password')} />
				<div style={{ textAlign: 'center' }}>
					<h3>
						Have an account? <Link to="/login">Login</Link>
					</h3>
				</div>
				<button>SIGNUP</button>
			</form>
		</div>
	);
}

export default Signup;
