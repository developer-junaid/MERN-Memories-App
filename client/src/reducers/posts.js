import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
} from "./../constants/actionTypes";

const posts = (state = [], action) => {
  // Logic
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };

    case CREATE:
      return [...state, action.payload];

    case UPDATE:
      // If ids are same return it's data
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      // Keep all posts except payload

      return state.filter((post) => post._id !== action.payload);

    case LIKE:
      // If ids are same return it's data
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return state;
  }
};

export default posts;
