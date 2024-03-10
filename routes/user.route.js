const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser.js");

router.post("/register", configureFileUpload(), userController.userRegister);
router.post("/verify-email", configureFileUpload(), userController.verifyEmail);
router.post("/login", configureFileUpload(), userController.userLogin);
router.post("/forgot-password", configureFileUpload(), userController.forgotPassword);

router.post("/reset-password", configureFileUpload(), userController.resetPassword);

router.post("/change-password", checkUser, configureFileUpload(), userController.changePassword);
router.post("/update-profile", checkUser, configureFileUpload(), userController.updateProfile);
router.post("/make-follower/:id", configureFileUpload(), userController.makeFollower);
router.patch("/delete-account/:id", userController.deleteAccount);
module.exports = router;