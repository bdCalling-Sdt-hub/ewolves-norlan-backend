const express = require("express");
const { createFAQToDB, getFAQ } = require("../controllers/faq.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");
const { USER_ROLE } = require("../enums/user");
const router = express.Router();

router.post(
  "/create-faq",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  createFAQToDB
);
router.get(
  "/get-faq",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getFAQ
);

exports.FaqRoutes = router;
