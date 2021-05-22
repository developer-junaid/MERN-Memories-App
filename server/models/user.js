import mongoose from "mongoose";

// Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  id: { type: String },
  password: String,
});

// Create collection
export default mongoose.model("User", userSchema);
