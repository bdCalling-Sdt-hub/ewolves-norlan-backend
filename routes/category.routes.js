const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
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

exports.CategoryRoutes = router;
