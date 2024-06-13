const express = require("express");
const router = express.Router();
const {
  addAboutUs,
  getAboutUs,
  updateAboutUs,
} = require("../controllers/about.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { USER_ROLE } = require("../enums/user");
const auth = require("../middlewares/auth");

router.post(
  "/create-about",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addAboutUs
);
router.get(
  "/get-about",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getAboutUs
);
router.patch(
  "/update-about/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateAboutUs
);
exports.AboutRoutes = router;
