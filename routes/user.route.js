const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser.js");

router.post("/register", configureFileUpload(), userController.userRegister);
router.post("/verify-email", configureFileUpload(), userController.verifyEmail);
router.post("/login", configureFileUpload(), userController.userLogin);

router.post(
  "/forget-password",
  configureFileUpload(),
  userController.forgetPassword
);

router.post(
  "/reset-password",
  configureFileUpload(),
  userController.resetPassword
);

router.post(
  "/change-password",
  checkUser,
  configureFileUpload(),
  userController.changeuserpassword
);
router.post(
  "/edit-profile",
  checkUser,
  configureFileUpload(),
  userController.profileEdit
);

router.post("/make-follower/:id", configureFileUpload(), userController.makeFollower);
router.patch("/delete-account/:id", userController.deleteAccount);
module.exports = router;