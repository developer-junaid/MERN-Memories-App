import mongoose from "mongoose";

// Route Handlers
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  // Get page number
  const { page } = req.query;

  try {
    // variables
    const LIMIT = 8; // Limit number of posts
    const startIndex = (Number(page) - 1) * LIMIT; // Get start index every page
    const total = await PostMessage.countDocuments(); // Get total documents in database (posts)

    // Get all posts, sort them, limit them, and skip previous pages
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / LIMIT),
    });
    // Stop further execution
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  }); // Add creator to the post

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
  await PostMessage.findByIdAndRemove(id);

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
