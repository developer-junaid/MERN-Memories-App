import React from "react";

// React Router DOM
import { Link } from "react-router-dom";

// Material-ui
import { AppBar, Typography } from "@material-ui/core";

// Styles
import useStyles from "./styles";

// Picture
import memories from "./../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();

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
    </AppBar>
  );
};

export default Navbar;
