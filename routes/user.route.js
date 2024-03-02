const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/user.controller.js")
const userauthmiddleware=require("../middlewares/checkUser.middleware.js");
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");


router.post("/register", configureFileUpload(),userscontroller.userRegister);
router.post("/verifyemail",configureFileUpload(),userscontroller.verifyEmail)
router.post("/login",configureFileUpload(),userscontroller.userLogin);


module.exports = router