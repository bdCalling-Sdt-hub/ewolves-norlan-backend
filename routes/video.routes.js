const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const {
  createComment,
  createWishList,
  getAllVideo,
  getWishListByUserId,
  getVideoComments,
  getSingleVideo,
} = require("../controllers/video.controller.js");

const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.post(
  "/create-comment/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  createComment
);

router.get(
  "/comments/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  configureFileUpload(),
  getVideoComments
);

router.post(
  "/create-wish/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  createWishList
);
router.get(
  "/wishlist-by-user",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getWishListByUserId
);

router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getSingleVideo
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getAllVideo
);

module.exports = router;
