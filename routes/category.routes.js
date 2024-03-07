const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js")
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");

router.post("/category", configureFileUpload(), categoryController.addCategory);

module.exports = router;