import React, { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

// Material-ui
import { Container, Grow, Grid } from "@material-ui/core";

// Styles
import useStyles from "./styles";

// Components
import Posts from "./../Posts/Posts";
import Form from "./../Form/Form";

const Home = () => {
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
  );
};

export default Home;
