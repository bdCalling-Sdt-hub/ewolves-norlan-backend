const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.post("/register", configureFileUpload(), userController.userRegister);
router.post("/verify-email", configureFileUpload(), userController.verifyEmail);
router.post("/login", configureFileUpload(), userController.userLogin);
router.post(
  "/forgot-password",
  configureFileUpload(),
  userController.forgotPassword
);
router.post("/otp-verify", configureFileUpload(), userController.otpVerify);

router.post(
  "/reset-password",
  configureFileUpload(),
  userController.resetPassword
);

router.post(
  "/change-password",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  userController.changePassword
);
router.post(
  "/update-profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  userController.updateProfile
);
router.post(
  "/make-follower/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  userController.makeFollower
);
router.patch(
  "/delete-account/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  userController.deleteAccount
);
router.patch(
  "/make-interest/:id",
  configureFileUpload(),
  userController.makeInterest
);

router.get(
  "/get-profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  userController.getProfileFromDB
);
router.get(
  "/get-top-artist",
  auth(USER_ROLE.ARTIST, USER_ROLE.USER),
  userController.getTopArtistFromDB
);


module.exports = router;
