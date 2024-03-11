const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.checkUser = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    const { userID } = jwt.verify(token, process.env.JWT_SECRET);
    const data = await User.findById({ _id: userID }).select("-password");
    if(!data){
      return res.status(401).send({message: 'Forbiden access'});
    } 
    req.user = data
    next();
  } else {
    return res.status(401).send({message: 'UnAuthorized access'})
  }
};
