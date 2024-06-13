const express = require("express");
const router = express.Router();
const {
  addBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} = require("../controllers/banner.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { USER_ROLE } = require("../enums/user.js");
const auth = require("../middlewares/auth.js");

router.post(
  "/create-banner",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addBanner
);
router.get(
  "/get-banner",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getBanner
);
router.patch(
  "/update-banner/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateBanner
);
router.delete("/delete-banner/:id", auth(USER_ROLE.ADMIN), deleteBanner);

exports.BannerRoutes = router;
