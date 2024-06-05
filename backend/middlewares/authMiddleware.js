const { generateJWT, verifyJWT } = require("../utils/Auth.js");

const { serverConfig } = require("../config/config.js");

const authenticate = (req, res, next) => {

const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }
  try {
  const decodedToken= verifyJWT(token, "A");
  // console.log(decodedToken);
  req.user =decodedToken
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports =  authenticate ;
