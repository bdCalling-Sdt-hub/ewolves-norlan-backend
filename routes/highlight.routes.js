const express = require("express");
const {
  createHighlightToDB,
  getHighlightFromDB,
  deleteHighlightFromDB,
  updateHighlightToDB,
} = require("../controllers/highlight.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { USER_ROLE } = require("../enums/user");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/create-highlight",
  auth(USER_ROLE.ARTIST),
  configureFileUpload(),
  createHighlightToDB
);
router.get(
  "/artist",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getHighlightFromDB
);
router.patch(
  "/:id",
  auth(USER_ROLE.ARTIST),
  configureFileUpload(),
  updateHighlightToDB
);
router.delete("/:id", auth(USER_ROLE.ARTIST), deleteHighlightFromDB);

module.exports = router;
