import React, { useEffect, useState } from 'react';
import api from '../helper/api';
import '../css/video.css';
import { Link } from 'react-router-dom';
import Comments from '../components/Comments';
import Subscribe from '../components/Subscribe';
import { isAuthenticated } from '../helper/authCalls';
import { AccountCircle } from '@material-ui/icons';

function ViewVideo(props) {
	const { match } = props;

	const [video, setVideo] = useState({});
	const [recommendedVideos, setRecommendedVideos] = useState([]);
	const [subscriberNumber, setSubscriberNumber] = useState(0);

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

	useEffect(() => {
		api.post('getRecommendedVideos', { videoId: match.params.videoId })
			.then((resp) => {
				console.log(resp.data.videos);
				setRecommendedVideos(resp.data.videos);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [match]);

	useEffect(() => {
		if (video.writer) {
			const subscriberNumberData = { userTo: video.writer._id };
			api.post('/getSubscriberById', subscriberNumberData).then((response) => {
				if (response.data.error) {
					alert('Failed to get subscriber Number');
				} else {
					console.log(response.data);

					setSubscriberNumber(response.data.subscriberNumber);
				}
			});
		}
	}, [video]);

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
								<div style={{ flex: 1 }}>
									<h4>{video.writer.name}</h4>
									<p>{subscriberNumber} subscribers</p>
								</div>
								<div>
									{isAuthenticated() ? (
										<Subscribe userTo={video.writer._id} userFrom={isAuthenticated().user._id} />
									) : (
										<button className="login-subs">
											<Link to="/login" className="link-nodec">
												<div className="nav-left">
													<AccountCircle className="account-img" />
													<div>
														<p className="padding10">Login to</p>
														<p className="padding10">Subscribe</p>
													</div>
												</div>
											</Link>
										</button>
									)}
								</div>
							</div>
						)}
					</div>
					<div>
						<Comments postId={video._id} />
					</div>
				</div>
				<div className="more-vids">
					<h3>More Videos</h3>
					{recommendedVideos &&
						recommendedVideos.map((video) => {
							return (
								<Link className="link-nodec" to={`/watch/video/${video._id}`} key={video._id}>
									<div className="rec-vids">
										<img src={video.thumbnail} style={{ width: '168px' }} />
										<div className="rec-vids-det">
											<h4>{video.title}</h4>
											{video.writer && <p>{video.writer.name}</p>}
										</div>
									</div>
								</Link>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default ViewVideo;
