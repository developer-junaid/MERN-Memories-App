import React, { useEffect, useState } from "react";

// Material-UI
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

// Redux
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

// Components
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

// Picture
import memories from "./images/memories.png";

// Styles
import useStyles from "./styles";

export default function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  // Use Effect
  useEffect(() => {
    // Use Dispatch for actions
    dispatch(getPosts());
  }, [dispatch]);

  // Return
  return (
    <Container maxwidth="lg">
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
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
