const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/user.controller.js")
const userauthmiddleware=require("../middlewares/checkUser.middleware.js");
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");


router.post("/register", configureFileUpload(),userscontroller.userRegister);
router.post("/verifyemail",configureFileUpload(),userscontroller.verifyEmail)
router.post("/login",configureFileUpload(),userscontroller.userLogin);


//router.post("/changepassword",userscontroller.changeuserpassword)
router.get("/loggeduser",userauthmiddleware.checkuser,userscontroller.loggeduserdata)

router.post('/forget-password', configureFileUpload(), userscontroller.forgetPassword);

router.post('/reset-password',configureFileUpload(),userscontroller.resetPassword);

router.post("/changepassword", userauthmiddleware.checkuser,configureFileUpload(),userscontroller.changeuserpassword)
router.post("/editprofile", userauthmiddleware.checkuser,configureFileUpload(),userscontroller.profileEdit)
module.exports = router