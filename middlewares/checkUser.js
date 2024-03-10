const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../errors/ApiError");

exports.checkUser = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    const { userID } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ _id: userID }).select("-password");
    next();
  } else {
    throw new ApiError(401, "unAuthorized user. no token");
  }
};
