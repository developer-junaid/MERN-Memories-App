import express from "express";

// Controllers
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "./../controllers/posts.js";

// Midleware
import auth from "./../middleware/auth.js";

// Router
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
