import * as api from "../api";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  STOP_LOADING,
  START_LOADING,
  UPDATE,
} from "./../constants/actionTypes";

// Action Creators
// Functions that return actions
export const getPosts = (page) => async (dispatch) => {
  // Fetch Data
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("get posts", error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  // Create Post
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
