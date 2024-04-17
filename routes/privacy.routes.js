const express = require("express");
const router = express.Router();
const {
  addPrivacy,
  getPrivacy,
  updatePrivacy,
} = require("../controllers/privacy.controller");
const configureFileUpload = require("../middlewares/fileUpload");

const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");

router.post(
  "/create-privacy",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addPrivacy
);
router.get(
  "/get-privacy",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getPrivacy
);
router.patch(
  "/update-privacy/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updatePrivacy
);

module.exports = router;
