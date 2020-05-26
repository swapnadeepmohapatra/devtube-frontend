import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import ViewVideo from "./pages/ViewVideo";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";

function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/feed/trending" component={Trending} />
          <Route exact path="/feed/subscriptions" component={Subscriptions} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/watch/video/:videoId" component={ViewVideo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Routes;
