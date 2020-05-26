import React, { useEffect, useState } from "react";
import api from "../helper/api";
import HoverVideoPlayer from "react-hover-video-player";
import { CircularProgress } from "@material-ui/core";
import "../css/home.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helper/authCalls";

function Subscriptions() {
  const [videos, setVideos] = useState([]);

  let userData = { userFrom: isAuthenticated().user._id };
  useEffect(() => {
    api.post("getSubscriptionVideos", userData).then((resp) => {
      console.log(resp.data.videos);
      setVideos(resp.data.videos);
    });
  }, []);

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

export default Subscriptions;
