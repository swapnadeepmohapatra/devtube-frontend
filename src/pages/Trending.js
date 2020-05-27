import React, { useEffect, useState } from "react";
import api from "../helper/api";
import HoverVideoPlayer from "react-hover-video-player";
import { CircularProgress } from "@material-ui/core";
import "../css/home.css";
import moment from "moment";
import { Link } from "react-router-dom";

function Trending() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("getTrendingVideos").then((resp) => {
      console.log(resp.data.videos);
      setVideos(resp.data.videos);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Trending</h1>
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

export default Trending;
