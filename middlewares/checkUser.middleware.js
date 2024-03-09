const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const ApiError = require("../erorrs/ApiError");

exports.checkUser = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById({ _id: userID }).select("-password");
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .send({ status: 401, message: "Unauthorized user" });
    }
  }

  if (!token) {
    throw new ApiError(401, "Unauthorize user. No token");
  }
};
