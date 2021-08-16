const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // sets header for finding attached token from the frontend
  // console.log(req.headers);
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated pt 1");
    error.statusCode = 401;
    throw error;
  }
  //   split to get the headers token value
  const token = authHeader.split(" ")[1];
  let decodedToken;

  // decode the token with the secret key pass
  try {
    decodedToken = jwt.verify(token, process.env.JPASS);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated pt 2");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
