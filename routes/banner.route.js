const express = require("express");
const router = express.Router();
const {addBanner, deleteBanner, getBanner, updateBanner} = require("../controllers/banner.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");

router.post("/banner", configureFileUpload(), addBanner);
router.get("/banner", getBanner);
router.patch(
  "/banner/:id",
  configureFileUpload(),
  updateBanner
);
router.delete("/delete-banner/:id", deleteBanner);

module.exports = router;
