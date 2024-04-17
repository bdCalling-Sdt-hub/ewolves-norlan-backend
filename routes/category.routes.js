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
  getAllSubCategory,
} = require("../controllers/category.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

// category
router.post(
  "/create-category",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addCategory
);
router.get(
  "/get-category",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getCategory
);
router.get(
  "/category-details/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getSingleCategory
);
router.delete("/delete-category/:id", auth(USER_ROLE.ADMIN), deleteCategory);
router.patch(
  "/update-category/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateCategory
);

// sub category
router.post(
  "/create-sub-category/:id",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  addSubCategory
);
router.get(
  "/sub-category/:catId/:subId",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getSubCategory
);
router.get(
  "/get-sub-category",
  auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
  getAllSubCategory
);
router.delete(
  "/delete-sub-category/:catId/:subId",
  auth(USER_ROLE.ADMIN),
  deleteSubCategory
);
router.patch(
  "/update-sub-category/:catId/:subId",
  auth(USER_ROLE.ADMIN),
  configureFileUpload(),
  updateSubCategory
);

module.exports = router;
