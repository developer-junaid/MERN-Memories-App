import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  FETCH_POST,
  STOP_LOADING,
  START_LOADING,
} from "./../constants/actionTypes";

const posts = (state = { isLoading: true, posts: [] }, action) => {
  // Logic
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case STOP_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      // If ids are same return it's data
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      // Keep all posts except payload
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case LIKE:
      // If ids are same return it's data
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};

export default posts;
