const express = require("express");
const router = express.Router();
const {addAboutUs, getAboutUs, updateAboutUs} = require("../controllers/about.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { checkUser } = require("../middlewares/checkUser");
const { checkAdmin } = require("../middlewares/checkAdmin");


router.post("/create-about", checkAdmin, configureFileUpload(), addAboutUs);
router.get("/get-about",  checkUser, getAboutUs);
router.patch( "/update-about/:id", configureFileUpload(), updateAboutUs );
module.exports = router;
