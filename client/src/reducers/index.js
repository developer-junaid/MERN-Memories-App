import { combineReducers } from "redux";

// Reducers
import posts from "./posts";
import auth from "./auth";

export default combineReducers({ posts, auth });
