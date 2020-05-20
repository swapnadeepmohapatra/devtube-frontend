import React, { useState } from 'react';
import '../css/comments.css';
import api from '../helper/api';
import { isAuthenticated } from '../helper/authCalls';

function Comments({ postId }) {
	const [comment, setComment] = useState('');

	const handleChange = (event) => {
		setComment(event.currentTarget.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const commentData = {
			content: comment,
			writer: isAuthenticated().user._id,
			postId: postId,
		};

		api.post('/saveComment', commentData).then((data) => {
			if (data.error) {
				console.log(data.error);
				alert('Failed to save Comment');
			} else {
				console.log(data);
				setComment('');
			}
		});
	};

	return (
		<div>
			<h2>Comments</h2>
			<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
				<input type="text" onChange={handleChange} value={comment} placeholder="write some comments" />
				<br />
				<button>Comment</button>
			</form>
		</div>
	);
}

export default Comments;
