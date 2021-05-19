import axios from "axios";

// Backend route
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url); // Fetch Posts

export const createPost = (newPost) => axios.post(url, newPost); // Create Post
