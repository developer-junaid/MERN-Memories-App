import axios from "axios";

const API = axios.create({ baseURL: "https://memories-manager.herokuapp.com" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

// Add Interceptor
API.interceptors.request.use((req) => {
  // Attach authorization token to request headers
  if (localStorage.getItem("profile")) {
    let token = JSON.parse(localStorage.getItem("profile")).token;

    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`); // Fetch Post
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); // Fetch Posts
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post("/posts", newPost); // Create Post
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost); // Update Post
export const deletePost = (id) => API.delete(`/posts/${id}`); // Delete Post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // Like Post

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
