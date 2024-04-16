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
  updateSubCategory,
  getAllSubCategory
} = require("../controllers/category.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const { checkUser } = require("../middlewares/checkUser");
const { checkAdmin } = require("../middlewares/checkAdmin");

// category
router.post("/create-category", configureFileUpload(), addCategory);
router.get("/get-category", checkUser, getCategory);
router.get("/category-details/:id", checkUser, getSingleCategory);
router.delete("/delete-category/:id", checkAdmin, deleteCategory);
router.patch( "/update-category/:id", checkAdmin, configureFileUpload(), updateCategory);

// sub category
router.post( "/create-sub-category/:id", configureFileUpload(), addSubCategory);
router.get("/sub-category/:catId/:subId", checkUser, getSubCategory);
router.get("/get-sub-category", getAllSubCategory);
router.delete( "/delete-sub-category/:catId/:subId", checkAdmin, deleteSubCategory);
router.patch( "/update-sub-category/:catId/:subId", checkAdmin, configureFileUpload(), updateSubCategory);

module.exports = router;
