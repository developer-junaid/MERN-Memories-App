import React from "react";

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
      <Typography className={classes.heading} variant="h2" align="center">
        Memories
      </Typography>
      <img
        className={classes.image}
        src={memories}
        alt="memories"
        height="60"
      />
    </AppBar>
  );
};

export default Navbar;
