import React, { useEffect, useState } from "react";

// Material-UI
import { Container, Grow, Grid } from "@material-ui/core";

// Redux
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

// Components
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

// Styles
import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  // Use Effect
  useEffect(() => {
    // Use Dispatch for actions
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // Return
  return (
    <Container maxwidth="lg">
      <Navbar />
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
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
