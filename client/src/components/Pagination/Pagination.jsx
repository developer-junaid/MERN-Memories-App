import React, { useEffect } from "react";

// Material-ui Lab
import { Pagination, PaginationItem } from "@material-ui/lab";

// React Router DOM
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import { getPosts } from "../../actions/posts";

// Styles
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get posts
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
