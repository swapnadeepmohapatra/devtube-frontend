import React, { useEffect, useState } from "react";
import api from "../helper/api";
import HoverVideoPlayer from "react-hover-video-player";
import { CircularProgress } from "@material-ui/core";
import "../css/home.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helper/authCalls";
import { AccountCircle } from "@material-ui/icons";

function Subscriptions() {
  const [videos, setVideos] = useState([]);
  const [isSubs, setIsSubs] = useState(false);
  const [loading, setLoading] = useState(true);

  let userData;

  if (isAuthenticated()) {
    userData = { userFrom: isAuthenticated().user._id };
  }

  useEffect(() => {
    if (isAuthenticated()) {
      api.post("getSubscriptionVideos", userData).then((resp) => {
        console.log(resp.data.videos);

        if (resp.data.videos.length === 0) {
          setIsSubs(false);
        } else {
          setIsSubs(true);
          setVideos(resp.data.videos);
        }
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="app">
        <h1>Don’t miss new videos</h1>
        <h3>Sign in to see updates from your favorite DevTube channels</h3>
        <Link to="/login" className="link-nodec">
          <div className="nav-left">
            <AccountCircle className="account-img" />
            <p className="padding10">SIGN IN</p>
          </div>
        </Link>
      </div>
    );
  }

  if (isSubs) {
    return (
      <div>
        <h1>Subscriptions</h1>
        <ul className="videos-ul">
          {videos &&
            videos.map((video) => {
              return (
                <li className="list-item" key={video._id}>
                  <Link className="link-nodec" to={`/watch/video/${video._id}`}>
                    <div className="video-list-item">
                      <HoverVideoPlayer
                        videoSrc={video.filePath}
                        pausedOverlay={
                          <img
                            src={video.thumbnail}
                            alt=""
                            className="video-list-thumb"
                          />
                        }
                        loadingOverlay={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <CircularProgress />
                          </div>
                        }
                      />
                    </div>
                    <div className="video-title">
                      <img
                        src={video.writer.image}
                        alt=""
                        className="account-img"
                      />
                      <h3>{video.title}</h3>
                    </div>
                    <h4>{video.writer.name}</h4>
                    <h4>
                      {" "}
                      {moment(video.createdAt).format("MMM DD YYYY")} •{" "}
                      {video.views} views
                    </h4>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Don’t miss new videos</h1>
      <h3>Subscribe to see updates from your favorite DevTube channels</h3>
    </div>
  );
}

export default Subscriptions;
