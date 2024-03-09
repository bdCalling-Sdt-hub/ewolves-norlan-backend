const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");

// category
router.post("/category", configureFileUpload(), categoryController.addCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getSingleCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
router.patch(
  "/update-category/:id",
  configureFileUpload(),
  categoryController.updateCategory
);

// sub category
router.post(
  "/sub-category/:id",
  configureFileUpload(),
  categoryController.addSubCategory
);
router.get("/sub-category/:catId/:subId", categoryController.getSubCategory);
router.delete(
  "/delete-sub-category/:catId/:subId",
  categoryController.deleteSubCategory
);
router.patch(
  "/update-sub-category/:catId/:subId",
  configureFileUpload(),
  categoryController.updateSubCategory
);

module.exports = router;
