const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const {
  createComment,
  createWishList,
  getAllVideo,
  getWishListByUserId,
} = require("../controllers/video.controller.js");
const { checkUser } = require("../middlewares/checkUser.js");

router.get("/", checkUser, getAllVideo);
router.post("/create-comment/:id", checkUser, configureFileUpload(), createComment);
router.post("/create-wish/:id", checkUser, createWishList);
router.get("/wishlist/:id", checkUser, getWishListByUserId);

module.exports = router;
