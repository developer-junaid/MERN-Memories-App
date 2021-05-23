import React, { useState, useEffect } from "react";

// React Router DOM
import { Link, useHistory, useLocation } from "react-router-dom";

// JWT
import decode from "jwt-decode";

// Material-ui
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";

// Styles
import useStyles from "./styles";

// Redux
import { useDispatch } from "react-redux";

// Picture
import memoriesLogo from "./../../images/memoriesLogo.png";
import memoriesText from "./../../images/memoriesText.png";

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // Handlers
  const logout = () => {
    // Dispatch logout
    dispatch({ type: "LOGOUT" });

    // Redirect to home
    history.push("/");

    setUser(null);
  };

  // Use Effect
  useEffect(() => {
    const token = user?.token;

    // JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
