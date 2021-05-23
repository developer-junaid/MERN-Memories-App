import React, { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

// Material-ui
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

// Styles
import useStyles from "./styles";

// React Router DOM
import { useHistory, useLocation } from "react-router-dom";

// Components
import Posts from "./../Posts/Posts";
import Form from "./../Form/Form";
import Pagination from "./../Pagination/Pagination";

// Determine Location
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Home
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");

  // Use Effect
  useEffect(() => {
    // Use Dispatch for actions
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // Return
  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value="TEST"
                onChange={() => {}}
              ></TextField>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
