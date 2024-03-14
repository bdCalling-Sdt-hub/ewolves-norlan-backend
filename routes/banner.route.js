const express = require("express");
const router = express.Router();
const {addBanner, deleteBanner, getBanner, updateBanner} = require("../controllers/banner.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser");
const { checkAdmin } = require("../middlewares/checkAdmin");

router.post("/banner", configureFileUpload(), addBanner);
router.get("/banner", checkUser, getBanner);
router.patch( "/banner/:id", checkAdmin, configureFileUpload(), updateBanner);
router.delete("/delete-banner/:id", checkAdmin, deleteBanner);

module.exports = router;
