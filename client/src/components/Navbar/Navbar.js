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
import memories from "./../../images/memories.png";

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
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
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
