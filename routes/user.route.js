const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/user.controller.js")
const userauthmiddleware=require("../middlewares/checkUser.middleware.js");
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");


router.post("/register", configureFileUpload(),userscontroller.userRegister);

module.exports = router