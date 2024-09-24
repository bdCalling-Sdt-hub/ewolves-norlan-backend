const express = require("express");
const router = express.Router();
const {
    createSubCategoryToDB,
    getSubCategoriesFromDB,
    deleteSubCategoryToDB,
    updateSubCategoryToDB
} = require("../controllers/subCategory.controller.js");
const configureFileUpload = require("../middlewares/fileUpload.js");
const auth = require("../middlewares/auth.js");
const { USER_ROLE } = require("../enums/user.js");

router.post(
    "/create-sub-category",
    auth(USER_ROLE.ADMIN),
    configureFileUpload(),
    createSubCategoryToDB
);

router.get("/",
    auth(USER_ROLE.ADMIN, USER_ROLE.ARTIST, USER_ROLE.USER),
    getSubCategoriesFromDB
);

router.delete("/:id", auth(USER_ROLE.ADMIN), deleteSubCategoryToDB);

router.patch(
    "/:id",
    auth(USER_ROLE.ADMIN),
    configureFileUpload(),
    updateSubCategoryToDB
);

exports.SubCategoryRoutes = router;