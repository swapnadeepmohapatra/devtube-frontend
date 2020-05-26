import React, { useEffect, useState } from "react";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import api from "../helper/api";

function Likes({ videoId, userId }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  let likeData = {};

  if (videoId) {
    likeData = { videoId: videoId, userId: userId };
  }

  useEffect(() => {
    likeData = { videoId: videoId, userId: userId };

    api.post("/getLikes", likeData).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setLikes(response.data.likes.length);

        response.data.likes.map((like) => {
          if (like.userId === userId && like.videoId === videoId) {
            setLikeAction("liked");
          }
        });
      }
    });

    api.post("/getDisikes", likeData).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setDislikes(response.data.dislike.length);

        response.data.dislike.map((dislike) => {
          if (dislike.userId === userId && dislike.videoId === videoId) {
            setDislikeAction("disliked");
          }
        });
      }
    });
  }, [videoId]);

  const doLike = () => {
    if (likeAction === null) {
      api.post("/incLikes", likeData).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setLikes(likes + 1);
          setLikeAction("liked");

          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        }
      });
    } else {
      api.post("/decLikes", likeData).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setLikes(likes - 1);
          setLikeAction(null);
        }
      });
    }
  };

  const doDisLike = () => {
    if (dislikeAction !== null) {
      api.post("/decDislikes", likeData).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        }
      });
    } else {
      api.post("/incDislikes", likeData).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setDislikes(dislikes + 1);
          setDislikeAction("disliked");

          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        }
      });
    }
  };

  return (
    <span>
      <button
        disabled={!userId}
        onClick={doDisLike}
        style={{ color: dislikeAction ? "#065FD4" : "#616161" }}
      >
        <ThumbDown /> {dislikes}
      </button>
      <button
        disabled={!userId}
        onClick={doLike}
        style={{ color: likeAction ? "#065FD4" : "#616161" }}
      >
        <ThumbUp /> {likes}
      </button>
    </span>
  );
}

export default Likes;
