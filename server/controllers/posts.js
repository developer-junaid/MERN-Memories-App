import mongoose from "mongoose";

// Route Handlers
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find({});

    res.status(200).json(postMessages);
    // Stop further execution
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    // Save to DB
    await newPost.save();

    // Successful Creation
    res.status(201).json(newPost);
    return;
  } catch (error) {
    // Unsuccessful Creation
    res.status(409).json({ message: error.message });
    return;
  }

  res.send("Post Creation");
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // Check
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  // If post exists update it
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  // Return Post
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  // Check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  // Delete
  await PostMessage.findOneAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  // If it's authenticated
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  // Check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  // Find post
  const post = await PostMessage.findById(id);

  // If he has liked the post
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // Like the post
    post.likes.push(req.userId);
  } else {
    // Dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // Like post
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  // send response
  res.json(updatedPost);
};
