import React from "react";

// Material-ui Lab
import { Pagination, PaginationItem } from "@material-ui/lab";

// React Router DOM
import { Link } from "react-router-dom";

// Styles
import useStyles from "./styles";

const Paginate = () => {
  const classes = useStyles();

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
