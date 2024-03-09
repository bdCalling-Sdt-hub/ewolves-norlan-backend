const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/user.controller.js");
const userauthmiddleware = require("../middlewares/checkUser.js");
const configureFileUpload = require("../middlewares/fileUpload.js");

router.post("/register", configureFileUpload(), userscontroller.userRegister);
router.post("/verifyemail", configureFileUpload(), userscontroller.verifyEmail);
router.post("/login", configureFileUpload(), userscontroller.userLogin);

//router.post("/changepassword",userscontroller.changeuserpassword)
router.get(
  "/loggeduser",
  userauthmiddleware.checkUser,
  userscontroller.loggeduserdata
);

router.post(
  "/forget-password",
  configureFileUpload(),
  userscontroller.forgetPassword
);

router.post(
  "/reset-password",
  configureFileUpload(),
  userscontroller.resetPassword
);

router.post(
  "/changepassword",
  userauthmiddleware.checkUser,
  configureFileUpload(),
  userscontroller.changeuserpassword
);
router.post(
  "/editprofile",
  userauthmiddleware.checkUser,
  configureFileUpload(),
  userscontroller.profileEdit
);
module.exports = router;
