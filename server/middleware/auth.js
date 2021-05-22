import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // Check token
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // It is our token

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      // If it is google token
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub = id
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
