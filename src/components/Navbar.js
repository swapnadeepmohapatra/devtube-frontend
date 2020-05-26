import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import {
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Menu,
  ExitToApp,
  AccountCircle,
  Publish,
  Home,
  Whatshot,
  Subscriptions,
} from "@material-ui/icons";
import { isAuthenticated, signout } from "../helper/authCalls";
import logo from "../logo.svg";

function Navbar() {
  const [state, setState] = useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div className="nav">
      <div className="nav-left">
        <Menu onClick={toggleDrawer("left", true)} className="curs-point" />
        <Link to="/" className="paddingL20 icon-logo">
          <img src={logo} alt="" />
        </Link>
      </div>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <div className="nav-drawer">
          <List>
            <Link to="/" className="link-nodec">
              <ListItem
                button
                onClick={() => {
                  setState({ ...state, left: false });
                }}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/feed/trending" className="link-nodec">
              <ListItem
                button
                onClick={() => {
                  setState({ ...state, left: false });
                }}
              >
                <ListItemIcon>
                  <Whatshot />
                </ListItemIcon>
                <ListItemText primary={"Trending"} />
              </ListItem>
            </Link>
            <Link to="/feed/subscriptions" className="link-nodec">
              <ListItem
                button
                onClick={() => {
                  setState({ ...state, left: false });
                }}
              >
                <ListItemIcon>
                  <Subscriptions />
                </ListItemIcon>
                <ListItemText primary={"Subscriptions"} />
              </ListItem>
            </Link>
            <Divider />
          </List>
        </div>
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <div className="nav-drawer">
          {isAuthenticated() ? (
            <List>
              <Link to="/login" className="link-nodec">
                <ListItem
                  button
                  onClick={() => {
                    setState({ ...state, right: false });
                  }}
                >
                  <ListItemIcon>
                    <img
                      src={isAuthenticated().user.image}
                      alt=""
                      className="account-img"
                    />
                  </ListItemIcon>
                  <ListItemText primary={isAuthenticated().user.name} />
                </ListItem>
              </Link>
              <ListItem
                button
                onClick={() => {
                  signout(() => {
                    setState({ ...state, right: false });
                  });
                }}
              >
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
              <Divider />
              <Link
                to="/upload"
                style={{ color: "#000000", textDecoration: "none" }}
              >
                <ListItem
                  button
                  onClick={() => {
                    setState({ ...state, right: false });
                  }}
                >
                  <ListItemIcon>
                    <Publish />
                  </ListItemIcon>
                  <ListItemText primary={"Upload Video"} />
                </ListItem>
              </Link>
            </List>
          ) : (
            <List>
              <Link
                to="/login"
                style={{ color: "#000000", textDecoration: "none" }}
              >
                <ListItem
                  button
                  onClick={() => {
                    setState({ ...state, right: false });
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={"Log in"} />
                </ListItem>
              </Link>
            </List>
          )}
          <Divider />
        </div>
      </SwipeableDrawer>
      <div className="nav-links">
        {isAuthenticated() ? (
          <Button onClick={toggleDrawer("right", true)}>
            <img
              src={isAuthenticated().user.image}
              alt=""
              className="account-img"
            />
          </Button>
        ) : (
          <Button>
            <Link to="/login" className="link-nodec">
              <div className="nav-left">
                <AccountCircle className="account-img" />
                <p className="padding10">SIGN IN</p>
              </div>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
