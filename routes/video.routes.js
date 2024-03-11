const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const {
  createComment,
  createWishList,
  getAllVideo,
  getWishListByUserId,
} = require("../controllers/video.controller.js");

router.get("/", getAllVideo);
router.post("/create-comment/:id", configureFileUpload(), createComment);
router.post("/create-wish/:id", createWishList);
router.get("/wishlist/:id", getWishListByUserId);

module.exports = router;
