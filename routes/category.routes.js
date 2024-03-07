const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js")
const configureFileUpload=require("../middlewares/fileUpload.middleware.js");

// category
router.post("/category", configureFileUpload(), categoryController.addCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getSingleCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
router.patch("/update-category/:id", configureFileUpload(), categoryController.updateCategory);

// sub category
router.post("/sub-category/:id", configureFileUpload(), categoryController.addSubCategory);
router.delete("/delete-sub-category/:id", categoryController.deleteSubCategory);
router.patch("/update-sub-category/:id", configureFileUpload(), categoryController.updateSubCategory);

module.exports = router;