const express = require("express");
const router = express.Router();
const {addBanner, deleteBanner, getBanner, updateBanner} = require("../controllers/banner.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser.js");
const { checkAdmin } = require("../middlewares/checkAdmin.js");

router.post("/create-banner", checkAdmin, configureFileUpload(), addBanner);
router.get("/get-banner", checkUser, getBanner);
router.patch( "/update-banner/:id", checkAdmin, configureFileUpload(), updateBanner);
router.delete("/delete-banner/:id", checkAdmin, deleteBanner);

module.exports = router;
