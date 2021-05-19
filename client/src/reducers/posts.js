const posts = (posts = [], action) => {
  // Logic
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "CREATE":
      return [...posts, action.payload];

    case "UPDATE":
      // If ids are same return it's data
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case "DELETE":
      // Keep all posts except payload
      return posts.filter((post) => post._id !== action.payload);

    case "LIKE":
      // If ids are same return it's data
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return posts;
  }
};

export default posts;
