import React from "react";

// Material-UI
import { CircularProgress, Grid } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Components
import Post from "./Post/Post";

// Styles
import useStyles from "./styles";

export default function Posts({ setCurrentId }) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts); // Use Posts reducer

  // Return
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
