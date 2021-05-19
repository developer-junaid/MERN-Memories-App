const posts = (posts = [], action) => {
  // Logic
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "CREATE":
      return [...posts, action.payload];

    default:
      return posts;
  }
};

export default posts;
