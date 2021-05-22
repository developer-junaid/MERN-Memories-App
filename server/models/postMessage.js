// Models (Collections)
import mongoose from "mongoose";

// Schema
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Model (Collection)
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
