import React, { useState, useEffect } from "react";
import "../css/comments.css";
import api from "../helper/api";
import { isAuthenticated } from "../helper/authCalls";
import moment from "moment";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";

function Comments({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.post("/getComments", { videoId: postId }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data.data.comments);
      }
    });
  }, [postId, refresh]);

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

    api.post("/saveComment", commentData).then((data) => {
      if (data.error) {
        console.log(data.error);
        alert("Failed to save Comment");
      } else {
        console.log(data);
        setComment("");
        setRefresh(!refresh);
      }
    });
  };

  return (
    <div>
      <h2>Comments</h2>
      {isAuthenticated() ? (
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={comment}
            placeholder="write some comments"
          />
          <br />
          <button>Comment</button>
        </form>
      ) : (
        <form style={{ display: "flex" }}>
          <input
            type="text"
            disabled
            value={comment}
            placeholder="write some comments"
          />
          <br />
          <button className="login-subs">
            <Link to="/login" className="link-nodec">
              <div className="nav-left">
                <AccountCircle className="account-img" />
                <div>
                  <p>Login to</p>
                  <p>Comment</p>
                </div>
              </div>
            </Link>
          </button>
        </form>
      )}
      <div>
        {comments &&
          comments.reverse().map((comment, index) => {
            return (
              <div className="single-comment" key={index}>
                <img
                  src={comment.writer.image}
                  alt=""
                  className="account-img"
                />
                <div>
                  <div className="comment-head">
                    <h4>{comment.writer.name}</h4>
                    <h5> {moment(comment.createdAt).format("MMM Do YYYY")} </h5>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Comments;
