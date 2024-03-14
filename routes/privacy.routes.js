const express = require("express");
const router = express.Router();
const {addPrivacy, getPrivacy, updatePrivacy} = require("../controllers/privacy.controller");
const configureFileUpload = require("../middlewares/fileUpload");
const { checkAdmin } = require("../middlewares/checkAdmin");
const { checkUser } = require("../middlewares/checkUser");

router.post( "/create-privacy", checkAdmin, configureFileUpload(), addPrivacy);
router.get("/get-privacy", checkUser, getPrivacy);
router.patch("/update-privacy/:id", checkAdmin, configureFileUpload(), updatePrivacy);

module.exports = router;
