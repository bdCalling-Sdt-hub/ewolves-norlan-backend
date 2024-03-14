const express = require("express");
const router = express.Router();
const {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  getCategory,
  getSingleCategory,
  getSubCategory,
  updateCategory,
  updateSubCategory
} = require("../controllers/category.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser");
const { checkAdmin } = require("../middlewares/checkAdmin");

// category
router.post("/create-category", checkAdmin, configureFileUpload(), addCategory);
router.get("/", checkUser, getCategory);
router.get("/category-details/:id", checkUser, getSingleCategory);
router.delete("/delete-category/:id", checkAdmin, deleteCategory);
router.patch( "/update-category/:id", checkAdmin, configureFileUpload(), updateCategory);

// sub category
router.post( "/create-sub-category/:id", checkAdmin, configureFileUpload(), addSubCategory);
router.get("/sub-category/:catId/:subId", checkUser, getSubCategory);
router.delete( "/delete-sub-category/:catId/:subId", checkAdmin, deleteSubCategory);
router.patch( "/update-sub-category/:catId/:subId", checkAdmin, configureFileUpload(), updateSubCategory);

module.exports = router;
