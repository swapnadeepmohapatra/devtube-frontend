import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "../css/upload.css";
import { lighten, withStyles } from "@material-ui/core/styles";
import { Publish } from "@material-ui/icons";
import {
  LinearProgress,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { storage } from "../helper/firebase";
import { isAuthenticated } from "../helper/authCalls";
import VideoPlayer from "simple-react-video-thumbnail";
import api from "../helper/api";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        <CircularProgress />
      </DialogTitle>
    </Dialog>
  );
}

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
];

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#8932a7", 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#8932a7",
  },
})(LinearProgress);

function Upload({ history }) {
  const [state, setState] = useState({
    imageUrl: "",
    videoUrl: "",
    title: "",
    description: "",
    privacy: 0,
    category: "Film & Animation",
    imageUpload: false,
    videoUpload: false,
    imageUploadProgress: 0,
    videoUploadProgress: 0,
    error: false,
    loading: false,
  });

  const {
    imageUrl,
    videoUrl,
    title,
    description,
    privacy,
    category,
    imageUpload,
    videoUpload,
    imageUploadProgress,
    videoUploadProgress,
  } = state;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "" || description === "" || category === "") {
      return alert("Fill all the fields");
    }

    if (!imageUpload || !videoUpload) {
      return alert("Upload the video and the thumbnail");
    }

    handleClickOpen();

    const postData = {
      writer: isAuthenticated().user._id,
      title: title,
      description: description,
      privacy: privacy,
      filePath: videoUrl,
      category: category,
      thumbnail: imageUrl,
    };

    api.post("saveVideo", postData).then((resp) => {
      if (resp.error) {
        setOpen(false);
        return console.log(resp.error);
      }
      setOpen(false);
      console.log(resp);
      alert("Video Uploaded");
      history.push("/");
    });
  };

  const onDropVideo = (files) => {
    const uploadTask = storage
      .ref(`/videos/${isAuthenticated().user._id}/${files[0].name}`)
      .put(files[0]);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
        setState({
          ...state,
          videoUploadProgress: (
            (10000 * snapShot.bytesTransferred) /
            snapShot.totalBytes /
            100
          ).toFixed(2),
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref(`videos/${isAuthenticated().user._id}`)
          .child(files[0].name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setState({ ...state, videoUrl: fireBaseUrl, videoUpload: true });
          });
      }
    );
  };

  const onDropImage = (files) => {
    const uploadTask = storage
      .ref(`/thumbnail/${isAuthenticated().user._id}/${files[0].name}`)
      .put(files[0]);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
        setState({
          ...state,
          imageUploadProgress: (
            (10000 * snapShot.bytesTransferred) /
            snapShot.totalBytes /
            100
          ).toFixed(2),
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref(`thumbnail/${isAuthenticated().user._id}`)
          .child(files[0].name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setState({ ...state, imageUrl: fireBaseUrl, imageUpload: true });
            console.log(fireBaseUrl);
          });
      }
    );
  };

  return (
    <div className="video-upload">
      <h1>Upload New Video Here</h1>
      <main>
        <div className="upd">
          {videoUrl !== "" && (
            <VideoPlayer
              videoUrl={videoUrl}
              snapshotAt={10}
              className="video-center"
              style={{ maxHeight: "248px" }}
            />
          )}
          {videoUploadProgress !== 0 && (
            <div className="progressBar-box">
              <div className="progressBar">
                <BorderLinearProgress
                  variant="determinate"
                  color="primary"
                  value={videoUploadProgress}
                />
                <h3>{videoUploadProgress}% Uploaded</h3>
              </div>
            </div>
          )}
          {videoUrl === "" && videoUploadProgress === 0 && (
            <Dropzone
              onDrop={onDropVideo}
              multiple={false}
              maxSize={800000000}
              style={{ height: "240px" }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="drop-box" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h2>Video</h2>
                  <div
                    style={{
                      backgroundColor: "#EBEBEB",
                      borderRadius: "50%",
                      padding: 30,
                    }}
                  >
                    <Publish
                      style={{
                        fontSize: "4rem",
                        color: "#949494",
                      }}
                    />
                  </div>
                  <h4>Drag and drop video files to upload</h4>
                </div>
              )}
            </Dropzone>
          )}
        </div>
        <div className="upd">
          {imageUrl !== "" && <img src={imageUrl} alt="" className="center" />}
          {imageUploadProgress !== 0 && (
            <div className="progressBar-box">
              <div className="progressBar">
                <BorderLinearProgress
                  variant="determinate"
                  color="primary"
                  value={imageUploadProgress}
                />
                <h3>{imageUploadProgress}% Uploaded</h3>
              </div>
            </div>
          )}
          {imageUrl === "" && imageUploadProgress === 0 && (
            <Dropzone
              disabled={!videoUpload}
              onDrop={onDropImage}
              multiple={false}
              maxSize={800000000}
              style={{ height: "240px" }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="drop-box" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h2>Thumbnail</h2>
                  <div
                    style={{
                      backgroundColor: "#EBEBEB",
                      borderRadius: "50%",
                      padding: 30,
                    }}
                  >
                    <Publish
                      style={{
                        fontSize: "4rem",
                        color: "#949494",
                      }}
                    />
                  </div>
                  <h4>Drag and drop image files to upload</h4>
                </div>
              )}
            </Dropzone>
          )}
        </div>
      </main>
      <form className="video-upload-form" onSubmit={handleSubmit}>
        <label>Title*</label>
        <input
          disabled={!imageUpload || !videoUpload}
          type="text"
          placeholder="Title"
          onChange={handleChange("title")}
        />
        <label>Description*</label>
        <textarea
          disabled={!imageUpload || !videoUpload}
          type="text"
          placeholder="Description"
          onChange={handleChange("description")}
        />
        <label>Privacy*</label>
        <select
          disabled={!imageUpload || !videoUpload}
          onChange={handleChange("privacy")}
        >
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label>Catogory*</label>
        <select
          disabled={!imageUpload || !videoUpload}
          onChange={handleChange("category")}
        >
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <button disabled={!imageUpload || !videoUpload}>Upload</button>
      </form>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default Upload;
