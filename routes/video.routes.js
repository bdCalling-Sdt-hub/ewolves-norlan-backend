const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const {
  createComment,
  createWishList,
  getAllVideo,
  getWishListByUserId,
} = require("../controllers/video.controller.js");

const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getAllVideo
);
router.post(
  "/create-comment/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  createComment
);
router.post(
  "/create-wish/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  createWishList
);
router.get(
  "/wishlist/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getWishListByUserId
);

module.exports = router;
