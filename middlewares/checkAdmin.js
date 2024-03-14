const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.checkAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    const { userID } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: userID }).select("-password");
    if (!user) {
      return res.status(401).send({ message: "Forbiden access" });
    }
    if(user.role === "ADMIN"){
      next();
    }else{
      return res.status(401).send({ message: "UnAuthorized access" });
    }
  } else {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
};
