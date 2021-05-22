import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Add Interceptor
API.interceptors.request.use((req) => {
  // Attach authorization token to request headers
  if (localStorage.getItem("profile")) {
    let token = JSON.parse(localStorage.getItem("profile")).token;

    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts"); // Fetch Posts
export const createPost = (newPost) => API.post("/posts", newPost); // Create Post
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost); // Update Post
export const deletePost = (id) => API.delete(`/posts/${id}`); // Delete Post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // Like Post

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
