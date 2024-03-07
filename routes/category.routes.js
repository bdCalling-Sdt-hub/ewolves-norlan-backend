const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js")
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");

router.post("/category", configureFileUpload(), categoryController.addCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getSingleCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;