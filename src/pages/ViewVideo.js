import React from 'react';

function ViewVideo(props) {
	const { match } = props;

	return (
		<div>
			<h1>{match.params.videoId}</h1>
		</div>
	);
}

export default ViewVideo;
