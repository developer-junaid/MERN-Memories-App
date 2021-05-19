import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

// Image to String
import FileBase from "react-file-base64";

// Material-UI
import { TextField, Button, Typography, Paper } from "@material-ui/core";

// Styles
import useStyles from "./styles";

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // Styles
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId
      ? state.posts.find((postToFind) => postToFind.id === currentId)
      : null
  );

  // UseEffect
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    // If we are updating
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      // If we are creating
      dispatch(createPost(postData));
    }
  };

  const clear = () => {};

  // Get current id of the post

  // Return
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={` ${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInputs}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
