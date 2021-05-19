import axios from "axios";

// Backend route
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url); // Fetch Posts

export const createPost = (newPost) => axios.post(url, newPost); // Create Post

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost); // Update Post

export const deletePost = (id) => axios.delete(`${url}/${id}`); // Delete Post

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); // Like Post
