import React, { useEffect, useState } from 'react';
import api from '../helper/api';
import '../css/video.css';

function ViewVideo(props) {
	const { match } = props;

	const [video, setVideo] = useState({});

	useEffect(() => {
		api.post('getVideoById', { videoId: match.params.videoId })
			.then((resp) => {
				console.log(resp.data.video);
				setVideo(resp.data.video);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [match]);

	return (
		<div className="video-main">
			<div className="video-app">
				<div className="main">
					{video && (
						<div>
							<video src={video.filePath} controls className="video-video"></video>
						</div>
					)}
					<div className="video-details">
						<h2>{video.title}</h2>
						<p>{video.description}</p>
						{video.writer && (
							<div className="author-details">
								<img src={video.writer.image} alt="" className="account-img" />
								<div>
									<h4>{video.writer.name}</h4>
									<p>19.1K subscribers</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewVideo;
