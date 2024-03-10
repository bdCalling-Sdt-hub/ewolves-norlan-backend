const express = require("express");
const router = express.Router();
const configureFileUpload = require("../middlewares/fileUpload.js");
const { createComment, createWishList} = require("../controllers/video.controller.js")

router.post("/create-comment/:id",  configureFileUpload(), createComment )
router.post("/create-wish/:id", createWishList)
module.exports = router