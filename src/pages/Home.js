import React, { useEffect, useState } from 'react';
import api from '../helper/api';
import HoverVideoPlayer from 'react-hover-video-player';
import { CircularProgress } from '@material-ui/core';
import '../css/home.css';

function Home() {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		api.get('getVideos').then((resp) => {
			console.log(resp.data.videos);
			setVideos(resp.data.videos);
		});
	}, []);

	return (
		<div>
			<h1>Recommended</h1>
			<ul className="videos-ul">
				{videos &&
					videos.map((video) => {
						// return <div>{JSON.stringify(video)}</div>;
						return (
							<li className="list-item" key={video._id}>
								<div className="video-list-item">
									<HoverVideoPlayer
										videoSrc={video.filePath}
										pausedOverlay={
											<img src={video.thumbnail} alt="" className="video-list-thumb" />
										}
										loadingOverlay={<CircularProgress />}
									/>
								</div>
								<div className="video-title">
									<img src={video.writer.image} alt="" className="account-img" />
									<h3>{video.title}</h3>
								</div>
								<h4>{video.writer.name}</h4>
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default Home;
